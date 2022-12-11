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

export function isAdmin (req, res, next){
    if(req.user.role == "admin"){
        return next();
    }
    return res.status(400).json({
        message: "User is not an admin"
    });
}

export function isEditor (req, res, next){
    if(req.user.role == "editor"){
        return next();
    }
    return res.status(400).json({
        message: "User is not an editor"
    }); 
}

export function isSecretary (req, res, next){
    if(req.user.role == "secretary"){
        return next();
    }
    return res.status(400).json({
        message: "User is not a secretary"
    }); 
}

export function canGetAuditlog (req, res, next){
    if(req.user.role == "secretary" || req.user.role == "admin" ){
        return next();
    }
    return res.status(400).json({
        message: "User can not get the auditlog"
    }); 
}

export function canEnterDashboard (req, res, next){
    if(req.user.role == "admin" || req.user.role == "editor"){
        return next();
    }
    return res.redirect("/logout");
}
