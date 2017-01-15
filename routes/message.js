var User = require('../models/user').User;
var Massage = require('../models/massage').Massage;

exports.get = function(req, res, next){ 
	var product=req.params.id;
	var id=req.session.user;

	var users={};
	var massage={};
	
	//Сообщения для выбранного товара 
	Massage.find({productid:product},function(err,massage){if(err){
		res.render('error',{status:'err', message:err});
	}
	else{
		res.render('predlog',{status:'ok', messages:massage });
	}}).sort({date:-1});
}

exports.post = function(req, res, next){ 
	var product=req.params.id;
	var q=req.body;
	var id=req.session.user;
	
	var users={};
	var massage={};
	
	//Если пользователь не авторизирован, то переход на страницу авторизации
	if(id!=undefined){
		//поиск пользователя текущей сессии
		User.findById(id, function(err, users) { 
			if(err){
				res.render('error',{status:'err', message:err});
			}
			else{
				 //Создание нового сообщения
				 var newMess = new Massage();
				// установка параметров
                newMess.username = users.username;
                newMess.sender = id;
                newMess.productid = product;
                newMess.text = q.message;
               
                // сохранение сообщения
                newMess.save(function(err){
                    if (err){
						//Ошибка сохранения сообщения                    
                        res.render('error',{status:'err', message:err});
                    }
					else{
						//Поиск все сообщений для данного товара
						//Перезагрузка страницы
						Massage.find({productid:product}, function(err, massage){
							if(err) {
								res.render('error',{status:'err', message:err});
							}
							else{
								//Сообщение успешно сохранено в БД  
								res.render('predlog',{status:'ok', messages:massage}); 
							}
						}).sort({date:-1});
					};
				});
			}
		});
	}
	else{
		res.render('login',{status:'id undefined'});
	}
}