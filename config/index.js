const config = {
		host: '127.0.0.1',
		port: 3000,
		secret: "KillerIsJim",
		key: "sid",
		cookie: {
			"path": "/",
			"httpOnly": true,
			"maxAge": null
			},
		database: "mongodb://127.0.0.1:27017/omega",
   		"options": {
      				"server": {
        			"socketOptions": {
          				"keepAlive": 1
        				}
      				}
    		}
};

module.exports= config;