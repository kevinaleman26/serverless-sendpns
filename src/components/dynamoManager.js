'use strict'

const AWS = require('aws-sdk')
const dynamo = new AWS.DynamoDB.DocumentClient();
const tableName = process.env.DYNAMOTABLE;

module.exports.save = registry => {

    console.log('Guardar un Registro PNS fue llamado');

    const params = {
        TableName: tableName,
        Item: registry
    };

    return dynamo.put(params).promise();

};

module.exports.exist = idPNS => {

    console.log('Conseguir PNS fue llamada');

    const params = {
		TableName: tableName,
		Key: {
			idPNS
		}
	};

	return dynamo
		.get(params)
		.promise()
		.then(item => {
			return item.Item;
		});

};