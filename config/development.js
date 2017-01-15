'use strict';

module.exports = function(configBuilder) {
	configBuilder.register({
		name: 'development',
		config: {
			host: 'localhost',
			port: 3000,			
			secret: 'verysecretkey',
			database: 'mongodb://127.0.0.1:27017/omega'
		}
	});
};
