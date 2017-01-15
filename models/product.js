const mongoose=require('mongoose'),
	bcrypt=require('mongoose-bcrypt'),
	autoincrement=require('mongoose-auto-increment'),
	ProductSchema=mongoose.Schema({
		price:{
			type:Number,
			default: '0'
			},
		view:{
			type:String,
			default: 'заказ'
			},
		star:{
			type:Number,
			default: '0'
			},
		category:{
			type:String,
			required:true
			},
		type:{
			type:String,
			required:true
			},
		date:{
			type:Date,
			default: Date.now()
			},
		name:{
			type:String,
			required:true
			},
		materials:{
			type:String,
			default: 'null'
			},
		description:{
			type:String,
			default: 'null'
			},
		username:{
			type:String,
			required:true
			},
		image:{
			type:String,
			default: 'image.jpg'
			},
		image2:{
			type:String,
			default: 'image.jpg'
			},
		city:{
			type:String,
			default: 'null'
			},
		status:{
			type:String,
			default: 'продается'
			},
		createdate:{
			type:Date,
			default: Date.now()
			}	
	});

exports.Product=mongoose.model('Product', ProductSchema);