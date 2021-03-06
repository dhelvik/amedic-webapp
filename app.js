var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var mysql = require('mysql');
var con = require('./connect');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var sessionChecker = require('./scripts/sessionChecker');
var moment = require('moment');
app.locals.moment = moment;
//configure app
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

//Used for linking CSS
app.use(express.static(__dirname + "/"));



// initialize cookie-parser to allow us access the cookies stored in the browser.
app.use(cookieParser());

// initialize express-session to allow us track the logged-in user across sessions.
app.use(session({
    key: 'user_sid',
    secret: 'otroligthemligaord',
    resave: false,
    rolling: true,
    saveUninitialized: false,
    cookie: {
        maxAge: 3600000
    }
}));

// create application/json parser
var jsonParser = bodyParser.json();

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })
//use middleware
app.use(urlencodedParser);
app.use(jsonParser);
//define routes
//app.use(router);


// This middleware will check if user's cookie is still saved in browser and user is not set, then automatically log the user out.
// This usually happens when you stop your express server after login, your cookie still remains saved in the browser.
app.use((req, res, next) => {
    if (req.cookies.user_sid && !req.session.user) {
        res.clearCookie('user_sid');
    }
    next();
});

// This middleware will save the session to local so we can use it in EJS files
app.use(function(req, res, next) {
    res.locals.user = req.session.user;
    next();
});
/*con.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");

});*/

//***ROUTES****

//Routes Index
app.use('/', require('./routes/index'));
//ROUTES PATIENT
app.use('/patients', require('./routes/patients'));

// ROUTES USER
app.use('/users', require('./routes/users'));

// ROUTES LOGIN
app.use('/login', require('./routes/login'));

// ROUTES HEALTHFACILITIES
app.use('/healthFacilities', require('./routes/healthFacilities'));

// ROUTES PROFILE
app.use('/profile', require('./routes/profile'));


//Routes Visits
app.use('/visits', require('./routes/visits'));


//Routes logout
app.get('/logout', (req, res) => {
    if (req.session.user && req.cookies.user_sid) {
        req.session.destroy();
        res.clearCookie('user_sid');
        res.redirect('/login');
    } else {
        res.redirect('/login');
    }
});

app.use('/forgot', require('./routes/forgot'));

//Routes Districts
app.use('/districts',require('./routes/districts'));

// Rotues Villages
app.use('/villages',require('./routes/villages'));

//Generic page not found
app.use('/', (req, res) => {
    res.render('pageNotFound');
});

app.listen(process.env.PORT || 3000, function(){

    console.log('ready on port 3000');

});
