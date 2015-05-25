var MainComponent;

MainComponent = React.createClass({
  displayName: "MainComponent",
  getInitialState: function() {
    return {};
  },
  render: function() {
    return React.createElement("div", {
      "className": "wrapper"
    }, React.createElement("div", {
      "className": "wrapp_container"
    }, React.createElement("div", {
      "className": "content_wrapp"
    }, React.createElement(MessageModule, null)), React.createElement("div", {
      "className": "side_bar_wrapp"
    }, "\t\t\t\tggg"), React.createElement("div", {
      "className": "cl"
    })));
  }
});

React.render(React.createElement(MainComponent, null), document.getElementById('body'));
