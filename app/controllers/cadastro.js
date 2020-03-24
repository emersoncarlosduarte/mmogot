
module.exports.cadastro = function(application, req, res){
	var dadosForm = req.body;
	var msg = '';
	res.render('cadastro', {validacao: {}, dadosForm: {}, msg: {}});
}


module.exports.cadastrar = function(application, req, res){
	
	var dadosForm = req.body;
	req.assert('nome', "Nome não pode ser vazio").notEmpty();
	req.assert('usuario', "Usuário não pode ser vazio").notEmpty();
	req.assert('senha', "Senha não pode ser vazio").notEmpty();
	req.assert('casa', "Casa não pode ser vazio").notEmpty();

	var msg = 'cadsucesso';

	var erros = req.validationErrors();
		if(erros){
			res.render('cadastro', {validacao: erros, dadosForm: dadosForm, msg:{}});
			return;
		}

	var connection = application.config.dbConnection;
	var usuariosDAO = new application.app.models.usuariosDAO(connection);
	var jogoDAO = new application.app.models.jogoDAO(connection);
	usuariosDAO.inserirUsuario(dadosForm);
	jogoDAO.gerarParametros(dadosForm.usuario);

	res.render('cadastro', {validacao:{}, dadosForm:{}, msg: msg})
	return;
}

