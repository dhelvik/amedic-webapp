/*
    Middleware function to check for logged-in users that have the admin flag
    If a user is not logged in it tries to redirect to the login page
*/
var sessionCheckerAdmin = (req, res, next) => {
    if (req.session.user && req.cookies.user_sid && req.session.user.admin_flag) {
        next();
    } else {
        res.redirect('/login');
    }
};

module.exports = sessionCheckerAdmin;