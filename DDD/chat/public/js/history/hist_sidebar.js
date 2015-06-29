var HistSideBar;

HistSideBar = React.createClass({
  displayName: "HistSideBar",
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
  handleEvent: function(new_dt) {
    console.log(new_dt);
    return ActionsHist.setDt(new_dt);
  },
  render: function() {
    if (window.config.oauth === true) {
      return React.createElement("div", {
        "className": "sidebar_wrapp"
      }, React.createElement(NavBlock, {
        "classAct": "history"
      }), React.createElement("div", {
        "className": "content_sidebat"
      }, React.createElement("div", {
        "className": "panel panel-primary"
      }, React.createElement("div", {
        "className": "panel-heading"
      }, React.createElement("h3", {
        "className": "panel-title"
      }, "\u0418\u0441\u0442\u043e\u0440\u0438\u044f")), React.createElement("div", {
        "className": "panel-body"
      }, React.createElement(DtPicer, {
        "cb": this.handleEvent
      })))));
    }
  }
});

React.render(React.createElement(HistSideBar, null), document.getElementById('side_bar_wrapp'));
