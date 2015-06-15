var NavBlock;

NavBlock = React.createClass({
  render: function() {
    return React.createElement("div", {
      "className": "panel panel-default"
    }, React.createElement("div", {
      "className": "menu panel-heading"
    }, React.createElement(LogOut, null)), React.createElement("div", {
      "className": "menu panel-body"
    }, React.createElement(Menu, {
      "classAct": this.props.classAct
    })));
  }
});
