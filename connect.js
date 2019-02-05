const Sequelize = require('sequelize');

var mysql = require('mysql');
var con = mysql.createConnection({
        host: "amedic-mysqldbserver.mysql.database.azure.com",
        user: "mysqldbuser@amedic-mysqldbserver",
        password: "Grupp2122",
        database: "amedicdb"
    });

const db = new Sequelize('amedicdb', 'mysqldbuser@amedic-mysqldbserver', 'Grupp2122', {
    host: "amedic-mysqldbserver.mysql.database.azure.com",
    dialect: "mysql",
    pool:{
        min:0,
        acquire: 30000,
        idle: 100000
    }

});


module.exports = con;
module.exports = db;