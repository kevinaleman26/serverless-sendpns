var mysql = require('mysql');
var connection = mysql.createConnection({
    host: "database-1.cluster-ckct2p2sjkhb.us-east-1.rds.amazonaws.com",
    user: "admin",
    password: "ABCD1234567890.",
    database: "database-1",
});
// console.log(connection);
module.exports.showTables = (callback) => {
    connection.query('show tables', function (error, results, fields) {
        if (error) {
            connection.destroy();
            throw error;
        } else {
            // connected!
            console.log(results);
            callback(error, results);
            connection.end(function (err) { callback(err, results);});
        }
    });
};