
// middleware function to check for logged-in users
var sessionChecker = (req, res, next) => {
    if (req.session.user && req.cookies.user_sid && (req.session.user.health_expert_flag || req.session.user.admin_flag)) {
        next();
    } else {
        res.redirect('/login');
    }
};

module.exports = sessionChecker;