
module.exports.index = function(application, req, res){
	res.render('index', {validacao: {}});
}

module.exports.autenticar = function(application, req, res){
	var dadosForm = req.body;
	req.assert('usuario', 'Usuário não pode ficar vazio!').notEmpty();
	req.assert('senha', 'Senha não pode ficar vazio!').notEmpty();
	
	var erros = req.validationErrors();
	if(erros) {
		res.render("index", {validacao: erros, dadosForm: dadosForm});
		return;
	}
	var connection = application.config.dbConnection;
	var usuariosDAO = new application.app.models.usuariosDAO(connection);
	usuariosDAO.autenticar(dadosForm, req, res);
	//res.send('ok')

}

