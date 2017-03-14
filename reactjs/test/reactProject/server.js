var webpack = require('webpack');
var webpackdevserver = require('webpack-dev-server');
var config = require('./webpack.config.js');

var server = new webpackdevserver(webpack(config),{
	publicPath: config.output.publicPath
});

server.listen(3000,'localhost',function(err,result){
	if (err) {
		return console.log(err);
	}
	return console.log('listening at hosthost:3000')
})