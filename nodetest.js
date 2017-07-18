var path = require("path");
var AWS = require('aws-sdk'); 
var sample= "Hai world";
global.console.log(`${sample}`);
console.log(path.basename(__filename));
console.log(__dirname);
console.log(process.argv);
AWS.config.loadFromPath('./config.json');
/*
function identifier(flag){
var index = process.argv.indexOf(flag);
return (index == -1) ? null : process.argv[index+1];
}

var qs = require('qs')
var encodedString = 'payload=%7B%22actions%22%3A%5B%7B%22name%22%3A%22Stop%22%2C%22type%22%3A%22button%22%2C%22value%22%3A%22Stopi-0ea055fefca486a9f%22%7D%5D%2C%22callback_id%22%3A%22wopr_game%22%2C%22team%22%3A%7B%22id%22%3A%22T2395KLHE%22%2C%22domain%22%3A%22superheros-group%22%7D%2C%22channel%22%3A%7B%22id%22%3A%22D51SN5SE6%22%2C%22name%22%3A%22directmessage%22%7D%2C%22user%22%3A%7B%22id%22%3A%22U2395KLHW%22%2C%22name%22%3A%22ksivaganesh99%22%7D%2C%22action_ts%22%3A%221499365156.879606%22%2C%22message_ts%22%3A%221499365122.699555%22%2C%22attachment_id%22%3A%222%22%2C%22token%22%3A%22s1Ptr9aEQUwNqhKfeTQgyopM%22%2C%22is_app_unfurl%22%3Afalse%2C%22original_message%22%3A%7B%22text%22%3A%22There+are+2+running+instances%21%5CnPlease+stop+them+if+not+in+use.%22%2C%22bot_id%22%3A%22B5ZF0U34Y%22%2C%22attachments%22%3A%5B%7B%22callback_id%22%3A%22wopr_game%22%2C%22fallback%22%3A%22You+are+unable+to+stop+an+instance%22%2C%22text%22%3A%22+Instance+ID+%3A+i-05318481a1fc7726a%5Cn+Owner%3A+Splunk%22%2C%22id%22%3A1%2C%22color%22%3A%223AA3E3%22%2C%22actions%22%3A%5B%7B%22id%22%3A%221%22%2C%22name%22%3A%22Stop%22%2C%22text%22%3A%22Stop%22%2C%22type%22%3A%22button%22%2C%22value%22%3A%22Stopi-05318481a1fc7726a%22%2C%22style%22%3A%22primary%22%7D%2C%7B%22id%22%3A%222%22%2C%22name%22%3A%22Terminate%22%2C%22text%22%3A%22Terminate%22%2C%22type%22%3A%22button%22%2C%22value%22%3A%22Terminatei-05318481a1fc7726a%22%2C%22style%22%3A%22danger%22%7D%5D%7D%2C%7B%22callback_id%22%3A%22wopr_game%22%2C%22fallback%22%3A%22You+are+unable+to+stop+an+instance%22%2C%22text%22%3A%22+Instance+ID+%3A+i-0ea055fefca486a9f%5Cn+Owner%3A+Splunk-2%22%2C%22id%22%3A2%2C%22color%22%3A%223AA3E3%22%2C%22actions%22%3A%5B%7B%22id%22%3A%223%22%2C%22name%22%3A%22Stop%22%2C%22text%22%3A%22Stop%22%2C%22type%22%3A%22button%22%2C%22value%22%3A%22Stopi-0ea055fefca486a9f%22%2C%22style%22%3A%22primary%22%7D%2C%7B%22id%22%3A%224%22%2C%22name%22%3A%22Terminate%22%2C%22text%22%3A%22Terminate%22%2C%22type%22%3A%22button%22%2C%22value%22%3A%22Terminatei-0ea055fefca486a9f%22%2C%22style%22%3A%22danger%22%7D%5D%7D%5D%2C%22type%22%3A%22message%22%2C%22subtype%22%3A%22bot_message%22%2C%22ts%22%3A%221499365122.699555%22%7D%2C%22response_url%22%3A%22https%3A%5C%2F%5C%2Fhooks.slack.com%5C%2Factions%5C%2FT2395KLHE%5C%2F208295307616%5C%2FVaTrHVOHGFPC8gD0keC4SwNu%22%7D'
var payload = qs.parse(encodedString).payload
var jsonobj = JSON.parse(payload);
var actions = jsonobj.actions;
console.log(actions[0].name)
if(actions[0].name === "Stop"){
console.log("asdg");
}
// { CorrelationId: '1', PickedNumbers: [ '1', '2', '3', '4' ] }
*/


// Create CloudWatch service object
var cw = new AWS.CloudWatch({apiVersion: '2010-08-01'});

var params = {
 
  MetricName: 'EstimatedCharges',
  Namespace: 'AWS/Billing'
};

cw.listMetrics(params, function(err, data) {
  if (err) {
    console.log("Error", err);
  } else {
    console.log("Metrics", JSON.stringify(data.Metrics));
  }

});

