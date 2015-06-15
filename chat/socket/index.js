var log = require('libs/log')(module);
var express = require('express');
var config = require('config');
var connect = require('connect');
var async = require('async');
var cookie = require('cookie');
var cookieParser = require('cookie-parser');
var sessionStore = require('libs/sessionStore');
var HttpError = require('error').HttpError;
var User = require('models/user').User;
var Mess = require('models/message').Message;

function LoadSession (sid, callback){
    sessionStore.load(sid, function(err, session){
       if(arguments.length == 0){
           return callback(null,null);
       } else{
           return callback(null, session);
       }
    });
}

function LoadUserChat (session, callback) {

    if(!session.user){
        log.debug("Session %s is anonymous", session.id);
        return callback(null, null);
    }
    log.debug("retrieving user "+ session.user);

    User.findById(session.user, function(err, user){
        if (err) return callback(err);

        if (!user){
            return callback(null, null);
        }
        log.debug("user findById result: ", + user);

        callback(null, {user:user, chat_id:session.chat});
    });

}
var secret = config.get('session:secret');
var sessionKey = config.get('session:key');

module.exports = function(server) {
    var io = require('socket.io').listen(server);
    io.set('origins', 'localhost:*')
    io.set('logger', log);

    io.use(function (socket, next) {
        var handshakeData = socket.request;

        async.waterfall([
            function (callback) {
                //получить sid
                var parser = cookieParser(secret);
                parser(handshakeData, {}, function (err) {
                    if (err) return callback(err);

                    var sid = handshakeData.signedCookies[sessionKey];

                    LoadSession(sid, callback);
                });
            },
            function (session, callback) {
                if (!session) {
                    return callback(new HttpError(401, "No session"));
                }

                socket.handshake.session = session;
                LoadUserChat(session, callback);
            },
            function (data, callback) {
                if (!data.user) {
                    return callback(new HttpError(403, "Anonymous session may not connect"));
                }
                callback(null, data);
            }
        ], function (err, data) {

            if (err) {
                if (err instanceof HttpError) {
                    return next(new Error('not authorized'));
                }
                next(err);
            }

            socket.handshake.user = data.user;
            socket.handshake.chat_id = data.chat_id;
            next();

        });

    });

    io.sockets.on('session:reload', function(sid){
        console.log('sid',sid);
        var clients = io.sockets.clients();
        clients.forEach(function(){
            if(client.handshake.session.id != sid) return;

            LoadSession(sid, function(err, session){
                if(err){
                    client.emit("error", "server error");
                    client.disconnect();
                    return;
                }

                if(!session){
                    client.emit("logout", "handshake unauthorized");
                    client.disconnect();
                    return;
                }

                client.handshake.session = session;
            });
        });

    });

    io.sockets.on('connection', function (socket) {
        var userRoom = "user:room:" + socket.handshake.user.username;
        socket.join(userRoom);

        var username = socket.handshake.user.get('username');
        var chat_id = socket.handshake.chat_id;

        socket.broadcast.emit('join',username);

        socket.on('message', function (text, cb) {
            Mess.saveMess(chat_id, text, function(err, mess){
                if (err) return(err);
                var bot_mess = {
                    dt: new Date(),
                    bot:true,
                    name: "Operator",
                    body: "Test text"
                }
                Mess.saveMess(chat_id, bot_mess, function(err, bot_mess){
                    if (err) return(err);
                    var _mess ={
                        dt: bot_mess.dt,
                        bot:bot_mess.bot,
                        name: "Operator",
                        body: bot_mess.body
                    }
                    socket.emit('message', username, _mess);
                    cb && cb({code:'ok'});
                });
            });

            //var bot_mess = {
            //    dt: new Date(),
            //    bot:true,
            //    name: "Operator",
            //    body: "Test text"
            //}
            //
            //socket.emit('message', username, bot_mess);
            //cb && cb({code:'ok'});
        });

        socket.on('disconnect', function(){
            socket.broadcast.emit('leave', username);
        });
    });
    return io;
}