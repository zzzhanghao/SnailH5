module.exports = {
	port: 4001,
	mongodb: {
		url: 'mongodb://localhost:27017/snail',
		options: {}
	},
	middleware:['handlerError'],
	jwt: {secret: 'huangwei9527'},
	crypto: {secret: '#*#*huangwei9527*#*#'},
	baseUrl: ''
}
