var express = require('express');
var router = express.Router();
const request = require('request-promise');
var models = require('../models');
// const forwardingAddress = "https://0a14bfb7.ngrok.io";

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log(req.query.shop);
  // let shop = req.query.shop;
  let shop = 'hemant-test-store-001.myshopify.com';

  req.where = {'shop_name':shop};
  models['UserInfo'].getFirstValues(req, function (results) {
    let settingsDataFlag = true;
    let userDataObj = results.dataValues;
    
    if(results.dataValues.Settings.length == 0){
      settingsDataFlag = false;
    }
    res.render('index', { userDataObj:userDataObj, settingsDataFlag:settingsDataFlag });
  });  
});

// router.get('/payment', function(req, res, next) {

//   let shop = req.query.shop;
//   req.where = {'shop_name':shop};
//   models['UserInfo'].getAccessToken(req, function (results) {

//     let new_request1 = {
//       "recurring_application_charge": {
//         "name": "New Plan Test 1111111",
//         "price": 1.0,
//         "return_url": "https://0a14bfb7.ngrok.io/shopify/recurring_application_charge_return",
//         "test": true,
//         "trial_days":1
//       }
//     };
//     let shopRequestUrl1 = 'https://' + shop + '/admin/api/2019-10/recurring_application_charges.json';
//     let options1 = {
//       method: 'POST',
//       uri: shopRequestUrl1,
//       json: true,
//       resolveWithFullResponse: true,//added this to view status code
//       headers: {
//           'X-Shopify-Access-Token': results.access_token,
//           'content-type': 'application/json'
//       },
//       body: new_request1
//     };
//     request.post(options1)
//       .then((shopResponse1) => {
        
//         console.log('payment111111', shopResponse1.body)     
//         res.redirect(shopResponse1.body.recurring_application_charge.confirmation_url); 
//         // res.json(shopResponse);
//       })
//       .catch((error) => {
//         console.log('errorerror',error)
//     });

//   });  
//   // res.render('index', { title: 'Express' });
// });


// router.get('/accept', function(req, res, next) {

//   // let shop = req.query.shop;
//   let shop = 'hemant-test-store-001.myshopify.com';
//   req.where = {'shop_name':shop};
//   models['UserInfo'].getAccessToken(req, function (results) {

//     let new_request = {
//       "recurring_application_charge": {
//         "id":12671320152,
//         "name":"Super Duper Plan 1111111",
//         "api_client_id":3257485,
//         "price":"1.00",
//         "status":"accepted",
//         "return_url":"https:\/\/0a14bfb7.ngrok.io\/shopify\/recurring_application_charge_return",
//         "billing_on":null,
//         "created_at":"2020-02-19T02:25:36-05:00",
//         "updated_at":"2020-02-19T02:26:49-05:00",
//         "test":true,
//         "activated_on":null,
//         "cancelled_on":null,
//         "trial_days":0,
//         "trial_ends_on":null,
//         "decorated_return_url":"https:\/\/0a14bfb7.ngrok.io\/shopify\/recurring_application_charge_return?charge_id=12671320152"
//       }
//     };
//     let shopRequestUrl = 'https://' + shop + '/admin/api/2019-10/recurring_application_charges/12671320152/activate.json';
//     let options = {
//       method: 'POST',
//       uri: shopRequestUrl,
//       json: true,
//       resolveWithFullResponse: true,//added this to view status code
//       headers: {
//           'X-Shopify-Access-Token': results.access_token,
//           'content-type': 'application/json'
//       },
//       body: new_request
//     };
//     request.post(options)
//       .then((shopResponse) => {
        
//         console.log('payment111111', shopResponse.body)     
//         // res.redirect(shopResponse.body.recurring_application_charge.confirmation_url); 
//         res.json(shopResponse);
//       })
//       .catch((error) => {
//         console.log('errorerror',error)
//     });

//   });  
//   // res.render('index', { title: 'Express' });
// });

module.exports = router;
