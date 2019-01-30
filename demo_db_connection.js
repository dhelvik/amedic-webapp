var mysql = require('mysql');
var a = function a(){
var con = mysql.createConnection({
  host: "amedic-mysqldbserver.mysql.database.azure.com",
  user: "mysqldbuser@amedic-mysqldbserver",
  password: "Grupp2122"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});
}
module.exports.a = a;