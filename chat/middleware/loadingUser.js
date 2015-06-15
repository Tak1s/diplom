var User = require('models/user').User;

module.exports = function(req, res, next){
    req.client_config = res.locals.client_config = {};
    req.client_config.user = res.locals.client_config.user = null;
    req.client_config.oauth = res.locals.client_config.oauth = false;

    if(!req.session.user) return next();

    User.findById(req.session.user, function(err, user){
        if (err) return next(err);

        req.client_config.user = res.locals.client_config.user = {id:user.get('id'), name:user.get('username')};
        req.client_config.oauth = res.locals.client_config.oauth = true;
        next();
    });

}
