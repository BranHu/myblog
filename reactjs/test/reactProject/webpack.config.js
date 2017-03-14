var path = require('path');
var webpack = require('webpack');

module.exports = {

	entry: [
		'./index'
	],

	output: {
		path: path.join(__dirname,'dist'),
		filename: 'bundle.js',
		publicPath: '/static/'
	}

	// module: {
	// 	loaders: [{
	// 		test: /\.js$/,
	// 		loaders: ['babel'],
	// 		include: path.join(__dirname,'src')
	// 	}]
	// },

	// devServer: {
	// 	stats: 'errors-only'
	// }
}