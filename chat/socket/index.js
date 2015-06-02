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

function LoadSession (sid, callback){
    sessionStore.load(sid, function(err, session){
       if(arguments.length == 0){
           return callback(null,null);
       } else{
           return callback(null, session);
       }
    });
}

function LoadUser (session, callback) {


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
        callback(null, user);
    });

}
var secret = config.get('session:secret');
var sessionKey = config.get('session:key');

module.exports = function(server) {
    var io = require('socket.io').listen(server);
    io.set('origins', 'localhost:*')
    io.set('logger', log);

    //io.set('authorization', function(handshake, callback){
    //    async.waterfall([
    //        function(callback){
    //            handshake.cookies = cookie.parse(handshake.headers.cookie || '');
    //            var sidCookie = handshake.cookies[config.get('session:key')];
    //            var sid = cookieParser.signedCookie(sidCookie, config.get("session:secret"));
    //            //var sid = connect.utils.parseSignedCookie(sidCookie, config.get("session:secret"));
    //
    //            LoadSession(sid, callback);
    //        },
    //        function(session, callback){
    //            if (!session){
    //                callback(new HttpError(401, "No session"));
    //            }
    //
    //            handshake.session = session;
    //            LoadUser(session, callback);
    //        },
    //        function(user, callback){
    //
    //            if(!user){
    //                callback(new HttpError(403, "Anonymous session may not connect"));
    //            }
    //
    //            handshake.user = user;
    //            callback(null);
    //        }
    //    ],function(err){
    //        if(!err){
    //            return callback(null, true);
    //        }
    //        if (err instanceof HttpError){
    //            return callback(null, false);
    //        }
    //        callback(err);
    //    });
    //});
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
                LoadUser(session, callback);
            },
            function (user, callback) {
                if (!user) {
                    return callback(new HttpError(403, "Anonymous session may not connect"));
                }
                callback(null, user);
            }
        ], function (err, user) {

            if (err) {
                if (err instanceof HttpError) {
                    return next(new Error('not authorized'));
                }
                next(err);
            }

            socket.handshake.user = user;
            next();

        });

    });

    io.sockets.on('session:reload', function(sid){
        console.log('sid',sid);
        var clients = io.sockets.clients();
        console.log('clients',clients);
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

        socket.broadcast.emit('join',username);

        socket.on('message', function (text, cb) {
            socket.broadcast.emit('message', username, text);
            cb && cb({code:'ok'});
        });

        socket.on('disconnect', function(){
            socket.broadcast.emit('leave', username);
        });
    });
    return io;
}