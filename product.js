var product= require('./models/tourscoll').product;
async.series([
	Open,
	Find,
	Close
	],function(err, results){
		mongoose.disconnect();
		Process.exit(err ? 255:0);
	});
function Open(callback){
	mongoose.connection.on('open',callback);
}
function Find (){
	tour.find(function (err, tours) {
        console.log(product)
    })
}
function Close(calback){
	mongoose.disconnect(callback);
}