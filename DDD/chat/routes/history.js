var User = require('models/user').User;
var Chat = require('models/chats').Chat;
var Mess = require('models/message').Message;
var util = require('util');
var async = require('async');
var _ = require('lodash');
var mongoose = require('libs/mongoose'), Schema = mongoose.Schema;

exports.get = function(req, res){
    res.render('history_page');
}

exports.post = function(req, res, next){
    var history = []
    var dt = new Date(req.body.dt);
    var chat_id = req.session.chat;
    var uid = req.session.user;
    var day = 24*60*60*1000;
    console.log("dt1", dt+day, chat_id)
    var uname = '';

    User.findOne({_id:uid},function(err, user){
        if (err) return next(err);

        if(user){
            uname = user.username;
        }
    });

    Mess.getHistory(dt, chat_id, function(err, hist){
        if (err) return next(err);

        _.map(hist, function(obj){
            var _uname = '';
            if(obj.bot){_uname = "Оператор"}else{_uname = uname};
            history.push({
                name: _uname,
                bot:obj.bot,
                body:obj.body,
                dt:obj.dt
            });
        });

        res.json({error: 'no', history:history});
    });


}