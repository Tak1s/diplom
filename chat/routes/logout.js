exports.post = function(req,res, next){
    var sid = req.session.id;
    var io = req.app.get("io");
    var userRoom = "user:room:" + req.user.username;
    var connectedSockets = io.of('/').in(userRoom).connected;
    //req.session.destroy();
    req.session.destroy(function(err){
        Object.keys(connectedSockets).forEach(function (socketId) {
            var socket = connectedSockets[socketId];
            if (socket.handshake.session.id == sid) {
                socket.emit('logout');
                socket.disconnect();
            }
        });
        //io.sockets.to('some room').emit("session:reload", sid);
        ////io.sockets.$emit("session:reload", sid);
        if(err) return next(err);
        res.json({error:'no'});
    });


}