var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var mysql = require('mysql');
var con = require('./connect');
var router = require('./router');
//configure app
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


// create application/json parser
var jsonParser = bodyParser.json()

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })
//use middleware
app.use(urlencodedParser);
app.use(jsonParser);
//define routes
app.use(router);


/*con.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");

});*/



app.listen(process.env.PORT || 3000, function(){

    console.log('ready on port 3000');

});
