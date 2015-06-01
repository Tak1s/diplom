MainComponent = React.createClass
	displayName: "MainComponent"

	getInitialState:->
		{

		}

	render:->
		<div className="wrapper">
			<div className="wrapp_container">
				<div className="content_wrapp">
					<MessageModule />
				</div>
				<div className="side_bar_wrapp">
					userId: {window.user}
				</div>
				<div className="cl"></div>
			</div>
		</div>

React.render <MainComponent />, document.getElementById('body')
