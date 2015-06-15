ChatSideBar = React.createClass
	
	mixins:[React.addons.LinkedStateMixin]

	getInitialState:->
		{

			error_mess:''

		}

	sendMethod:(url, data, callback)->
		self = @
		$.ajax 
			url:url
			type:"POST"
			data:data
			success:(res, stat)->
				callback(res);
			error:(res, stat)->
				self.setState({error_mess: stat})

	render:->
		if window.config.oauth is true
			<div className="sidebar_wrapp">
				<NavBlock classAct="chat" />
			</div>

React.render <ChatSideBar />, document.getElementById('side_bar_wrapp')