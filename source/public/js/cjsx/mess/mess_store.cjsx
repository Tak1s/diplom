ActionsMess = Reflux.createActions([
    "getMess",
    "sendMess"
  ]);

window.StoreMess = Reflux.createStore
	displayName:"StoreMess"
	listenables: ActionsMess

	init: ->
		@uName='Tak1s'
		@message=[]

	onGetMess:->
		@message

	onSendMess:(mess_body)->
		console.log "mess_body", mess_body
		new_mess = {
			dt_send: new Date()
			user:"user"
			name: @uName
			body: mess_body
		}
		@message.push(new_mess)

		@trigger(@message);

