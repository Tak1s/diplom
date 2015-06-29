TrainingSideBar = React.createClass
	
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

	render:->
		if window.config.oauth is true
			<div className="sidebar_wrapp">
				<NavBlock classAct="training" />
				<div className="content_sidebat">
					<div className="panel panel-primary">
						<div className="panel-heading">
							<h3 className="panel-title">Режим обучения</h3>
						</div>
						<div className="panel-body">
							<form className="form-horizontal">
								<div className="form-group">
									<label for="select" className="col-lg-2 control-label">Тег:</label>
									<div className="col-lg-10">
										<select className="tag_name form-control" id="select">
											<option>Вопрос</option>
											<option>Утверждение</option>
										</select>
									</div>
								</div>
							</form>
							<form className="new_tag form-horizontal">
								<fieldset>
									<div className="form-group">
										<input className="form-control" placeholder="Новый тег" type="text" />
									</div>
									<div className="form-group">
										<div className="col-lg-10 col-lg-offset-1">
											<button type="submit" className="btn btn-primary">Сохранить тег</button>
										</div>
									</div>
								</fieldset>
							</form>					
						</div>
					</div>
				</div>
			</div>
		
React.render <TrainingSideBar />, document.getElementById('side_bar_wrapp')