var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var mysql = require('mysql');
var con = require('./connect');

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



/*con.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");

});*/
app.get('/patients', function(req, res){
    con.query("select * from Patient", function(err, result){
        res.render('showPatient', {
            result: result
        });

    })
});
app.get('/users', function(req, res){
    con.query("select * from AMEDUser", function(err, result){
        res.render('showUsers', {
            result: result
        });

    })
});

app.get('/', function(req, res){
    res.render('index');
});

app.get('/folke', function (req, res) {
    var AMEDUser = require('./models/AMEDUser');
    AMEDUser.findAll().then(asd => {res.send(asd)});
})

app.get('/registerUser', function(req, res){
    res.render('registerUser');
});
app.get('/registerPatient', function(req, res){
    res.render('registerPatient');
});
app.get('/registerHealthFacility', function(req, res){
    res.render('registerHealthFacility');
});

app.post('/add', function(req, res){
    var newItem = req.body.newItem;
    todoItems.push({
        id: todoItems.length+1,
        desc: newItem
    });
    res.redirect('/');
});

app.listen(process.env.PORT || 3000, function(){

    console.log('ready on port 1337 or 3000');
});
