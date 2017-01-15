var Product=require('../models/product').Product;
var User = require('../models/user').User;

var downloads= function(id, res, message){
	var products = {};	
	var users = {};

	Product.findById(id, function(err, products) { 
		if (err) { 
			res.render('error',{status:'err', message:err}); 
		} 
		else { 
			User.findOne({_id:products.username}, function(err, users) {
				if (err) { 
					res.render('error',{status:'err', message:err}); 
				} 
				else { 
					res.render('product',{status:message, user: users, product: products});
				} 
			});
		} 
	});
}

exports.get = function(req, res, next){ 
	downloads(req.params.id, res, 'downloads');
}

exports.post = function(req, res, next){ 
	
	var id = req.session.user; 
	var products = {};
	var users = {};
	
	//Если пользователь не зарегистрирован, то он не может добавить товар в корзину
	if(id!=undefined){
		User.findById(id, function(err, users) {
			if (err) { 
				res.render('error',{status:'err', message:err}); 
			} 
			else { 
				//Добавление товара в корзину
				User.update({_id:users._id}, {$push: { bag:req.params.id }},function(err, users) {
					if(err){res.render('error',{status:'err', message:err}); }
					else{
						//перезагрузка страницы
						downloads(req.params.id, res, 'ok');
					}
				});		
			}	
		});
	}
	else{
		res.render('login',{status:'id undefined' });
	}
}