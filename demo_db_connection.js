var http = require('http');
var mysql = require('mysql');


var server = http.createServer(function (request, response) {


       var con = mysql.createConnection({
        host: "amedic-mysqldbserver.mysql.database.azure.com",
        user: "mysqldbuser@amedic-mysqldbserver",
        password: "Grupp2122",
        database: "amedicdb"
    });

    con.connect(function (err) {
        if (err) throw err;
        console.log("Connected!");
        con.query("SELECT table_name FROM information_schema.tables where table_schema = 'amedicdb'", function (err, result, fields) {
            if (err) throw err;
            console.log(result);
        });
    });
    
});

