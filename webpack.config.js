var path = require('path')
var webpack = require('webpack')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var HtmlWebpackPlugin = require('html-webpack-plugin')
function getHtmlConfig (name) {
	return {
		title: 'shit',
		template: './src/view/'+ name +'.html',
		filename: 'view/'+ name +'.html',
		inject: true,
		hash: true,
		chunks: ['common', name]
	}
}

module.exports = {
	entry: {
		'common': ['./src/page/common/index.js'],
		'index': ['./src/page/index/index.js'],
		'login': ['./src/page/login/index.js']
	},
	output: {
		filename: 'js/[name].js',
		path: path.resolve(__dirname, 'dist')
	},
	externals: {
		'jquery': 'window.jQuery'
	},
	module: {
		loaders: [
			{
				test: /\.css$/,
				loader: ExtractTextPlugin.extract('style-loader', 'css-loader')
			},
			{
				test: /\.(html)$/,
				include: [
					path.resolve(__dirname, './src/view/layout')
				],
				loader: 'html-loader'
			}
		]
	},
	plugins: [
		// 独立通用模块到 js/base.js
		new webpack.optimize.CommonsChunkPlugin({
			name: 'common',
			filename: 'js/base.js'
		}),
		// 把 css 单独打包到文件
		new ExtractTextPlugin('css/[name].css'),
		// html 模版的处理
		new HtmlWebpackPlugin(getHtmlConfig('index')),
		new HtmlWebpackPlugin(getHtmlConfig('login'))
	]
}
