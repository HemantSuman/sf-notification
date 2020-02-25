const dotenv = require('dotenv').config({path: "../.env"});
var models = require('../models');
var express = require('express');
var router = express.Router();

const crypto = require('crypto');
const cookie = require('cookie');
const nonce = require('nonce')();
const querystring = require('querystring');
const request = require('request-promise');
var modelName = 'User';
console.log('process.env.SHOPIFY_API_KEY', process.env)
const apiKey = process.env.SHOPIFY_API_KEY;
const apiSecret = process.env.SHOPIFY_API_SECRET;
// const accessTokenKey = process.env.ACCESS_TOKEN;
const scopes = 'write_script_tags';
const forwardingAddress = process.env.SITE_URL;

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

      req.body = {
                  shop_name: shop,
                  access_token: accessToken
                };
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
            req.body = {
              webhook_id: shopResponse.body.webhook.id, 
              topic: shopResponse.body.webhook.topic,
              created_at: shopResponse.body.webhook.created_at,
              address: shopResponse.body.webhook.address,
            };
            console.log('webhook save', req.body)
            models['WebHook'].saveAllValues(req, function (results2) {
              // res.redirect('/');

              let new_request1 = {
                "recurring_application_charge": {
                  "name": "New Plan Test 1111111",
                  "price": 1.0,
                  "return_url": forwardingAddress+"/shopify/recurring_application_charge_return?shop="+shop,
                  "test": true,
                  "trial_days":1
                }
              };
              let shopRequestUrl1 = 'https://' + shop + '/admin/api/2019-10/recurring_application_charges.json';
              let options1 = {
                method: 'POST',
                uri: shopRequestUrl1,
                json: true,
                resolveWithFullResponse: true,//added this to view status code
                headers: {
                    'X-Shopify-Access-Token': accessToken,
                    'content-type': 'application/json'
                },
                body: new_request1
              };
              request.post(options1)
                .then((shopResponse1) => {
                  
                  console.log('shopResponse1.body 1111', shopResponse1.body)     

                  req.body = { 
                      charge_id: shopResponse1.body.recurring_application_charge.id,
                      name: shopResponse1.body.recurring_application_charge.name,
                      api_client_id: shopResponse1.body.recurring_application_charge.api_client_id,
                      price: shopResponse1.body.recurring_application_charge.price,
                      status: shopResponse1.body.recurring_application_charge.status,
                      return_url:shopResponse1.body.recurring_application_charge.return_url,
                      created_at: shopResponse1.body.recurring_application_charge.created_at,
                      updated_at: shopResponse1.body.recurring_application_charge.updated_at,
                      test: shopResponse1.body.recurring_application_charge.test,
                      trial_days: shopResponse1.body.recurring_application_charge.trial_days,
                      decorated_return_url:shopResponse1.body.recurring_application_charge.decorated_return_url,
                      confirmation_url:shopResponse1.body.recurring_application_charge.confirmation_url,
                    };
                  req.where = {shop_name: shop};
                  models['UserInfo'].updateAllValues(req, function (results1) {
                    res.redirect(shopResponse1.body.recurring_application_charge.confirmation_url); 
                  });
                  // res.json(shopResponse);
                })
                .catch((error) => {
                  console.log('errorerror',error)
              });

            });
            // res.json(shopResponse);
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

router.get('/delete-web-hooks', function (req, res, next) {
  let shop = req.query.shop;
  let webhook_id = req.query.webhook_id;
  console.log('DDDDDDDdd')
  req.where = {'shop_name':shop};
  models['UserInfo'].getAccessToken(req, function (results) {
    // console.log('resultsresults',results.access_token)
    const shopRequestUrl = 'https://' + shop + '/admin/api/2019-10/webhooks/'+webhook_id+'.json';
    const shopRequestHeaders = {
      'X-Shopify-Access-Token': results.access_token,
    };
    request.delete(shopRequestUrl, { headers: shopRequestHeaders })
      .then((shopResponse) => {
        console.log('DELETE web hooks',shopResponse)
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

router.get('/recurring_application_charge_return', function (req, res, next) {
  let shop = req.query.shop;
  

  console.log('111111',req.query);
  res.redirect('https://'+shop+'/admin/apps'); 
  // res.render('index', { title: 'Express' });
});

router.get('/recurring_pay_list', function (req, res, next) {
  // let shop = req.query.shop;

  console.log('111111',req.query);
  let shop = req.query.shop;

  req.where = {'shop_name':shop};
  models['UserInfo'].getAccessToken(req, function (results) {
    
    const shopRequestUrl = 'https://' + shop + '/admin/api/2019-10/recurring_application_charges.json?since_id=12666962008';
    const shopRequestHeaders = {
      'X-Shopify-Access-Token': results.access_token,
    };

    request.get(shopRequestUrl, { headers: shopRequestHeaders })
    .then((shopResponse) => {
      console.log('$$$$', shopResponse)
      res.end(shopResponse);
    })
    .catch((error) => {
      console.log('EEEEEEE', error)
      res.status(error.statusCode).send(error.error.error_description);
    });
  });
  // res.render('index', { title: 'Express' });
});

module.exports = router;
