MessageViewForm = React.createClass
	displayName:"MessageViewForm"

	mixins:[React.addons.LinkedStateMixin]

	getInitialState:->
		{
			message:[]
		}

	componentWillUpdate: ->
		node = @getDOMNode();
		@shouldScrollBottom = node.scrollTop + node.offsetHeight == node.scrollHeight;
	 
	componentDidUpdate: ->
		if @shouldScrollBottom
			node = this.getDOMNode()
			node.scrollTop = node.scrollHeight

	componentWillMount:->
		self = @
		window.StoreMess.listen (mess)->
			console.log "mess", mess
			self.setState({message:mess})
			

	viewMessList:(obj)->
		unless _.isEmpty obj
			_.map obj, (obj, key)->
				console.log {key}
				<li key={key}>
					<div className="mess_item #{obj.user}" >
						<div className="mess_head">
							<span className="uName">{obj.name}</span>
							<span className="timeSend">{moment(obj.dt_send).format('HH:mm:ss')}</span>
						</div>
						<div className="mess_body">{obj.body}</div>
					</div>
				</li>

	render:->
		<div className="mess_wrapper">
			<ul>
				{@viewMessList(@state.message)}
			</ul>
		</div>

MessageSendForm = React.createClass
	displayName:"MessageSendForm"

	mixins:[React.addons.LinkedStateMixin]

	getInitialState:->
		{
			mess_field:''
		}

	subMess:(e)->
		e.preventDefault()

		window.ActionsMess.sendMess(@state.mess_field)
		@setState {mess_field:''}

		React.findDOMNode(@refs.messBody).focus()

	render:->
		<div className="form_wrapper">
			<form action="" id="form_mess" onSubmit={@subMess}>
				<div className="form-group">
					<div className="col-sm-10">
						<textarea id="mess_body" className="form-control" ref="messBody" rows="3" valueLink={this.linkState("mess_field")} autoFocus={true} placeholder="Message" />
					</div>
				</div>
				<button type="submit" className="btn btn-default">Submit</button>
			</form>
		</div>

MessageModule = React.createClass
	displayName:"MessageModule"

	mixins:[React.addons.LinkedStateMixin]

	getInitialState:->
		{}

	render:->
		<div className="mess_modul">
			<MessageViewForm />
			<MessageSendForm />
		</div>
