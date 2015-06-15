Menu = React.createClass
	displayName:"Menu"
	
	mixins:[React.addons.LinkedStateMixin]

	getInitialState:->
		{}

	handler:(class_name, classAct, el)->
		if class_name is classAct
			el.preventDefault()

	catClass:(class_name, classAct)->
		if class_name is classAct
			'active'
		else 
			''

	render:->
		<div className="navbar navbar-inverse">
			<div className="menu_wrapp navbar-collapse collapse navbar-inverse-collapse">
				<ul className="nav navbar-nav">
					<li className={@catClass("chat", @props.classAct)} ><a href="/chat" onClick={@handler.bind(null, "chat", @props.classAct)}>Чат</a></li>
					<li className={@catClass("history", @props.classAct)} ><a href="/history" onClick={@handler.bind(null, "history", @props.classAct)}>История</a></li>
					<li className={@catClass("training", @props.classAct)} ><a href="/training" onClick={@handler.bind(null, "training", @props.classAct)}>Обучение</a></li>
				</ul>
			</div>
		</div>
