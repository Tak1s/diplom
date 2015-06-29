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
		window.StoreMess.listen (flag)->
			if flag is "new_mess"
				self.setState({message:window.StoreMess.onGetMess()})
			
	componentDidMount:->
		# $("#scroll_content").mCustomScrollbar({
		# 	scrollInertia:10
		# 	setTop: "-100px"
		# })

	viewMessList:(_obj)->
		# console.log "obj", _obj
		unless _.isEmpty _obj
			_.map _obj, (obj, key)->
				<li key={key}>
					<div className="mess_item #{obj.bot}" >
						<div className="mess_head">
							<span className="uName">{obj.name}</span>
							<span className="timeSend">{moment(obj.dt).format('HH:mm:ss')}</span>
						</div>
						<div className="mess_body">{obj.body}</div>
					</div>
				</li>

	render:->
		<div className="mess_wrapper" data-mcs-theme="dark">
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
		if @state.mess_field.trim().length > 0
			window.ActionsMess.sendMess(@state.mess_field)
		@setState {mess_field:''}

		React.findDOMNode(@refs.messBody).focus()

	render:->
		<div className="form_wrapper">
			<form action="" id="form_mess" onSubmit={@subMess}>
				<div className="form-group">
					<div className="col-sm-9">
						<textarea id="mess_body" className="form-control" ref="messBody" rows="2" valueLink={this.linkState("mess_field")} autoFocus={true} placeholder="Сообщение" />
					</div>
				</div>
				<button type="submit" className="btn btn-primary">Отправить</button>
			</form>
		</div>

MessageModule = React.createClass
	displayName:"MessageModule"

	mixins:[React.addons.LinkedStateMixin]

	getInitialState:->
		{}

	render:->
		<div className="well well-sm">
			<div className="mess_modul">
				<MessageViewForm />
				<MessageSendForm />
			</div>
		</div>

React.render <MessageModule />, document.getElementById('content_wrapp')
