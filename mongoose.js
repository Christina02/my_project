var express = require ('express'),
	mongoose = require('mongoose'); //создали соединение
var bluebird = require ('bluebird');
var config= require ('./config');

mongoose.set('debug', true);

mongoose.Promise=bluebird;
//открыли соединение
mongoose.connect(config.database, err => {
		if(err) throw err;
		console.log('Mongo connected');
		});

module.exports=mongoose;