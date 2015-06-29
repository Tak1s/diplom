var TrainingModule;

TrainingModule = React.createClass({
  displayName: "TrainingModule",
  mixins: [React.addons.LinkedStateMixin],
  getInitialState: function() {
    return {};
  },
  render: function() {
    return React.createElement("div", {
      "className": "well well-sm"
    }, React.createElement("div", {
      "className": "train_wrapper"
    }, React.createElement("form", {
      "className": "form-horizontal"
    }, React.createElement("fieldset", null, React.createElement("div", {
      "className": "form-group"
    }, React.createElement("label", {
      "for": "textArea",
      "className": "col-lg-2 control-label"
    }, "\u041a\u043b\u044e\u0447\u044c"), React.createElement("div", {
      "className": "col-lg-9"
    }, React.createElement("textarea", {
      "className": "form-control",
      "rows": "2",
      "id": "textArea"
    }), React.createElement("span", {
      "className": "help-block"
    }, "\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u0444\u0440\u0430\u0437\u0443-\u043a\u043b\u044e\u0447\u044c."))), React.createElement("div", {
      "className": "form-group"
    }, React.createElement("label", {
      "for": "textArea",
      "className": "col-lg-2 control-label"
    }, "\u041e\u0442\u0432\u0435\u0442"), React.createElement("div", {
      "className": "col-lg-9"
    }, React.createElement("textarea", {
      "className": "form-control",
      "rows": "2",
      "id": "textArea"
    }), React.createElement("span", {
      "className": "help-block"
    }, "\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u0444\u0440\u0430\u0437\u0443-\u043e\u0442\u0432\u0435\u0442."))), React.createElement("div", {
      "className": "form-group"
    }, React.createElement("div", {
      "className": "col-lg-10 col-lg-offset-2"
    }, React.createElement("button", {
      "type": "submit",
      "className": "btn btn-primary"
    }, "\u0421\u043e\u0445\u0440\u0430\u043d\u0438\u0442\u044c")))))));
  }
});

React.render(React.createElement(TrainingModule, null), document.getElementById('content_wrapp'));
