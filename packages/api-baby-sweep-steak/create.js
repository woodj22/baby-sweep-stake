'use strict';
var AWS = require('aws-sdk');
AWS.config.update({ region: 'eu-west-1' });

module.exports = {
  validateAccountName: (accountName, timeSlots) => {
    for(var slot in timeSlots){
      if (slot.account_name === accountName) {
       return false;
      }
    }
  }, 
  findNewTimeSlot: (timeSlots, accountName) => {
    const availableTimeslots = timeSlots.filter(function (slot) {
        if (slot.account_name === 'AVAILABLE') {
          return true;
        }
    });
    var timeSlot = availableTimeslots[Math.floor(Math.random()*availableTimeslots.length)];
    
    timeSlot.account_name = accountName;
    
    return timeSlot;
  },
  handle: (event, context, callback) => {
    const s3 = new AWS.S3({ apiVersion: '2006-03-01' });
    var params = {
      Bucket: "baby-sweap-steak",
      Key: "time_slots.json"
    };
  
    var accountName = JSON.parse(event['body']).account_name;
  
    s3.getObject(params, function (err, data) {
      let timeSlots = JSON.parse(data.Body.toString());
      if (module.exports.validateAccountName(accountName, timeSlots) === false) {
        callback(null,  {
          headers: {
            "Access-Control-Allow-Origin" : "*", // Required for CORS support to work
            "Access-Control-Allow-Credentials" : true // Required for cookies, authorization headers with HTTPS 
          },
          statusCode: 200,
          body: "user has already been taken.",
        });
      }
      return timeSlots;

    }).promise().then(function (data) {
      // console.log(timeSlots.Body.toString())
        let timeSlots = JSON.parse(data.Body.toString());

        const newTimeSlot = module.exports.findNewTimeSlot(timeSlots, accountName);
      
        timeSlots.forEach(function (element, i){
            if(element.time_slot === newTimeSlot.time_slot) {
                timeSlots[i] === element;
            }
        });
      
        var params = {
            Body: JSON.stringify(timeSlots),
            Bucket: "baby-sweap-steak",
            Key: "time_slots.json"
          };
         s3.putObject(params, function(err, data) {
           if (err) console.log(err, err.stack); // an error occurred
           else     console.log(data);           // successful response
    
         });
    
       
          const response = {
            headers: {
              "Access-Control-Allow-Origin" : "*", // Required for CORS support to work
              "Access-Control-Allow-Credentials" : true // Required for cookies, authorization headers with HTTPS 
            },
            statusCode: 200,
            body: JSON.stringify({'data': JSON.stringify(newTimeSlot)}),
          };
          callback(null, response);
    
    });
  }
}