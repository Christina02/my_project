var bCrypt = require('bcrypt-nodejs');

// Генерация хэша с помощью bCrypt
var createHash = function(password){
    return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
}

exports.get = function(req, res){
	res.render('signup');
}

exports.post=function(req, res, next){ 
	var q=req.body;
	var Usernew={};
	var User = require('../models/user').User;	
	// поиск пользователя в Mongo с помощью предоставленного имени пользователя
    User.findOne({ 'username' :  q.username }, function(err, user){
        // В случае любых ошибок - возврат
        if (err){
            res.render('error',{status:'err', message:err});
        }
        // уже существует
        if (user) {
            res.render('signup',{status:'ok', message:'Пользователь с таким логином уже существует.'});              
        } 
		else {
			if(q.pwd===q.pwd2){  
				// если пользователя с таки логином
				// в базе не существует, создать пользователя
                 var newUser = new User();
				// установка локальных прав доступа пользователя
                newUser.username = q.username;
                newUser.password = createHash(q.pwd);
                newUser.email = q.email;
                newUser.firstname = q.firstname;
                newUser.secondname = q.lastname;
				newUser.number = q.number;
				newUser.male = q.sex;
				newUser.type = q.type;
				newUser.city = q.city;
				newUser.date=new Date();
                // сохранения пользователя
                newUser.save(function(err) {
                    if (err){
						//Ошибка сохранения пользователя                    
                        res.render('error',{status:'err', message:err});
                    }
					else{
						User.findOne({ 'username' :  newUser.username }, function(err, Usernew){
							if(err) {}
							else{
								//Пользователь успешно сохранен в БД   
								req.session.user = Usernew._id;
								res.render('index',{status:'ok'}); 
							}
						});
					}
				});
			}
			else {
				//Повторный пароль не совпадает с первым
				res.render('signup',{status:'password err', message:'Пароли не совпадают.'});
			}
        }
    });
}; 