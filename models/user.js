var crypto = require('crypto');
var async = require('async');
var util = require('util');

const mongoose=require('mongoose'),
      bcrypt=require('mongoose-bcrypt'),
      schema=mongoose.Schema;
var UserSchema=new schema({
		username:{ 
			type:String,
			required:true,
			unique: true,
			index:true
			},
		password:{
			type:String,
			required:true,
			bcrypt:true
			},
		firstname:{
			type:String,
			required:true
			},
		secondname:{
			type:String,
			required:true
			},
		email:{
			type:String,
			required:true
			},
		image:{
			type:String,
			default:'user.jpg'
			},
		about:{
			type:String,
			default:'undefined'
			},
		number:{
			type:Number,
			default:'0'
			},
		star:{
			type:Number,
			default:'0'
			},
		male:{
			type:String,
			default:'man'
			},
		type:{
			type:String,
			default:'user'
			},
		city:{
			type:String,
			default:'null'
			},
		date:{
			type:Date
			},
		bag:{
			type:Array,
			default: []
			},
		createdate:{
			type:Date,
			default: Date.now()
			}
	});

exports.User = mongoose.model('User', UserSchema);