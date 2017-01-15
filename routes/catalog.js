var Product=require('../models/product').Product;

exports.get = function(req, res, next) 
{ 
	var products = {};
	
	//Список товаров без фильтрации
	Product.find({}, function(err, products) { if (err) { 
			res.render('error',{status:'err', message:err}); 
		} 
		else { 
			res.render('catalog',{status:'ok', products: products});
		} 
	}).sort({date:-1});
}