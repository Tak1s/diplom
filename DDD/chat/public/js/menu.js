var Menu;

Menu = React.createClass({
  displayName: "Menu",
  mixins: [React.addons.LinkedStateMixin],
  getInitialState: function() {
    return {};
  },
  handler: function(class_name, classAct, el) {
    if (class_name === classAct) {
      return el.preventDefault();
    }
  },
  catClass: function(class_name, classAct) {
    if (class_name === classAct) {
      return 'active';
    } else {
      return '';
    }
  },
  render: function() {
    return React.createElement("div", {
      "className": "navbar navbar-inverse"
    }, React.createElement("div", {
      "className": "menu_wrapp navbar-collapse collapse navbar-inverse-collapse"
    }, React.createElement("ul", {
      "className": "nav navbar-nav"
    }, React.createElement("li", {
      "className": this.catClass("chat", this.props.classAct)
    }, React.createElement("a", {
      "href": "/chat",
      "onClick": this.handler.bind(null, "chat", this.props.classAct)
    }, "\u0427\u0430\u0442")), React.createElement("li", {
      "className": this.catClass("history", this.props.classAct)
    }, React.createElement("a", {
      "href": "/history",
      "onClick": this.handler.bind(null, "history", this.props.classAct)
    }, "\u0418\u0441\u0442\u043e\u0440\u0438\u044f")), React.createElement("li", {
      "className": this.catClass("training", this.props.classAct)
    }, React.createElement("a", {
      "href": "/training",
      "onClick": this.handler.bind(null, "training", this.props.classAct)
    }, "\u041e\u0431\u0443\u0447\u0435\u043d\u0438\u0435")))));
  }
});
