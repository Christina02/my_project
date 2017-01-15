var User = require('../models/user').User;


exports.get =function(req, res, next) 
{ 
	var id=req.session.user;
	var users={};
	
	//У не авторизированного пользователя нет корзины
	if(id!=undefined)
	{
		User.findById(id, function(err, users) { 
			if(err){
				res.render('error',{status:'err', message:err});
			}
			else{
				res.render('basket',{status:'ok' , products: users.bag});
			}
		});
	}
	else{
		res.render('login',{status:'id undefined'});
	}
}
 
 
exports.post = function(req, res, next) 
{   
	var id=req.session.user;
	console.log(req.params.del);
	var users={};
	
	//У не авторизированного пользователя нет корзины
	if(id!=undefined)
	{
		User.findById(id, function(err, users) { 
			if(err){
				res.render('error',{status:'err', message:err});
			}
			else{
				res.render('basket',{status:'ok' , products: users.bag});
			}
		});
	}
}