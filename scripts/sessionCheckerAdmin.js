
// middleware function to check for logged-in users
var sessionCheckerAdmin = (req, res, next) => {
    if (req.session.user && req.cookies.user_sid && req.session.user.admin_flag) {
        next();
    } else {
        res.redirect('/login');
    }
};

module.exports = sessionCheckerAdmin;