'use strict';
var AWS = require('aws-sdk');
AWS.config.update({ region: 'eu-west-1' });

module.exports = {
  get: (event, context, callback) => {
    const s3 = new AWS.S3({ apiVersion: '2006-03-01' });
    var params = {
      Bucket: "baby-sweap-steak",
      Key: "time_slots.json"
    };
    var responseBody = '';
    s3.getObject(params, function (err, data) {
      //   console.log(data.Body.toString())
      const responseBody = data.Body.toString();
  
      if (err) {
        console.log(err, err.stack);
      } 
      else {
        const response = {
          headers: {
            "Access-Control-Allow-Origin" : "*", // Required for CORS support to work
            "Access-Control-Allow-Credentials" : true // Required for cookies, authorization headers with HTTPS 
          },
          statusCode: 200,
          body: JSON.stringify({'data': JSON.parse(responseBody)}),
        };
        callback(null, response);
      }
    });
  },
  validateAccountName: (account_name, timeSlots) => {
    for(var slot in timeSlots){
      if (slot.account_name === account_name) {
       return false
      }
    };
  }, 
  post: (event, context, callback) => {
    const s3 = new AWS.S3({ apiVersion: '2006-03-01' });
  
    var params = {
      Bucket: "baby-sweap-steak",
      Key: "time_slots.json"
    };
  
    var account_name = JSON.parse(event['body']).account_name
  
    s3.getObject(params, function (err, data) {
      //   console.log(data.Body.toString())
      const timeSlots = JSON.parse(data.Body.toString());
      
      if (this.validateAccountName(account_name, timeSlots) === false) {
        callback(null,  {
          headers: {
            "Access-Control-Allow-Origin" : "*", // Required for CORS support to work
            "Access-Control-Allow-Credentials" : true // Required for cookies, authorization headers with HTTPS 
          },
          statusCode: 200,
          body: "user has already been taken.",
        })
      }
     
      const availableTimeslots = timeSlots.filter(function (slot) {
          if (slot.slot_time === 'AVAILABLE') {
            return true
          }
      })
  
      if (err) {
        console.log(err, err.stack);
      } 
      else {
        const response = {
          headers: {
            "Access-Control-Allow-Origin" : "*", // Required for CORS support to work
            "Access-Control-Allow-Credentials" : true // Required for cookies, authorization headers with HTTPS 
          },
          statusCode: 200,
          body: JSON.stringify({'data': responseBody}),
        };
        callback(null, response);
      }
    });
  }
}