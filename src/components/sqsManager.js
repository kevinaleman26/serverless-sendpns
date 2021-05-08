'use strict';
const utils = require('./utils')
const AWS = require('aws-sdk');

const sqs = new AWS.SQS({ region: process.env.REGION });
const QUEUE_URL = process.env.PENDING_QUEUE;


module.exports.sendToSQS = msg => {

    const params = {
		MessageBody: JSON.stringify(msg),
		QueueUrl: QUEUE_URL
	};

    sqs.sendMessage(params, function(err,data){
        if(err) {
            utils.sendResponse(500,err, callback)
        } else {
            utils.sendResponse(200,msg, callback)
        }
    });
}