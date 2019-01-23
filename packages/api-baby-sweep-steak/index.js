'use strict';
var AWS = require('aws-sdk');
AWS.config.update({ region: 'eu-west-1' });

module.exports = {
  handle: (event, context, callback) => {
    const s3 = new AWS.S3({ apiVersion: '2006-03-01' });
    var params = {
      Bucket: "baby-sweep-stake",
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
  }
}