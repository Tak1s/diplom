var ChatSideBar;

ChatSideBar = React.createClass({
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
        "classAct": "chat"
      }));
    }
  }
});

React.render(React.createElement(ChatSideBar, null), document.getElementById('side_bar_wrapp'));
