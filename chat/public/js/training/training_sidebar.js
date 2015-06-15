var TrainingSideBar;

TrainingSideBar = React.createClass({
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
  render: function() {
    if (window.config.oauth === true) {
      return React.createElement("div", {
        "className": "sidebar_wrapp"
      }, React.createElement(NavBlock, {
        "classAct": "training"
      }), React.createElement("div", {
        "className": "content_sidebat"
      }, React.createElement("div", {
        "className": "panel panel-primary"
      }, React.createElement("div", {
        "className": "panel-heading"
      }, React.createElement("h3", {
        "className": "panel-title"
      }, "\u0420\u0435\u0436\u0438\u043c \u043e\u0431\u0443\u0447\u0435\u043d\u0438\u044f")), React.createElement("div", {
        "className": "panel-body"
      }, React.createElement("form", {
        "className": "form-horizontal"
      }, React.createElement("div", {
        "className": "form-group"
      }, React.createElement("label", {
        "for": "select",
        "className": "col-lg-2 control-label"
      }, "\u0422\u0435\u0433:"), React.createElement("div", {
        "className": "col-lg-10"
      }, React.createElement("select", {
        "className": "tag_name form-control",
        "id": "select"
      }, React.createElement("option", null, "\u0412\u043e\u043f\u0440\u043e\u0441"), React.createElement("option", null, "\u0423\u0442\u0432\u0435\u0440\u0436\u0434\u0435\u043d\u0438\u0435"))))), React.createElement("form", {
        "className": "new_tag form-horizontal"
      }, React.createElement("fieldset", null, React.createElement("div", {
        "className": "form-group"
      }, React.createElement("input", {
        "className": "form-control",
        "placeholder": "Новый тег",
        "type": "text"
      })), React.createElement("div", {
        "className": "form-group"
      }, React.createElement("div", {
        "className": "col-lg-10 col-lg-offset-1"
      }, React.createElement("button", {
        "type": "submit",
        "className": "btn btn-primary"
      }, "\u0421\u043e\u0445\u0440\u0430\u043d\u0438\u0442\u044c \u0442\u0435\u0433")))))))));
    }
  }
});

React.render(React.createElement(TrainingSideBar, null), document.getElementById('side_bar_wrapp'));
