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
             


             if(confirmationstatus ==="Confirmed"){
                //confirmintent() - to display the message instances in the chat
                 callback(close(sessionAttributes, 'Fulfilled'));
                }
                //failed condition ??
            console.log(intentRequest.invocationSource);
        }else if( invocationsource === "DialogCodeHook"){
            console.log("intentRequest.invocationSource");
             console.log("confirmationstatus"+confirmationstatus);
            if(confirmationstatus ==="None"){
                 callback(delegate(sessionAttributes,slots));
            }else if(confirmationstatus ==="Confirmed"){
                sessionAttributes.Name = slots.Name;
                console.log("sonfirmed");
               /* var request = require('request');
request('http://www.google.com', function (error, response, body) {
  console.log('error:', error); // Print the error if one occurred 
  console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received 
  console.log('body:', body); // Print the HTML for the Google homepage. 
});*/
                 callback(close(sessionAttributes,'Fulfilled',message));
                }else if(confirmationstatus ==="Denied"){
                    console.log(slots);
                     sessionAttributes.Name = slots.Name;
                     console.log(sessionAttributes);
                    slots = { title: '', incidentdesc: '', priority: '' ,mailid: ''};
                callback(confirmintent(sessionAttributes,"CreateTicket",slots, {'contentType': 'PlainText', 'content': `Would you like to create a ticket in the helpdesk system?`}));
                
                }else{
               // const intentName=intentRequest.currentIntent.name;
               // const slotToElicit="passwordtype";
                // callback(elicitslot(sessionAttributes,intentName,slotToElicit,slots));
            }
            
            
        }      
            
         }else if(intentName === "CreateTicket"){
             
             
             
        if(invocationsource === "FulfillmentCodeHook"){
            var userName = sessionAttributes.Name;
            console.log(userName);
             if(confirmationstatus ==="None"){
                 callback(close(sessionAttributes, 'Fulfilled',{'contentType': 'PlainText', 'content': `Dear ${userName}, Your sevice request number is 20 and you can access it on link <a href="https://www.google.com">Ticket</a> <br/>
You can also login to your account and check your pending tickets at following link <a target="_blank">www.google.com</a><br/>
The details have been mailed to your ID
`}));
                }
            console.log(intentRequest.invocationSource);
        }else if( invocationsource === "DialogCodeHook"){
            console.log("intentRequest.invocationSource");
             console.log("confirmationstatus"+confirmationstatus);
            if(confirmationstatus ==="None"){
                 callback(delegate(sessionAttributes,slots));
            }else if(confirmationstatus ==="Confirmed"){
                console.log("sonfirmed");
                var slotToElicit = "title";
                 callback(elicitslot(sessionAttributes,'CreateTicket',slotToElicit,slots));
                }else if(confirmationstatus ==="Denied"){
                    sessionAttributes.Name = slots.Name;
                   console.log("sessionAttributes"+sessionAttributes);
                 callback(close(sessionAttributes,'Fulfilled'));
                }else{
               // const intentName=intentRequest.currentIntent.name;
               // const slotToElicit="passwordtype";
                // callback(elicitslot(sessionAttributes,intentName,slotToElicit,slots));
            }
            
            
        }      
            
         
             
             }else if(intentName === "CiscoVPNConnect"){
                  if(invocationsource === "FulfillmentCodeHook"){
                       if(confirmationstatus ==="None"){
                 callback(close(sessionAttributes, 'Fulfilled',{'contentType': 'PlainText', 'content': `ok, I understood your problem, please follow the below steps  -<br/>
1. Open up Windows services list using Run command services.msc <br/>
2. Close VPN client<br/>
3. Find the Cisco Systems, Inc. VPN service --> Stop <br/>
4. Find the Internet Connection Sharing (ICS) service --> Stop  <br/> 
5. Right click on ICS service and choose Properties. Then change Startup type to Disabled or Manual. <br/>
6. Find Cisco Systems VPN service and Start    <br/>
7. Restart VPN
`}));
                }
            console.log(intentRequest.invocationSource);
                  }else if (invocationsource === "DialogCodeHook"){
            console.log("intentRequest.invocationSource");
             console.log("confirmationstatus"+confirmationstatus);
            if(confirmationstatus ==="None"){
                 callback(delegate(sessionAttributes,slots));
            }else if(confirmationstatus ==="Confirmed"){
                sessionAttributes.Name = slots.Name;
                 callback(close(sessionAttributes,'Fulfilled', {'contentType': 'PlainText', 'content': `Ok`}));
                }else if(confirmationstatus ==="Denied"){
                     sessionAttributes.Name = slots.Name;
                    slots = { title: '', incidentdesc: '', priority: '' ,mailid: ''};
                callback(confirmintent(sessionAttributes,"CreateTicket",slots, {'contentType': 'PlainText', 'content': `Would you like to create a ticket in the helpdesk system?`}));
                
                }else{
               // const intentName=intentRequest.currentIntent.name;
               // const slotToElicit="passwordtype";
                // callback(elicitslot(sessionAttributes,intentName,slotToElicit,slots));
            }
            
            
        } 
                 
                 }else if(intentName === "WndowsOSAccess"){
                  if(invocationsource === "FulfillmentCodeHook"){
                       if(confirmationstatus ==="None"){
                 callback(close(sessionAttributes, 'Fulfilled',{'contentType': 'PlainText', 'content': `ok, I have understood your problem, please follow the below steps  -<br/>
a. Please try with the last 4 passwords.<br/>
b. Please check if you are able to get into machine using one of them.<br/>
c. Connect to VPN with latest password.<br/>
d.Advised to stay connected for few minutes to sync the password.<br/>
e. If still not synced, you are suggested to lock and unlock machine (make sure that VPN is connected during this action).

`}));
                }
            console.log(intentRequest.invocationSource);
                  }else if (invocationsource === "DialogCodeHook"){
            console.log("intentRequest.invocationSource");
             console.log("confirmationstatus"+confirmationstatus);
            if(confirmationstatus ==="None"){
                 callback(delegate(sessionAttributes,slots));
            }else if(confirmationstatus ==="Confirmed"){
                sessionAttributes.Name = slots.Name;
                 callback(close(sessionAttributes,'Fulfilled', {'contentType': 'PlainText', 'content': `Ok`}));
                }else if(confirmationstatus ==="Denied"){
                     sessionAttributes.Name = slots.Name;
                    slots = { title: '', incidentdesc: '', priority: '' ,mailid: ''};
                callback(confirmintent(sessionAttributes,"CreateTicket",slots, {'contentType': 'PlainText', 'content': `Would you like to create a ticket in the helpdesk system?`}));
                
                }else{
               // const intentName=intentRequest.currentIntent.name;
               // const slotToElicit="passwordtype";
                // callback(elicitslot(sessionAttributes,intentName,slotToElicit,slots));
            }
            
            
        } 
                 
                 }else if(intentName === "LetMeeTry"){
                     
                      if(invocationsource === "FulfillmentCodeHook"){
                           if(confirmationstatus ==="Confirmed"){
                 callback(close(sessionAttributes, 'Fulfilled'));
                }
            console.log(intentRequest.invocationSource);
                      }else if (invocationsource === "DialogCodeHook"){
                          
            console.log("intentRequest.invocationSource");
             console.log("confirmationstatus"+confirmationstatus);
            if(confirmationstatus ==="None"){
                 callback(delegate(sessionAttributes,slots));
            }else if(confirmationstatus ==="Confirmed"){
                callback(delegate(sessionAttributes,slots));
                }else if(confirmationstatus ==="Denied"){
                    // sessionAttributes.Name = slots.Name;
                    slots = { title: '', incidentdesc: '', priority: '' ,mailid: ''};
                callback(confirmintent(sessionAttributes,"CreateTicket",slots, {'contentType': 'PlainText', 'content': `Would you like to create a ticket in the helpdesk system?`}));
                
                }else{
               // const intentName=intentRequest.currentIntent.name;
               // const slotToElicit="passwordtype";
                // callback(elicitslot(sessionAttributes,intentName,slotToElicit,slots));
            }
            
            
        
                      }
                     
                }else{
              callback(close(sessionAttributes, 'Fulfilled'));
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