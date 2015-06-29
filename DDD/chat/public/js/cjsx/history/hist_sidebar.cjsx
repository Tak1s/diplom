HistSideBar = React.createClass
	displayName:"HistSideBar"
	
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

	handleEvent: (new_dt)->
		console.log(new_dt)
		ActionsHist.setDt(new_dt)
	

	render:->
		if window.config.oauth is true
			<div className="sidebar_wrapp">
				<NavBlock classAct="history" />				
				<div className="content_sidebat">
					<div className="panel panel-primary">
						<div className="panel-heading">
							<h3 className="panel-title">История</h3>
						</div>
						<div className="panel-body">
							<DtPicer cb={@handleEvent}/>
						</div>
					</div>
				</div>
			</div>
		
React.render <HistSideBar />, document.getElementById('side_bar_wrapp')
