'use strict';

const { v4: uuidv4 } = require('uuid');
const orderManager = require('./components/dynamoManager')
const sqsManager = require('./components/sqsManager')
const pnsManager = require('./components/pushNotificationManager')
const utils = require('./utils')

/*
  register
*/

module.exports.register = (event, context, callback) => {

  console.log("Registro en DB fue llamada");

  const idPNS = uuidv4();
  const request = JSON.parse(event.body);
  const {name,token,phone} = request;

  const pn = {
    idPNS: idPNS ,
    phone : phone,
    name: name,
    token: token,
    isActive: true
  }

  orderManager.save(pn)
  .then(resp => callback())
  .catch(err => callback(err));
}


/*
  msgPns
*/

module.exports.msgPns = (event, context, callback) => {
  
  console.log("Agrega a cola fue llamada");

  const request = JSON.parse(event.body);
  const {idPNS, body} = request;
  const title = process.env.PNSTITLE

  let token = '';

  orderManager
  .exist(idPNS)
  .then(pn => {
    token = pn.token
  })
  .catch(error => {
    utils.sendResponse(500, 'Hubo un error al procesar el pedido', callback);
  });

  const msg = {
    token,
    title,
    body
  }

  sqsManager.sendToSQS(msg);
};

/*
  send
*/

module.exports.send = (event, context, callback) => {

  console.log("Envio de mensaje Push fue llamada");

  const pn = JSON.parse(event.Records[0].body);
  const { token, body} = pn;
  
  // enviar notificaciones
  pnsManager.sendPNS(token,body);
}

/*
  exist
*/

module.exports.exist = (event, context, callback) => {

  const registry = event.pathParameters && event.pathParameters.registry;
	
  if (registry !== null) {
		orderManager
			.exist(registry)
			.then(pn => {
				utils.sendResponse(200, pn, callback);
			})
			.catch(error => {
				utils.sendResponse(500, 'Hubo un error al procesar el pedido', callback);
			});
	} else {
		sendResponse(400, 'Falta el orderId', callback);
	}
}