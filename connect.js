var mysql = require('mysql');

con = createConnection({
        host: "amedic-mysqldbserver.mysql.database.azure.com",
        user: "mysqldbuser@amedic-mysqldbserver",
        password: "Grupp2122",
        database: "amedicdb"
    })
}
module.exports = con;