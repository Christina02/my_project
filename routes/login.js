var bCrypt = require('bcrypt-nodejs');

//Проверка правильности пароля, Хеш
var isValidPassword = function(user, password){
        return bCrypt.compareSync(password, user.password);
}

exports.get = function(req,res){
	res.render('login');
}

exports.post = function(req, res, next){ 
	var q=req.body;
	var username = q.username;
	var password = q.password;
	var User = require('../models/user').User;	
	
	User.findOne({ 'username' :  username }, function(err, user) {
        // В случае возникновения любой ошибки, возврат error
        if (err){ 
			res.render('error',{status:'err', message:err});
		}
        else{
			// Пользователь не существует, ошибка входа и перенаправление обратно
			if (!user){
				res.render('login',{status:'not found', message:'Пользователь не найден.'});              
			}			
			else{
				// Пользователь существует, но пароль введен неверно, ошибка входа 
				if (!isValidPassword(user, password)){
					res.render('login',{status:'password uncorrect', message:'Неверный пароль.'});   
				}
				else{
					// Пользователь существует и пароль верен, текущей сессии присваивается id пользователя и переход на главную страницу
					req.session.user = user._id;
					res.render('index',{status:'ok'});   
								}
							}
						}
				}
	);
} 