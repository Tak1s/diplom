var HistoryModule, HistoryViewForm;

HistoryViewForm = React.createClass({
  displayName: "HistoryViewForm",
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
    return window.StoreHist.listen(function(flag) {
      if (flag === "new_hist") {
        return self.setState({
          message: window.StoreHist.onGetMess()
        });
      }
    });
  },
  viewMessList: function(obj) {
    if (!_.isEmpty(obj)) {
      return _.map(obj, function(obj, key) {
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
      "className": "hist_wrapper"
    }, React.createElement("ul", null, this.viewMessList(this.state.message)));
  }
});

HistoryModule = React.createClass({
  displayName: "HistoryModule",
  mixins: [React.addons.LinkedStateMixin],
  getInitialState: function() {
    return {};
  },
  render: function() {
    return React.createElement("div", {
      "className": "well well-sm"
    }, React.createElement("div", {
      "className": "mess_modul"
    }, React.createElement(HistoryViewForm, null)));
  }
});

React.render(React.createElement(HistoryModule, null), document.getElementById('content_wrapp'));
