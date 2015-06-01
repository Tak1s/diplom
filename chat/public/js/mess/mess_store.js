var ActionsMess;

ActionsMess = Reflux.createActions(["getMess", "sendMess"]);

window.StoreMess = Reflux.createStore({
  displayName: "StoreMess",
  listenables: ActionsMess,
  init: function() {
    var self;
    self = this;
    this.uName = 'Tak1s';
    this.message = [];
    this.socket = io.connect('', {
      reconnect: false
    });
    return this.socket.on('message', function(username, new_mess) {
      self.message.push(new_mess);
      return self.trigger('new_mess');
    }).on('join', function(username) {
      return console.log("user_join_LOG: ", username);
    }).on('leave', function(username) {
      return console.log("user_leave_LOG: ", username);
    }).on('connect', function() {
      return console.log("connect_LOG: ", "connect");
    }).on('disconnect', function() {
      console.log("connect_LOG: ", "disconnect");
      return setTimeout(function() {
        return self.reconnect;
      }, 500);
    });
  },
  reconnect: function() {
    var self;
    self = this;
    this.socket.once('error', function() {
      return setTimeout(function() {
        return self.reconnect;
      }, 500);
    });
    return this.socket.socket.connect();
  },
  onGetMess: function() {
    return this.message;
  },
  onSendMess: function(mess_body) {
    var new_mess;
    console.log("mess_body", mess_body);
    new_mess = {
      dt_send: new Date(),
      user: "user",
      name: this.uName,
      body: mess_body
    };
    return this.socket.emit('message', new_mess, function(data) {
      return console.log("res: ", data);
    });
  }
});
