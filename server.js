var express = require ('express');
var session = require ('express-session');
var bodyParser = require ('body-parser');
var cookieParser = require('cookie-parser');
var morgan = require ('morgan');
var mongoose=require('mongoose');
var config = require ('./config');
var path = require('path');
const pug = require('pug');
const app = express();
var passport = require('passport');
var flash = require('flash');
var MongoStore = require('connect-mongo')(session);


//------------------------обработка сессий-----------------------
	app.use(morgan('tiny'));
	app.use(bodyParser.urlencoded({extended: true}));
	app.use(cookieParser());	
	
	app.use(session({
		secret: config.secret,
		key: config.key,
		cookie: config.cookie,
		resave: false,
		saveUninitialized:true,
		store: new MongoStore({mongooseConnection: mongoose.connection})
	}));
	//подключение шаблонов (преобразвание их в html)
	app.set('view engine', 'pug')
	//папка где лежат шаблоны
	app.set('views', __dirname + '/views')
	app.use(express.json());
	app.use(express.urlencoded());
    app.use(express.methodOverride());
	
	
	
	app.use(express.session());
	app.use(flash());
	// Конфигурация Passport
	app.use(passport.initialize());
	app.use(passport.session());
	app.use(app.router);



//-------------------обработка и вывод шаблонов------------------
	app.listen(config.port, err => {
		if (err) throw err;
		console.log(`Server listening on port ${config.port}`);
	});

	require('./routes')(app);
	app.use(express['static'](path.join(__dirname, './views')));

	module.exports=app;