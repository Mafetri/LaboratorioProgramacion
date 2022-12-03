export function isLoggedIn (req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    return res.redirect('/sign');
}

export function isNotLoggedIn (req, res, next){
    if(!req.isAuthenticated()){
        return next();
    }
    return res.redirect('/dashboard');
}


