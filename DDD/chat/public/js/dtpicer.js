var DtPicer;

DtPicer = React.createClass({
  displayName: "DtPicer",
  mixins: [React.addons.LinkedStateMixin],
  getInitialState: function() {
    return {
      error_mess: ''
    };
  },
  componentDidMount: function() {
    return this.setDatepickers("dt_pic");
  },
  setDatepickers: function(id_date_from) {
    var _this;
    _this = this;
    $.datepicker.setDefaults($.datepicker.regional["fr"]);
    return $("#" + id_date_from).datepicker({
      dateFormat: "dd-mm-yy",
      onSelect: (function(_this) {
        return function(selectedDate) {
          return _this.props.cb(selectedDate);
        };
      })(this)
    });
  },
  render: function() {
    return React.createElement("input", {
      "type": 'text',
      "className": "form-control",
      "id": "dt_pic"
    });
  }
});
