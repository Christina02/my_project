var User = require('../models/user').User;
var Product=require('../models/product').Product;

exports.get = function(req, res, next) 
{ 
	var id = req.params.id;
	var users = {};
	var products = {};
	
	// Сформируем mongo-запрос 
	//Поиск пользователя по идентификатору
	User.findById(id, function(err, users){ 
		if (err) { 
			res.render('error',{status:'Not found page', message:'Страница не найдена.'});
		} 
		else {
			if(users)
			{Product.find({username: users.username}, function(err, products) { 
				if (err) { 
					res.render('error bd',{status:'err', message:err}); 
				} 
				else {
					res.render('page',{status:'ok', id: false,user: users, products: products});
				} 
			});
			}
			else {
				res.render('error',{status:'Not found page', message:'Страница не найдена.'});
			}
		} 
	});
}