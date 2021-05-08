const http = require('http');

module.exports.sendPNS = async(token,msg) => {
    
    return new Promise((resolve, reject) => {
       const options = {
           host: "fcm.googleapis.com",
           path: "/fcm/send",
           method: 'POST',
           headers: {
               'Authorization': process.env.authorization,
               'Content-Type': 'application/json'
           }
       };
       
       const req = http.request(options, (res) => {
          resolve('success') ;
       });
       
       req.on('error', (e) => {
           reject(e.message);
       });
       
       const reqBody = '{"to":"' + token + '", "priority" : "high"}'
       
       req.write(reqBody);
       req.end();
    });
}