var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var mysql = require('mysql');
var con = require('./connect');
var router = require('./router');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var sessionChecker = require('./scripts/sessionChecker');
//configure app
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// initialize cookie-parser to allow us access the cookies stored in the browser.
app.use(cookieParser());

// initialize express-session to allow us track the logged-in user across sessions.
app.use(session({
    key: 'user_sid',
    secret: 'somerandonstuffs',
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 600000
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
app.use(router);




// This middleware will check if user's cookie is still saved in browser and user is not set, then automatically log the user out.
// This usually happens when you stop your express server after login, your cookie still remains saved in the browser.
app.use((req, res, next) => {
    if (req.cookies.user_sid && !req.session.user) {
        res.clearCookie('user_sid');
    }
    next();
});

/*con.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");

});*/

//***ROUTES****
//ROUTES PATIENT
app.use('/patients', require('./routes/patients'));

// ROUTES USER
app.use('/users', require('./routes/users'));

app.use('/login', require('./routes/login'));




app.listen(process.env.PORT || 3000, function(){

    console.log('ready on port 3000');

});
