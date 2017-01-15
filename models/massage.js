const mongoose=require('mongoose'),
	MassageSchema=mongoose.Schema({
		productid:{
			type:String,
			required:true
			},
		sender:{
			type:String,
			required:true
			},
		username:{
			type:String,
			required:true
			},
		text:{
			type:String,
			required:true
			},
		date:{
			type:Date,
			default: Date.now()
			}
	});

exports.Massage=mongoose.model('Massage', MassageSchema);