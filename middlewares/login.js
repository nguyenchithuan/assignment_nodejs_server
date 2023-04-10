exports.check_login = (req, res, next) => {
    if(req.session.accountLogin) {
        next();
    } else {
        res.redirect('/settings/login');
    }
}