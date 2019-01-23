'use strict';
var AWS = require('aws-sdk');
AWS.config.update({ region: 'eu-west-1' });

module.exports = {
  validateAccountName: (accountName, timeSlots) => {
    for(var i in timeSlots){
      // console.log('This is slot' + timeSlots[i].account_name)
      if (timeSlots[i].account_name === accountName) {
        console.log("this is account Name"  + timeSlots[i].account_name)
       return false;
      }
    }
    return true;
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
     
    }).promise().then(function (data) {
        let timeSlots = JSON.parse(data.Body.toString());
        if (module.exports.validateAccountName(accountName, timeSlots) === false) {
        
          console.log("Validation has failed");
          throw EvalError('Validation Failed. Name has Already been taken')
        }
        return timeSlots;
  
    }).then(function (data) {
      // console.log(data.Body)
        let timeSlots = data

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
    
    }).catch(function (err) {
      console.log(err)
      if(err instanceof Error) {
            console.log('hello world')
          callback(null,  {
             headers: {
               "Access-Control-Allow-Origin" : "*", // Required for CORS support to work
               "Access-Control-Allow-Credentials" : true // Required for cookies, authorization headers with HTTPS 
             },
             statusCode: 400,
             body: "user has already been taken.",
           });
      }
      console.log(err)
      return 
       })
  }
}