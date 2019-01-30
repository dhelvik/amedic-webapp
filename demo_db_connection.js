var http = require('http');
var mysql = require('mysql');


var server = http.createServer(function (request, response) {


       var con = mysql.createConnection({
        host: "amedic-mysqldbserver.mysql.database.azure.com",
        user: "mysqldbuser@amedic-mysqldbserver",
        password: "Grupp2122",
        database: "sys"
    });

    con.connect(function (err) {
        if (err) throw err;
        console.log("Connected!");
        con.query("SELECT * FROM sys_config", function (err, result, fields) {
            if (err) throw err;
            console.log(result);
        });
    });
    
});

