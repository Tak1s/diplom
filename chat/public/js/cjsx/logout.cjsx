LogOut = React.createClass
	displayName:"LogOut"
	
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

	onLogout:(el)->
		el.preventDefault()
		
		@sendMethod('/logout', {}, (res)=>
			if res.error is 'no'
				window.location.href = '/'
			else 
				self.setState({error_mess: res.error_mess})
		)

	render:->
		<div className="logout_wrapper">
			<p><span className="name_lable">Логин: </span><span className="uname">{window.config.user?.name}</span></p>
			<a href="/" className="btn btn-flat btn-primary" onClick={@onLogout}>Выйти</a>
		</div>