var http = require('http');
var sql = require('./demo_db_connection');

var server = http.createServer(function(request, response) {

   /* response.writeHead(200, {"Content-Type": "text/plain"});
    response.end("Hello World!");*/
    sql.a();

});

var port = process.env.PORT || 1337;
server.listen(port);

console.log("Server running at http://localhost:%d", port);
