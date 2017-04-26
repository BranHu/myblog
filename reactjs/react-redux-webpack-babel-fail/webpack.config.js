var { resolve } = require('path');
var webpack = require('webpack');
var HtmlwebpackPlugin = require('html-webpack-plugin');
//常用路径
var ROOT_PATH = resolve(__dirname);
var APP_PATH = resolve(ROOT_PATH, 'app');
var BUILD_PATH = resolve(ROOT_PATH, 'dist');

module.exports = {
	//改动1.增加webpack的context属性
	//The base directory, an absolute path, for resolving entry points and loaders from configuration.
	context: resolve(__dirname, 'src'),
	//改动2.entry进行了较大的改动
	/*entry: {
		app: resolve(APP_PATH, 'index.jsx')
	},*/
	entry: [
		'react-hot-loader/patch',
	    // activate HMR for React

	    'webpack-dev-server/client?http://localhost:8080',
	    // bundle the client for webpack-dev-server
	    // and connect to the provided endpoint

	    'webpack/hot/only-dev-server',
	    // bundle the client for hot reloading
	    // only- means to only hot reload for successful updates

	    './index.js'
	    // the entry point of our app
    ],
	output: {
		path: BUILD_PATH,
		filename: 'bundle.js'
		//publicPath: '/'
        // necessary for HMR to know where to load the hot update chunks
        //生产环境即上线才会用到publicPath-----CDN
	},

	//改动3.开启dev source map
	//devtool: 'eval-source-map',
	devtool: 'inline-source-map',
	//开启webpack dev server

	//改动4.删减了部分属性,但同时增加了部分属性
	devServer: {
		/*historyApiFallback: true,
		hot:true,
		inline: true,
		progress: true*/
		hot: true,
    	// enable HMR on the server

	    contentBase: resolve(__dirname, 'dist'),
	    // match the output path

	    publicPath: '/'
	    // match the output `publicPath`
	},

	module: {
		//改动5.loaders换成了rules
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
		rules: [{
				enforce: "pre",
				test: /\.js$/,
				loader: "eslint-loader",
				exclude: /node_modules/,
			}, {
				test: /\.js$/,
				loader: "babel-loader",
				exclude: /node_modules/,
			}, {
				test: /\.css$/,
		        use: [
			        'style-loader',
			        'css-loader?modules',
			        'postcss-loader',
			    ]
			}
		]

	},

	////改动6.配置plugin
	plugins: [
		// new HtmlwebpackPlugin({
		// 	title: 'My first react app'
		// }),
		new webpack.HotModuleReplacementPlugin(),

		new webpack.NamedModulesPlugin()
	],

	//在js中import加载JSX扩展名的脚本
	// resolve: {
	// 	extensions: [".js", ".jsx"]
	// }
}