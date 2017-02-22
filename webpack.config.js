var path = require("path");
var webpack = require('webpack');
var autoprefixer = require('autoprefixer');
var precss = require('precss');

module.exports = {
	entry: [ 
		"webpack-dev-server/client?http://localhost:8080",
		'webpack/hot/only-dev-server',
		"./src/index.jsx",
	],
	output: {
		path: path.resolve(__dirname, 'build'),
		publicPath: '/build/',
		filename: "bundle.js"
	},
	resolve: {
		extensions: ['*', '.js', 'jsx']
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoEmitOnErrorsPlugin(),
		new webpack.LoaderOptionsPlugin({
			options: {
				postcss: function() {
					return [autoprefixer, precss];
				}
			}
		})
	],
	module: {
		loaders: [
			{
				test: /\.jsx?$/,
				exclude: /node_modules/,
				loaders: ['react-hot-loader', 'babel-loader']
			},
			{
				test: /\.scss$/,
				loaders: ['style-loader', 'css-loader', 'postcss-loader']
			}		
			
		]
	}
};