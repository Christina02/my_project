module.exports = function(app){
	//Главная страница
	app.get('/', require('./main').get);
	app.get('/index', require('./main').get);
	app.get('/main', require('./main').get);
	
	//Регистрация
	app.get('/signup', require('./signup').get);
	app.post('/signup',require('./signup').post); 
	
	//Авторизация
	app.get('/login', require('./login').get);
	app.post('/login', require('./login').post);
	
	//Оформление товара
	app.get('/order', require('./order').get);
	app.post('/order', require('./order').post);
	
	//Список мастеров
	app.get('/master', require('./master').get);
	
	//Список товаров--без фильрации---
	app.get('/catalog', require('./catalog').get);
	
	//Моя страница
	app.get('/page', require('./page').get);
	
	//Авторизация
	app.get('/basket', require('./basket').get);
	app.post('/basket', require('./basket').post);

	//Диалоги---отсутствует---
	app.get('/message', require('./predlog').get);
	
	//Отзывы о товарах, страница сообщений(отзывов)
	app.get('/message/:id', require('./message').get);
	app.post('/message/:id', require('./message').post);

	//Страница товара по id
	app.get('/product/:id', require('./product').get);
	app.post('/product/:id', require('./product').post);
	
	//Страница пользователя по id
	app.get('/:id', require('./id').get);
 
}