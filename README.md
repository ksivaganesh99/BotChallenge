



This is a simple Slack bot to monitor your AWS resources. It is designed using AWS LEX and Lambda functions.


Pain areas to solve using this bot:

1. Usually AWS account users forget to stop the instances when not in use or before leaving the office which leads to surprise surge in the month end bill.
2. As every team member doesn't have access to the AWS Billing and Cost Management service, they are unaware of the billing threshold limits which leads to over utilization of resources.
3. Users forget to properly tag the instances while launching them which is not acceptable(Tags are used to segregate the overall AWS bill).

Sloution developed:

1. Everyday at 6:30 pm we have scheduled an event to trigger the AWS Lambda function which posts all the running instance at that particular time to the Slack team. We can stop the instances without logging into AWS console.
2. Using Cloudwatch billing  matrics we have set a threshold for the estimated charges and have sent a notification to slack team via AWS SNS and lambda function.
3. Using Cloudwatch ec2 events API we automated instance tagging. Simillarly auto-tagging for the other resources can be done on their creation.


Enhancements:

1. We need to add authorization to stop and launch the instances(As of know we are setting up a proper service role to Lambda function). We are planning to leverage Cognito Identity services for authentication.
2. We should be able to get the billing details from Lex bot and take appropriate action.
3. Planning to tag the resources through Slack bot.




Create a Lex bot using the LEX definition file and also create a Lambda function using this repo.


Give appropriate role to Lambda Function to access all the resources.


We need a Slack app created and configured to integrate with LEX. Please follow the instructions given in the below link.

http://docs.aws.amazon.com/lex/latest/dg/slack-bot-association.html

Create an incoming webhook url for your group and save it for later use.

I assume you have the Slack and LEX integration ready and able to communicate. Now let us go through the solutions one by one.

1. AWS unstopped resource notifier:

Setup an APi Gateway whcih points to another Lambda function. You can get the code at https://github.com/ksivaganesh99/SlackLambda.git.  This Lambda function reads the running instances from all the regions and send them to Slack team using incoming webhook URL you saved before. 
Create an event rule in CloudWatch to trigger a Lambda function every day at some time. 
Ping from the Lambda function contains buttons whose actions are posted to interative webhoot URL. One point to mention we should have an API gateway configured to the same Lambda function whose endpoint url is used to tackle interactive messages.
While configuring API gateway important point is, In integration request give body template as :
																Content Type : application/x-www-form-urlencoded
																{
																	"postBody" : $input.json("$")
																}

Give this endpoint URL in SLack Interactive Messages request URL.																

At any point of time if we want to know the running instances we can ping the app which inturn is a bot. This returns the instances running  at that point of time.
 

2. Billing alert:

Create an alarm in CloudWatch to trigger the above Lambda Function when the billing metrics cross some threshold. This function posts a message to slack webhook URL.


Uploading Bot Lambda Function:

Run 'npm install' command  after opening the code. Zip it and upload it to Lambda functions with the default configuartions.



To test the bot send me an invite to join the team. Right now due to some restrictions not able to distrubute my app to public. Drop me a mail to me to add to my team to test the bot.
