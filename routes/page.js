exports.get = function(req, res, next){ 
	var id = req.session.user; 
	var users = {};
	var User = require('../models/user').User;

	var products = {};
	var Product=require('../models/product').Product;
	
	//У не авторизированного пользователя нет страницы или не осуществлен вход
	if(id!=undefined){
		User.findById(id, function(err, users) { if (err){
				res.render('error',{status:'err', message:err});
			} 
			else { 
				Product.find({username: users.username}, function(err, products) { if (err) { 
						res.render('error',{status:'err', message:err}); 
					} 
					else {
						res.render('page',{status:'ok', id: true, user: users, products: products});
						} 
				});
			} 
		});
	}
	else{
		res.render('login',{status:'id undefined' });
	}
} 