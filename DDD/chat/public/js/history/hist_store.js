var ActionsHist;

ActionsHist = Reflux.createActions(["getMess", "sendFilter", "setDt"]);

window.StoreHist = Reflux.createStore({
  listenables: ActionsHist,
  init: function() {
    var self;
    self = this;
    this.uName = window.config.user.name;
    this.filter_dt = '';
    return this.message = [];
  },
  onSetDt: function(new_dt) {
    console.log("onSet", new_dt);
    this.filter_dt = new_dt;
    return this.onSendFilter();
  },
  sendMethod: function(url, data, callback) {
    var self;
    self = this;
    return $.ajax({
      url: url,
      type: "POST",
      data: data,
      success: function(res, stat) {
        return callback(res);
      },
      error: function(res, stat) {}
    });
  },
  onSendFilter: function() {
    var new_filter, self;
    self = this;
    new_filter = {
      dt: this.filter_dt
    };
    return this.sendMethod('/history', new_filter, this.cb);
  },
  cb: function(res) {
    this.message = res.history;
    return this.trigger("new_hist");
  },
  onGetMess: function() {
    return this.message;
  }
});
