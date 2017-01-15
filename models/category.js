var crypto = require('crypto');
var async = require('async');
var util = require('util');

const mongoose=require('mongoose'),
      bcrypt=require('mongoose-bcrypt'),
      schema=mongoose.Schema;
var CategorySchema=new schema({
		number:{ 
			type:Number,
			required:true,
			unique: true
			},
		name:{
			type:String,
			required:true
			}
	});

exports.Category = mongoose.model('Category', CategorySchema);