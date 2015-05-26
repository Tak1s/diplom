var ActionsMess;

ActionsMess = Reflux.createActions(["getMess", "sendMess"]);

window.StoreMess = Reflux.createStore({
  displayName: "StoreMess",
  listenables: ActionsMess,
  init: function() {
    this.uName = 'Tak1s';
    return this.message = [];
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
    this.message.push(new_mess);
    return this.trigger(this.message);
  }
});
