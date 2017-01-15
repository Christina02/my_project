var Category = require('../models/category').Category;
var User = require('../models/user').User;
var Product=require('../models/product').Product;

exports.get = function(req, res){
	var category = {};
	var users = {};
	
	//Загрузка категорий на страницу оформления заказа
	Category.find({}, function(err, category) { if (err) { 
			res.render('error',{status:'err', message:err});  
		} 
		else { 
			res.render('order',{status:'downloads',  categories:category});
		}
	});
}
  
exports.post = function(req, res, next){
	
	
	var q=req.body;
	var users = {};
	var id = req.session.user; 
	
	//Если пользователь не зарегистрирован
	if(id==undefined){
		res.render('login',{status:'id undefined' });
	}
	else{
		//Создание объекта нового товара
		var newProduct= new Product();
		newProduct.price=q.price;
		newProduct.view=q.type;
		newProduct.category=q.kat;
		newProduct.name=q.name;
		newProduct.description=q.discription;
		newProduct.materials=q.materials;
		
		//Поиск категории по ее номеру
		var category={};
		Category.findOne({number:q.menu}, function(err,category ) { if (err){
				res.render('error',{status:'err', message:err}); 
			} 
			else { 
				newProduct.type=category.name;
				
				//Для текущей сессии
				User.findById(id, function(err, users) { 
				if (err){
					res.render('error',{status:'err', message:err});
				} 
				else{
					newProduct.city=users.city;
					newProduct.username=id;
					var category = {};
					
					//Сохранение товара
					newProduct.save(function(err) {
                    if (err){
						//Ошибка сохранения пользователя                    
                        res.render('error',{status:'err', message:err});
                    }
					else{
						products={};
						
						//Проверка сохраненного товара
						Product.findById(newProduct._id, function(err, products){
							if(err){
								res.render('error',{status:'err', message:err});
							}
							else{
								//Пользователь успешно сохранен в БД
								//Перезагрузка страницы
								Category.find({}, function(err, category) { if (err) { 
										res.render('error',{status:'err', message:err}); 
									} 
									else { 
									res.render('order',{status:'ok',  categories:category});
									} 
								});
							}
						});
					}
					});	
				}
				});
			}
		});	
	}
}