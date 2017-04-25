var path = require('path');
var webpack = require('webpack');
var HtmlwebpackPlugin = require('html-webpack-plugin');
//常用路径
var ROOT_PATH = path.resolve(__dirname);
var APP_PATH = path.resolve(ROOT_PATH,'app');
var BUILD_PATH = path.resolve(ROOT_PATH,'build');

module.exports = {
	entry: {
		app: path.resolve(APP_PATH,'index.jsx')
	},
	output: {
		path: BUILD_PATH,
		filename: 'bundle.js'
	},

	//开启dev source map
	devtool: 'eval-source-map',
	//开启webpack dev server
	devServer: {
		historyApiFallback: true,
		hot: true,
		inline: true,
		progress: true
	},

	module: {
		//这是webpack1.0中的方式，会报错，要使用webpack2.0
		//配置preLoaders,将eslint添加进入.
		// preLoaders: [
		// 	{
		// 		test: /\.jsx?$/,
		// 		loaders: ['eslint'],
		// 		include: APP_PATH
		// 	}
		// ],
		//配置loaders,将babel添加进去
		// loaders: [
		// 	{
		// 		test: /\.jsx?$/,
		// 		loaders: ['babel'],
		// 		include: APP_PATH
		// 	}
		// ]
		rules: [
		    {
		        test: /\.js$/,
		        enforce: "pre",
		        loader: "eslint-loader",
		        include: APP_PATH
		    },
		    {
		    	test: /\.js$/,
		        loader: "babel-loader",
		        include: APP_PATH
		    }
    	]

	},

	//配置plugin
	plugins: [
		new HtmlwebpackPlugin({
			title: 'My first react app'
		})
	],

	//在js中import加载JXS扩展名的脚本
	resolve: {
		extensions: ['.js','.jsx']
	}
}