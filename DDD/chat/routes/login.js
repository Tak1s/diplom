var User = require('models/user').User;
var Chat = require('models/chats').Chat;
var HttpError = require('error').HttpError;
var AuthError = require('models/user').AuthError;
var async = require('async');

exports.get = function(req, res){
    res.render('login_page');
}

exports.post = function(req, res, next) {
    var username = req.body.username;
    var password = req.body.password;

    async.waterfall([
        function(callback) {
            User.authorize(username, password, function (err, user, next) {
                if (err) {
                    if (err instanceof AuthError) {
                        return callback(new HttpError(403, err.message));
                    } else {
                        return next(err);
                    }
                }
                callback(null, user._id);
            });
        },
        function(user_id,callback){

            Chat.createChat(user_id, function(err, chat, next){
                if(err) return next(err);

                callback(null, {user_id: user_id,chat_id:chat._id})
            });
        }
        ],function(err, data){
            if (err) throw next(err);
            req.session.user = data.user_id;
            req.session.chat = data.chat_id;
            res.json({error: 'no'});
    });

}