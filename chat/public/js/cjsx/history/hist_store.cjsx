ActionsHist = Reflux.createActions([
    "getMess",
    "sendFilter"
    "setDt"
  ]);

window.StoreHist = Reflux.createStore
	
	listenables: ActionsHist

	init: ->
		self = @
		@uName= window.config.user.name
		@filter_dt = ''
		@message=[]

	onSetDt:(new_dt)->
		console.log "onSet", new_dt 
		@filter_dt = new_dt
		@onSendFilter()

	sendMethod:(url, data, callback)->
		self = @
		$.ajax 
			url:url
			type:"POST"
			data:data
			success:(res, stat)->
				callback(res);
			error:(res, stat)->
				# self.setState({error_mess: stat})

	onSendFilter:()->
		self = @
		new_filter = {
			dt:@filter_dt
		}
		@sendMethod('/history', new_filter, @cb)
		# @trigger(@message);

	cb:(res)->
		@message = res.history
		@trigger("new_hist");

	onGetMess:->
		@message
