var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var mysql = require('mysql');

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

function getConnection(){

return mysql.createConnection({
    host: "amedic-mysqldbserver.mysql.database.azure.com",
    user: "mysqldbuser@amedic-mysqldbserver",
    password: "Grupp2122",
    database: "amedicdb"
});
}

/*con.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");

});*/

app.get('/users', function(req, res){
    getConnection().query("select * from AMEDUser", function(err, result){
        res.render('showUsers', {
            result: result
        });

    })
});

app.get('/', function(req, res){
        res.render('index');


});



app.post('/add', function(req, res){
    var newItem = req.body.newItem;
    todoItems.push({
        id: todoItems.length+1,
        desc: newItem
    });
    res.redirect('/');
});





app.listen(1337, function(){

    console.log('ready on port 1337');
});
