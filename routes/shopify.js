const dotenv = require('dotenv').config();
var models = require('../models');
var express = require('express');
var router = express.Router();

const crypto = require('crypto');
const cookie = require('cookie');
const nonce = require('nonce')();
const querystring = require('querystring');
const request = require('request-promise');
var modelName = 'User';
console.log('process.env.SHOPIFY_API_KEY',process.env.SHOPIFY_API_KEY)
const apiKey = process.env.SHOPIFY_API_KEY;
const apiSecret = process.env.SHOPIFY_API_SECRET;
// const accessTokenKey = process.env.ACCESS_TOKEN;
const scopes = 'write_script_tags';
const forwardingAddress = "https://moxoapps.com";

/* GET users listing. */
router.get('/', function (req, res, next) {
  const shop = req.query.shop;
  // console.log(process.env)
  if (shop) {
    req.where = {'shop_name':shop};
    models['UserInfo'].getAllValues(req, function (results) {
      console.log('resultsresults',results, results.length)
      if (results.length == 0) {
        const state = nonce();
        const redirectUri = forwardingAddress + '/shopify/callback';
        const installUrl = 'https://' + shop +
          '/admin/oauth/authorize?client_id=' + apiKey +
          '&scope=' + scopes +
          '&state=' + state +
          '&redirect_uri=' + redirectUri;

        res.cookie('state', state);
        res.redirect(installUrl);
        console.log('installUrl', apiKey,installUrl)
      } else {
        console.log('111')
        res.redirect('/');        
      }
    });    
  } else {
    return res.status(400).send('Missing shop parameter. Please add ?shop=your-development-shop.myshopify.com to your request');
  }  
});

router.get('/callback', (req, res) => {
  const { shop, hmac, code, state } = req.query;
  const stateCookie = cookie.parse(req.headers.cookie).state;

  if (state !== stateCookie) {
    return res.status(403).send('Request origin cannot be verified');
  }

  if (shop && hmac && code) {
    const map = Object.assign({}, req.query);
    delete map['signature'];
    delete map['hmac'];
    const message = querystring.stringify(map);
    const providedHmac = Buffer.from(hmac, 'utf-8');
    const generatedHash = Buffer.from(
      crypto
        .createHmac('sha256', apiSecret)
        .update(message)
        .digest('hex'),
        'utf-8'
      );
    let hashEquals = false;
    // timingSafeEqual will prevent any timing attacks. Arguments must be buffers
    try {
      hashEquals = crypto.timingSafeEqual(generatedHash, providedHmac)
    // timingSafeEqual will return an error if the input buffers are not the same length.
    } catch (e) {
      hashEquals = false;
    };

    if (!hashEquals) {
      return res.status(400).send('HMAC validation failed');
    }

    const accessTokenRequestUrl = 'https://' + shop + '/admin/oauth/access_token';
    const accessTokenPayload = {
      client_id: apiKey,
      client_secret: apiSecret,
      code,
    };

    request.post(accessTokenRequestUrl, { json: accessTokenPayload })
    .then((accessTokenResponse) => {

      let accessToken = accessTokenResponse.access_token;
      console.log('accessTokenaccessTokenaccessToken', accessToken);

      req.body = {shop_name: shop, access_token: accessToken};
      models['UserInfo'].saveAllValues(req, function (results1) {
        // res.redirect('/');
        //request webhooks when app uninstalled
        let new_request = {
          "webhook": {
            "topic": "app/uninstalled",
            "address": forwardingAddress+"/shopify/uninstall-web-hooks",
            "format": "json"
          }
        };
        let shopRequestUrl = 'https://' + shop + '/admin/api/2019-10/webhooks.json';
        let options = {
          method: 'POST',
          uri: shopRequestUrl,
          json: true,
          resolveWithFullResponse: true,//added this to view status code
          headers: {
              'X-Shopify-Access-Token': accessToken,
              'content-type': 'application/json'
          },
          body: new_request
        };
        request.post(options)
          .then((shopResponse) => {
            // req.body = {
            //   webhook_id: shopResponse.body.webhook.id, 
            //   topic: shopResponse.body.webhook.topic,
            //   created_at: shopResponse.body.webhook.created_at,
            //   address: shopResponse.body.webhook.address,
            // };
            // console.log('webhook save', req.body)
            // models['WebHook'].saveAllValues(req, function (results2) {
            //   res.redirect('/');
            // });
            res.json(shopResponse);
          })
          .catch((error) => {
            console.log('errorerror',error)
            res.status(error.statusCode).send(error.error.error_description);
          });


      }); 
      // const shopRequestUrl = 'https://' + shop + '/admin/api/2019-10/products.json';
      // const shopRequestHeaders = {
      //   'X-Shopify-Access-Token': accessToken,
      // };

      // request.get(shopRequestUrl, { headers: shopRequestHeaders })
      // .then((shopResponse) => {
      //   // res.send({'hemant':'value'})
      //   res.end(shopResponse);
      // })
      // .catch((error) => {
      //   res.status(error.statusCode).send(error.error.error_description);
      // });
      // TODO
      // Use access token to make API call to 'shop' endpoint
    })
    .catch((error) => {
      res.status(error.statusCode).send(error.error.error_description);
    });

    // TODO
    // Validate request is from Shopify
    // Exchange temporary code for a permanent access token
      // Use access token to make API call to 'shop' endpoint
  } else {
    res.status(400).send('Required parameters missing');
  }
});

// router.get('/get-products', function (req, res, next) {
//   let shop = req.query.shop;

//   req.where = {'shop_name':shop};
//   models['UserInfo'].getAccessToken(req, function (results) {
//     // console.log('resultsresults',results.access_token)
//     const shopRequestUrl = 'https://' + shop + '/admin/api/2019-10/products.json';
//     const shopRequestHeaders = {
//       'X-Shopify-Access-Token': results.access_token,
//     };
//     request.get(shopRequestUrl, { headers: shopRequestHeaders })
//       .then((shopResponse) => {
//         // res.send({'hemant':'value'})
//         res.end(shopResponse);
//       })
//       .catch((error) => {
//         res.status(error.statusCode).send(error.error.error_description);
//       });   
//   });
     
// });

router.get('/get-web-hooks', function (req, res, next) {
  let shop = req.query.shop;

  req.where = {'shop_name':shop};
  models['UserInfo'].getAccessToken(req, function (results) {
    // console.log('resultsresults',results.access_token)
    const shopRequestUrl = 'https://' + shop + '/admin/api/2019-10/webhooks.json';
    const shopRequestHeaders = {
      'X-Shopify-Access-Token': results.access_token,
    };
    request.get(shopRequestUrl, { headers: shopRequestHeaders })
      .then((shopResponse) => {
        console.log('all web hooks',shopResponse)
        // res.send({'hemant':'value'})
        res.end(shopResponse);
      })
      .catch((error) => {
        res.status(error.statusCode).send(error.error.error_description);
      });   
  });
     
});

router.post('/uninstall-web-hooks', function (req, res, next) {
  let shop = req.body;

  console.log('uninstall-web-hooks here', req.body);

  //delete user from db
  req.where = {
    shop_name: req.body.domain, 
  };
  models['UserInfo'].deleteAllValues(req, function (results1) {
    res.json(results1);
    //delete webhook from db
    // req.where = {
    //   id: req.body.id, 
    // };
    // models['WebHook'].deleteAllValues(req, function (results2) {
    //   res.json(results2);
    // });
  });
  // let shopRequestUrl = 'https://' + shop + '/admin/api/2019-10/webhooks/#'+req.body.id+'.json';
  // let options = {
  //   method: 'POST',
  //   uri: shopRequestUrl,
  //   json: true,
  //   resolveWithFullResponse: true,//added this to view status code
  //   headers: {
  //       // 'X-Shopify-Access-Token': accessToken,
  //       'content-type': 'application/json'
  //   },
  //   // body: new_request
  // };

  // request.POST(options)
  //   .then((shopResponse) => {

  //     console.log('shopResponseshopResponse121', shopResponse)
  //     //delete user from db
  //     req.where = {
  //       shop_name: req.body.domain, 
  //     };
  //     models['UserInfo'].deleteAllValues(req, function (results1) {
  //       //delete webhook from db
  //       req.where = {
  //         id: req.body.id, 
  //       };
  //       models['WebHook'].deleteAllValues(req, function (results2) {
  //         res.json(results2);
  //       });
  //     });
            
  //     // res.json(shopResponse);
  //   })
  //   .catch((error) => {
  //     console.log('errorerror',error)
  //     res.status(error.statusCode).send(error.error.error_description);
  //   });
});

router.get('/create-script', function (req, res, next) {
  let shop = req.query.shop;

  req.where = {'shop_name':shop};
  models['UserInfo'].getAccessToken(req, function (results) {
    // console.log('resultsresults',results.access_token)
    const shopRequestUrl = 'https://' + shop + '/admin/api/2019-10/script_tags.json';
    // const shopRequestHeaders = {
    //   'X-Shopify-Access-Token': results.access_token,
    // };
    let new_script = {
      "script_tag": {
        "event": "onload",
        "src": forwardingAddress+"/js/script-tag.js"
      }
    };

    let options = {
        method: 'POST',
        uri: shopRequestUrl,
        json: true,
        resolveWithFullResponse: true,//added this to view status code
        headers: {
            'X-Shopify-Access-Token': results.access_token,
            'content-type': 'application/json'
        },
        body: new_script
    };

    request.post(options)
      .then((shopResponse) => {
        // res.send({'hemant':'value'})
        res.json(shopResponse);
      })
      .catch((error) => {
        console.log('errorerror',error)
        res.status(error.statusCode).send(error.error.error_description);
      });   
  });
     
});

module.exports = router;
