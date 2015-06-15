TrainingModule = React.createClass
	displayName:"TrainingModule"

	mixins:[React.addons.LinkedStateMixin]

	getInitialState:->
		{}

	render:->
		<div className="well well-sm">
			<div className="train_wrapper">
				<form className="form-horizontal">
					<fieldset>
						<div className="form-group">
							<label for="textArea" className="col-lg-2 control-label">Ключь</label>
							<div className="col-lg-9">
								<textarea className="form-control" rows="2" id="textArea"></textarea>
								<span className="help-block">Введите фразу-ключь.</span>
							</div>
						</div>
						<div className="form-group">
							<label for="textArea" className="col-lg-2 control-label">Ответ</label>
							<div className="col-lg-9">
								<textarea className="form-control" rows="2" id="textArea"></textarea>
								<span className="help-block">Введите фразу-ответ.</span>
							</div>
						</div>
						<div className="form-group">
							<div className="col-lg-10 col-lg-offset-2">
								<button type="submit" className="btn btn-primary">Сохранить</button>
							</div>
						</div>
					</fieldset>
				</form>
			</div>
		</div>

React.render <TrainingModule />, document.getElementById('content_wrapp')
