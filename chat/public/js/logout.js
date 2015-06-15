var LogOut;

LogOut = React.createClass({
  displayName: "LogOut",
  mixins: [React.addons.LinkedStateMixin],
  getInitialState: function() {
    return {
      error_mess: ''
    };
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
      error: function(res, stat) {
        return self.setState({
          error_mess: stat
        });
      }
    });
  },
  onLogout: function(el) {
    el.preventDefault();
    return this.sendMethod('/logout', {}, (function(_this) {
      return function(res) {
        if (res.error === 'no') {
          return window.location.href = '/';
        } else {
          return self.setState({
            error_mess: res.error_mess
          });
        }
      };
    })(this));
  },
  render: function() {
    var ref;
    return React.createElement("div", {
      "className": "logout_wrapper"
    }, React.createElement("p", null, React.createElement("span", {
      "className": "name_lable"
    }, "\u041b\u043e\u0433\u0438\u043d: "), React.createElement("span", {
      "className": "uname"
    }, ((ref = window.config.user) != null ? ref.name : void 0))), React.createElement("a", {
      "href": "/",
      "className": "btn btn-flat btn-primary",
      "onClick": this.onLogout
    }, "\u0412\u044b\u0439\u0442\u0438"));
  }
});
