var MessageModule, MessageSendForm, MessageViewForm;

MessageViewForm = React.createClass({
  displayName: "MessageViewForm",
  mixins: [React.addons.LinkedStateMixin],
  getInitialState: function() {
    return {
      message: []
    };
  },
  componentWillUpdate: function() {
    var node;
    node = this.getDOMNode();
    return this.shouldScrollBottom = node.scrollTop + node.offsetHeight === node.scrollHeight;
  },
  componentDidUpdate: function() {
    var node;
    if (this.shouldScrollBottom) {
      node = this.getDOMNode();
      return node.scrollTop = node.scrollHeight;
    }
  },
  componentWillMount: function() {
    var self;
    self = this;
    return window.StoreMess.listen(function(flag) {
      if (flag === "new_mess") {
        return self.setState({
          message: window.StoreMess.onGetMess()
        });
      }
    });
  },
  componentDidMount: function() {},
  viewMessList: function(_obj) {
    if (!_.isEmpty(_obj)) {
      return _.map(_obj, function(obj, key) {
        return React.createElement("li", {
          "key": key
        }, React.createElement("div", {
          "className": "mess_item " + obj.bot
        }, React.createElement("div", {
          "className": "mess_head"
        }, React.createElement("span", {
          "className": "uName"
        }, obj.name), React.createElement("span", {
          "className": "timeSend"
        }, moment(obj.dt).format('HH:mm:ss'))), React.createElement("div", {
          "className": "mess_body"
        }, obj.body)));
      });
    }
  },
  render: function() {
    return React.createElement("div", {
      "className": "mess_wrapper",
      "data-mcs-theme": "dark"
    }, React.createElement("ul", null, this.viewMessList(this.state.message)));
  }
});

MessageSendForm = React.createClass({
  displayName: "MessageSendForm",
  mixins: [React.addons.LinkedStateMixin],
  getInitialState: function() {
    return {
      mess_field: ''
    };
  },
  subMess: function(e) {
    e.preventDefault();
    if (this.state.mess_field.trim().length > 0) {
      window.ActionsMess.sendMess(this.state.mess_field);
    }
    this.setState({
      mess_field: ''
    });
    return React.findDOMNode(this.refs.messBody).focus();
  },
  render: function() {
    return React.createElement("div", {
      "className": "form_wrapper"
    }, React.createElement("form", {
      "action": "",
      "id": "form_mess",
      "onSubmit": this.subMess
    }, React.createElement("div", {
      "className": "form-group"
    }, React.createElement("div", {
      "className": "col-sm-9"
    }, React.createElement("textarea", {
      "id": "mess_body",
      "className": "form-control",
      "ref": "messBody",
      "rows": "2",
      "valueLink": this.linkState("mess_field"),
      "autoFocus": true,
      "placeholder": "Сообщение"
    }))), React.createElement("button", {
      "type": "submit",
      "className": "btn btn-primary"
    }, "\u041e\u0442\u043f\u0440\u0430\u0432\u0438\u0442\u044c")));
  }
});

MessageModule = React.createClass({
  displayName: "MessageModule",
  mixins: [React.addons.LinkedStateMixin],
  getInitialState: function() {
    return {};
  },
  render: function() {
    return React.createElement("div", {
      "className": "well well-sm"
    }, React.createElement("div", {
      "className": "mess_modul"
    }, React.createElement(MessageViewForm, null), React.createElement(MessageSendForm, null)));
  }
});

React.render(React.createElement(MessageModule, null), document.getElementById('content_wrapp'));
