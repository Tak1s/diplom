var User = require('models/user').User;

module.exports = function(req, res, next){
    req.user = res.locals.user = null;
    req.oauth = res.locals.oauth = false;

    if(!req.session.user) return next();

    User.findById(req.session.user, function(err, user){
        if (err) return next(err);

        req.user = res.locals.user = user;
        req.oauth = res.locals.oauth = true;
        next();
    });

}
