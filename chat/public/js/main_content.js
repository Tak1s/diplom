var MainContent;

MainContent = React.createClass({
  render: function() {
    return React.createElement("div", {
      "className": "main_content"
    }, "\t\t\t\u041e\u041f\u0418\u0421\u0410\u041d\u0418\u0415 \u041f\u0420\u041e\u0415\u041a\u0422\u0410");
  }
});

React.render(React.createElement(MainContent, null), document.getElementById('content_wrapp'));
