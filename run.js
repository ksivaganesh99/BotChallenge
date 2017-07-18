var AWS = require('aws-sdk');
var handler = require('./index').handler; 
var event = require('./sample.json').event;
var context = require('./sample.json').context;
var fs = require('fs');
var json = JSON.parse(fs.readFileSync('./sample.json', 'utf8'));
var callback = function(res, response){
console.log(response);
};

context = json.context;
console.log(context);
AWS.config.loadFromPath('./config.json');


handler(event,context,callback);
