var User = require('models/user').User;
var HttpError = require('error').HttpError;
var async = require('async');

exports.get = function(req, res){
    res.render('login_page');
}

exports.post = function(req, res) {
    console.log(req.body)
    var username = req.body.username;
    var password = req.body.password;

    async.waterfall([
      function(callback){
          User.findOne({username: username},callback);
      },
      function(user, callback){
          if(user) {
              if (user.checkPassword(password)) {
                  callback(null, user);
              } else {
                  next(new HttpError(403, "Pass not valid"));
              }
          }else{
              var user = new User({username:username, password:password});
              user.save(function(err){
                  if(err) return next(err);
                  callback(null, user);
              })
          }
      }
    ],function(err, user){
        if(err) return next(err);
        req.session.user = user._id;
        res.json({error:'no'});
    });


}