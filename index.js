'use strict';
var getInstances = require('./getinstances');
 
    // Close dialog with the customer, reporting fulfillmentState of Failed or Fulfilled ("Thanks, your pizza will arrive in 20 minutes")
    function elicitintent(sessionAttributes, message) {
        if( message !== null){
         
         return {
            sessionAttributes,
            dialogAction: {
                type: 'ElicitIntent'
            },
        };   
            
        }else{
        
        return {
            sessionAttributes,
            dialogAction: {
                type: 'ElicitIntent',
                message
            },
        };
        
        }
    }
    
      function elicitslot(sessionAttributes,intentName,slotToElicit,slots,message) {
            if( message !== null){
        return {
            sessionAttributes,
            dialogAction: {
                 type: 'ElicitSlot',
                 intentName,
                 slots,
                 slotToElicit,
                 message
            },
        };
            }else{
       return {
            sessionAttributes,
            dialogAction: {
                 type: 'ElicitSlot',
                 intentName,
                 slots,
                 slotToElicit
            },
        };  
            }
    }
    
      function confirmintent(sessionAttributes,intentName,slots,message) {
           if( message !== null){
        return {
            sessionAttributes,
            dialogAction: {
                type: 'ConfirmIntent',
                 intentName,
                 slots,
                 message
            },
        };
           }else{
             return {
            sessionAttributes,
            dialogAction: {
                type: 'ConfirmIntent',
                 intentName,
                 slots
            },
        };  
           }
    }
    
      function delegate(sessionAttributes,slots) {
        return {
            sessionAttributes,
            dialogAction: {
                type: 'Delegate',
                slots
            },
        };
    }
    
      function close(sessionAttributes, fulfillmentState, message,attachments) {
          console.log(message);
          console.log(sessionAttributes);
          console.log(fulfillmentState);
           if( message !== null && attachments != null){
               console.log("not null");
        return {
            sessionAttributes,
            dialogAction: {
                type: 'Close',
                fulfillmentState,
                message: message,
                responseCard: {
      version: 2,
      contentType: "application/vnd.amazonaws.card.generic",
      genericAttachments:attachments 
        
     }
            },
        };
           }else{
          return {
            sessionAttributes,
            dialogAction: {
                type: 'Close',
                fulfillmentState
            },
        };     
           }
    }
     
    // --------------- Events -----------------------
     
    function dispatch(intentRequest, callback) {
        console.log(intentRequest);
        //console.log(`request received for userId=${intentRequest.userId}, intentName=${intentRequest.currentIntent.name}`);
         var sessionAttributes = intentRequest.sessionAttributes;
         if(sessionAttributes === null){
             sessionAttributes = {};
         }
        var slots = intentRequest.currentIntent.slots;
        // const passwordtype = slots.passwordtype;
         const invocationsource = intentRequest.invocationSource;
         const confirmationstatus = intentRequest.currentIntent.confirmationStatus;
         const intentName = intentRequest.currentIntent.name;
         console.log(intentRequest);
         console.log("invocationSource"+intentRequest.invocationSource);
          if( intentName === "GetAllInstances"){
             
        if(invocationsource === "FulfillmentCodeHook"){

            var promise = getInstances.getinstances();
            console.log("message");
            promise.then(function(data){
                callback(close(sessionAttributes, 'Fulfilled', {'contentType': 'PlainText', 'content': data.text},data.attachments));
            });
             
        }else if( invocationsource === "DialogCodeHook"){      
                 callback(delegate(sessionAttributes,slots));
         
        }else{
              callback(close(sessionAttributes, 'Fulfilled'));
         }
    }
    }
       
  
      
      
      


      

     
    // --------------- Main handler -----------------------
     
    // Route the incoming request based on intent.
    // The JSON body of the request is provided in the event slot.
    exports.handler = (event, context, callback) => {
        try {
            dispatch(event,
                (response) => {
                    callback(null, response);
                });
        } catch (err) {
            callback(err);
        }
    };