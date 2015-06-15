ActionsMess = Reflux.createActions([
    "getMess",
    "sendMess"
  ]);

window.StoreMess = Reflux.createStore
	displayName:"StoreMess"
	listenables: ActionsMess

	init: ->
		self = @
		@uName= window.config.user.name
		@message=[]

		@socket = io.connect('',{
			reconnect:false
		})

		@socket
			.on 'message', (username, new_mess)->
				console.log 'bbbb', new_mess
				self.message.push(new_mess)
				self.trigger('new_mess');
			.on 'join', (username)->
				console.log "user_join_LOG: ", username
			.on 'leave', (username)->
				console.log "user_leave_LOG: ", username
			.on 'logout', (username)->
				console.log "user_logout_LOG: ", username
				window.location.href = '/'
			.on 'connect', ()->
				console.log "connect_LOG: ", "connect"
			.on 'disconnect', ()->
				console.log "connect_LOG: ", "disconnect"
				setTimeout -> 
					self.reconnect 
				, 500


	reconnect:->
		self = @
		@socket.once 'error', ->
			setTimeout -> 
				self.reconnect
			, 500
		
		@socket.socket.connect()

	onGetMess:->
		@message

	onSendMess:(mess_body)->
		self = @
		console.log "mess_body", mess_body
		new_mess = {
			dt: new Date()
			bot:false
			name: @uName
			body: mess_body
		}
		@message.push(new_mess)
		
		@socket.emit('message', new_mess, (data)->
			self.trigger('new_mess')
			console.log "res: ", data
		)
		# @message.push(new_mess)

		# @trigger(@message);

