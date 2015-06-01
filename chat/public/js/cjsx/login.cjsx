Login = React.createClass
	
	mixins:[React.addons.LinkedStateMixin]

	getInitialState:->
		{

			login_field:''
			pass_field:''

			login_chk:null
			pass_chk:null

			login_mess:''
			pass_mess:''

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

	checkLogin:()->
		if parseFloat(@state.login_field.trim().length) >= 4
			chk = true
			mess = ''
		else
			chk = false
			mess = 'Minimum length – 4 characters'
		@setState({login_chk: chk, login_mess:mess})
		chk


	checkPass:()->
		pattern = /^[0-9A-Za-z]{6,14}$/
		if @state.pass_field.trim().search(pattern) is 0
			chk = true
			mess = ''
		else
			chk = false
			mess = 'Enter a password. Allowed characters are A-Z, a-z, 0-9, _. Minimum length – 6 characters; Maximum length – 14 characters.'
		@setState({pass_chk: chk, pass_mess:mess})
		chk

	onLogin:(el)->
		el.preventDefault()
		@setState({error_mess:''})

		login_chk = @checkLogin()
		pass_chk = @checkPass()

		if login_chk and pass_chk
			@sendMethod('/login', {username:@state.login_field, password:@state.pass_field}, (res)=>
				if res.error is 'no'
					window.location.href = '/chat'
				else 
					self.setState({error_mess: res.error_mess})
			)

	onLogout:(el)->
		el.preventDefault()
		
		@sendMethod('/logout', {}, (res)=>
			if res.error is 'no'
				window.location.href = '/'
			else 
				self.setState({error_mess: res.error_mess})
		)

	render:->
		if window.oauth is "true"
			<div className="logout_wrapper">
				<form action='#' id="logout_form" onSubmit={@onLogout}>
					<input type="submit" className="sub" value="Logout" />
				</form>
			</div>
		else
			<div className="login_wrapper">
				<div className="error_wrapper"> {@state.error_mess} </div>
				<form action='#' id="login_form" onSubmit={@onLogin}>
					<input type="text" className="input_login" placeholder="login" valueLink={@linkState("login_field")} onBlur={@checkLogin} />
					<div className="error_wrap_login"> {@state.login_mess} </div>
					<input type="password" className="pass_login" placeholder="password" valueLink={@linkState("pass_field")} onBlur={@checkPass} />
					<div className="error_wrap_pass"> {@state.pass_mess} </div>
					<input type="submit" className="sub" value="Login" />
				</form>
			</div>

React.render <Login />, document.getElementById('body')
