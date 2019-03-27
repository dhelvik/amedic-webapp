/*
    Middleware function to check for logged-in users that are HE or admins
    If a user is not logged in it tries to redirect to the login page
*/
var sessionChecker = (req, res, next) => {
    if (req.session.user && req.cookies.user_sid && (req.session.user.health_expert_flag || req.session.user.admin_flag)) {
        next();
    } else {
        res.redirect('/login');
    }
};

module.exports = sessionChecker;