'use strict';

const utils = require('../utils')
const AWS = require('aws-sdk');
const glue = new AWS.Glue();

module.exports.glueTaskStatus = (jobName,maxResult,callback) => {

    var params = {
        JobName: jobName,
        MaxResults: maxResult
      };
      
    glue.getJobRuns(params, function(err, data) {
        if (err) utils.sendResponse(500,'Hubo algun error', callback)
        else     
            msg = {
                jobName,
                maxResult,
                executionHistory: data.JobRuns
            }
            utils.sendResponse(200,msg, callback)
    });
}