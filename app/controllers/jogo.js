
module.exports.jogo = function(application, req, res){
		if(req.session.autorizado !== true){
			res.send('Usuário precisa realizar o login!');
			return;
		}
		var msg = '';
		if(req.query.msg !== ''){
			msg=  req.query.msg;
		}
		var usuario = req.session.usuario;
		var casa = req.session.casa;
		var connection = application.config.dbConnection;
		var jogoDAO = new application.app.models.jogoDAO(connection);
		
		jogoDAO.iniciaJogo(res, usuario, casa, msg);
}
module.exports.sair = function(req, res){
	req.session.destroy( function(err){
		res.render('index', {validacao:{}, img_casa:{}});
	});
}

module.exports.suditos = function(req, res){
	if(req.session.autorizado !== true){
			res.send('Usuário precisa realizar o login!');
			return;
	}
	res.render('aldeoes', {validacao:{}});
}

module.exports.pergaminhos = function(application,req, res){
	if(req.session.autorizado !== true){
			res.send('Usuário precisa realizar o login!');
			return;
	}

	var connection = application.config.dbConnection;
	var jogoDAO = new application.app.models.jogoDAO(connection);
	var usuario = req.session.usuario;
		
	jogoDAO.getAcoes(usuario, res);
	
}

module.exports.ordenar_acao_sudito = function(application, req, res){
	if(req.session.autorizado !== true){
			res.send('Usuário precisa realizar o login!');
			return;
	}
	var dadosForm = req.body;
	req.assert('acao', 'Ação não pode ficar vazio!').notEmpty();
	req.assert('quantidade', 'Quantidade não pode ficar vazio!').notEmpty();

	var erros = req.validationErrors();
	if(erros){
		res.redirect('jogo?msg=E');
		return;
	}

	var connection = application.config.dbConnection;
	var jogoDAO = new application.app.models.jogoDAO(connection);
	dadosForm.usuario = req.session.usuario;
	jogoDAO.acao(dadosForm);

	res.redirect('jogo?msg=S');
}
		
module.exports.revogar_acao = function(application, req, res){
	var url_query = req.query;
	var connection = application.config.dbConnection;
	var jogoDAO = new application.app.models.jogoDAO(connection);
	var _id = url_query.id_acao;
	jogoDAO.revogarAcao(res, _id);
}
