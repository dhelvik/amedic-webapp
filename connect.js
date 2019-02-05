var mysql = require('mysql');


var con = mysql.createConnection({
        host: "amedic-mysqldbserver.mysql.database.azure.com",
        user: "mysqldbuser@amedic-mysqldbserver",
        password: "Grupp2122",
        database: "amedicdb"
    });

module.exports = con;