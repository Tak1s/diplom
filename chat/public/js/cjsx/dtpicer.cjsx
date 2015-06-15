DtPicer = React.createClass
	displayName:"DtPicer"
	
	mixins:[React.addons.LinkedStateMixin]

	getInitialState:->
		{
			error_mess:''
		}

	componentDidMount:->

		@setDatepickers("dt_pic")

	setDatepickers: (id_date_from) ->

		_this = @
		$.datepicker.setDefaults( $.datepicker.regional[ "fr" ] );
		$( "##{id_date_from}" ).datepicker
			dateFormat: "dd-mm-yy"
			onSelect: ( selectedDate ) =>
				@props.cb(selectedDate)
				
	render:->
		<input type='text' className="form-control" id="dt_pic" />					
