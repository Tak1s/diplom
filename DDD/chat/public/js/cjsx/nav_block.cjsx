NavBlock = React.createClass
	
	render:->
		<div className="panel panel-default">
			<div className="menu panel-heading">
				<LogOut />
			</div>
			<div className="menu panel-body">
				<Menu classAct={@props.classAct}/>
			</div>
		</div>
