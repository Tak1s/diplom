var Login;

Login = React.createClass({
  mixins: [React.addons.LinkedStateMixin],
  getInitialState: function() {
    return {
      login_field: '',
      pass_field: '',
      login_chk: null,
      pass_chk: null,
      login_mess: '',
      pass_mess: '',
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
  checkLogin: function() {
    var chk, mess;
    if (parseFloat(this.state.login_field.trim().length) >= 4) {
      chk = true;
      mess = '';
    } else {
      chk = false;
      mess = 'Minimum length – 4 characters';
    }
    this.setState({
      login_chk: chk,
      login_mess: mess
    });
    return chk;
  },
  checkPass: function() {
    var chk, mess, pattern;
    pattern = /^[0-9A-Za-z]{6,14}$/;
    if (this.state.pass_field.trim().search(pattern) === 0) {
      chk = true;
      mess = '';
    } else {
      chk = false;
      mess = 'Enter a password. Allowed characters are A-Z, a-z, 0-9, _. Minimum length – 6 characters; Maximum length – 14 characters.';
    }
    this.setState({
      pass_chk: chk,
      pass_mess: mess
    });
    return chk;
  },
  onLogin: function(el) {
    var login_chk, pass_chk;
    el.preventDefault();
    this.setState({
      error_mess: ''
    });
    login_chk = this.checkLogin();
    pass_chk = this.checkPass();
    if (login_chk && pass_chk) {
      return this.sendMethod('/login', {
        username: this.state.login_field,
        password: this.state.pass_field
      }, (function(_this) {
        return function(res) {
          if (res.error === 'no') {
            return window.location.href = '/chat';
          } else {
            return self.setState({
              error_mess: res.error_mess
            });
          }
        };
      })(this));
    }
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
    if (window.oauth === "true") {
      return React.createElement("div", {
        "className": "logout_wrapper"
      }, React.createElement("form", {
        "action": '#',
        "id": "logout_form",
        "onSubmit": this.onLogout
      }, React.createElement("input", {
        "type": "submit",
        "className": "sub",
        "value": "Logout"
      })));
    } else {
      return React.createElement("div", {
        "className": "login_wrapper"
      }, React.createElement("div", {
        "className": "error_wrapper"
      }, " ", this.state.error_mess, " "), React.createElement("form", {
        "action": '#',
        "id": "login_form",
        "onSubmit": this.onLogin
      }, React.createElement("input", {
        "type": "text",
        "className": "input_login",
        "placeholder": "login",
        "valueLink": this.linkState("login_field"),
        "onBlur": this.checkLogin
      }), React.createElement("div", {
        "className": "error_wrap_login"
      }, " ", this.state.login_mess, " "), React.createElement("input", {
        "type": "password",
        "className": "pass_login",
        "placeholder": "password",
        "valueLink": this.linkState("pass_field"),
        "onBlur": this.checkPass
      }), React.createElement("div", {
        "className": "error_wrap_pass"
      }, " ", this.state.pass_mess, " "), React.createElement("input", {
        "type": "submit",
        "className": "sub",
        "value": "Login"
      })));
    }
  }
});

React.render(React.createElement(Login, null), document.getElementById('body'));
