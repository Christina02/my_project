var User = require('../models/user').User;
var N=50;

exports.get = function(req, res, next) 
{ 
	var users = {};
	
	//Поиск всех мастеров
	User.find({type:'master' }, function(err, users) { if (err) { 
			res.render('error',{status:'err', message:err}); 
		} 
		else { 
			res.render('master',{status:'ok', users: users});
		} 
	}).sort({createdate:-1}).limit(N); 
}
