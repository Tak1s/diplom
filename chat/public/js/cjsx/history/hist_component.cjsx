HistoryViewForm = React.createClass
	displayName:"HistoryViewForm"

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
		window.StoreHist.listen (flag)->
			if flag is "new_hist"
				self.setState({message:window.StoreHist.onGetMess()})
			
	viewMessList:(obj)->
		unless _.isEmpty obj
			_.map obj, (obj, key)->
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
		<div className="hist_wrapper">
			<ul>
				{@viewMessList(@state.message)}
			</ul>
		</div>

HistoryModule = React.createClass
	displayName:"HistoryModule"

	mixins:[React.addons.LinkedStateMixin]

	getInitialState:->
		{}

	render:->
		<div className="well well-sm">
			<div className="mess_modul">
				<HistoryViewForm />
			</div>
		</div>

React.render <HistoryModule />, document.getElementById('content_wrapp')
