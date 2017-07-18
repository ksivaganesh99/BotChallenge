var qs = require('qs');
var events = require('events');
var request = require('request');
//var Promise = require('Promise');
var AWS = require('aws-sdk');  

AWS.config.region = 'ap-southeast-1';  

//Is called from the Lambda function 
exports.getinstances = function() {  
var instances = [];
var encodedString = "";
var payload = "";
var jsonobj = "";
var actions = "";
var instanceid = "";
var status = "";
var message = "";
var name="";
var payloadopt=[];
var ownerTag='';
var nameTag='';
var promise={};
var instances = [];
var responsemessgae={};
    return new Promise(function(resolve,reject){


    
    var eventEmitter = new events.EventEmitter();
    
    console.log("\n\nLoading handler\n\n");
    //console.log(event.postBody);

    var ec2 = new AWS.EC2();
    
       
var getInstancesByregion = function(regionname,count){
     
    console.log("region"+regionname);
    AWS.config.region = regionname ;
    console.log(AWS.config.region);
        var ec2 = new AWS.EC2().describeInstances();
        //global.promise = global.promise+count;
         global["prom"+count]  = ec2.promise();
         
     
}
eventEmitter.on("updateregion",getInstancesByregion);

 ec2.describeRegions(function(err,data){
     console.log(data);
            var regions = data.Regions;
            var promarray =[];
            sendRegion(0);
            function sendRegion(x){

                if(x<regions.length){
                    getInstancesByregion(regions[x].RegionName,x);
                    console.log(x);
                    promarray.push(global["prom"+x]);
                    x++;
                    sendRegion(x);
                }

            }
            console.log(promarray);
            Promise.all(promarray).then(function(values){
                values.forEach(function(data){
                 if (err) console.log(err, err.stack); // an error occurred
        else{
            var reservations = data.Reservations;
            if(reservations.length > 0){
                //console.log(reservations[0].Instances);
            }
            
            instances = [];
            reservations.forEach(function(reservation){
                 instances.push(reservation.Instances);
                 
            });
           console.log(instances.length);
            instances.forEach(function(instance){
                 instance.forEach(function(instan){
               // console.log(instan)
               // console.log(instan.Tags);
                instan.Tags.forEach(function(tag){
                   // console.log(tag.Key+" "+tag.Value);
                 ownerTag = tag.Key === "Owner" ? tag.Value : '--';
                 nameTag = tag.Key === "Name" ? tag.Value : '--';
                })
                var valuenew = instan.InstanceId;
                var availability = instan.Placement.AvailabilityZone;
                if(instan.State.Name === "running"){

                payloadopt.push( {
                "title": " Instance ID : "+instan.InstanceId+" Instance Type "+instan.InstanceType,
                "subTitle": " Owner: "+ownerTag+"   Name : "+nameTag+"\n AvailabilityZone : "+availability,
                "buttons":[ 
                 {
                    "text":"Stop",
                    "value":valuenew
                 }
              ]
        });
        }	
          // console.log(instan.State.Name);
           });
            });
           
         // console.log(instances);
            //console.log("\n\n" + instances + "\n\n"); // successful response
                }
  
       // context.done(null, 'Function Finished!');  
               //  console.log("Value 0 is " + values[0].toString);
               // console.log("Value 1 is " + values[1].toString);
                //console.log("Value 2 is " + values[2].toString);
                });

              
   
            console.log("asdkaldjoj");
         responsemessgae = {"text":"There are total "+payloadopt.length+" running instancecs.\n Please stop them if not in use","attachments":payloadopt};
       // console.log(responsemessgae);
        resolve(responsemessgae);
       // return responsemessgae;
            });

 
           console.log("success");
          // return "Hello World";
        });

   /* ec2.describeInstances(function(err, data) {
        console.log("\nIn describe instances:\n");
        if (err) console.log(err, err.stack); // an error occurred
        else{
            var reservations = data.Reservations;
            console.log(reservations.length);
            for(var i=0;i<reservations.length;i++){
                //console.log(reservations[i]);
             instances.push(reservations[i].Instances);
            }
             for(var j=0;j<instances.length;j++){
           console.log(instances[j][0].State.Name);
             }
            //console.log("\n\n" + instances + "\n\n"); // successful response
                }
        
       // context.done(null, 'Function Finished!');  
    });*/
     
   // var params = {InstanceIds: [instanceid]};
   // console.log(params);

 /* message = {
        "text": name+" has requested to stop the instance "+instanceid+" and the current status is stopping",
        "replace_original": false
    }*/
   //console.log(message);
//context.done(null, message); 
//return "hello";
});
};  