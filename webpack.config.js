var path = require('path')
var webpack = require('webpack')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var HtmlWebpackPlugin = require('html-webpack-plugin')

var WEBPACK_ENV = process.env.WEBPACK_ENV || 'dev'
function getHtmlConfig (name, title) {
	return {
		title: title,
		template: './src/view/' + name + '.html',
		filename: 'view/' + name + '.html',
		inject: true,
		hash: true,
		chunks: ['common', name]
	}
}

var config = {
	entry: {
		'common': ['./src/page/common/index.js'],
		'index': ['./src/page/index/index.js'],
		'login': ['./src/page/login/index.js'],
		'register': ['./src/page/register/index.js'],
		'result': ['./src/page/result/index.js'],
		'my-ace': ['./src/page/my-ace/index.js'],
		'goods-detail': ['./src/page/goods-detail/index.js'],
		'goods-list': ['./src/page/goods-list/index.js'],
		'cart': ['./src/page/cart/index.js'],
		'checkout': ['./src/page/checkout/index.js'],
		'order': ['./src/page/order/index.js'],
		'pay': ['./src/page/pay/index.js'],
		'order-detail': ['./src/page/order-detail/index.js'],
		'my-evaluate': ['./src/page/my-evaluate/index.js'],
		'change-password': ['./src/page/change-password/index.js'],
		'about': ['./src/page/about/index.js']
	},

	output: {
		path: './dist',
		publicPath: '/dist',
		filename: 'js/[name].js'
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
				test: /\.(gif|png|jpg|woff|svg|eot|ttf)\??.*$/,
				loader: 'url-loader'
			},
			{
				test: /\.ace$/,
				loader: 'html-loader'
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

	resolve: {
		alias: {
			util: path.resolve(__dirname, './src/util'),
			page: path.resolve(__dirname, './src/page'),
			service: path.resolve(__dirname, './src/service'),
			image: path.resolve(__dirname, './src/image')
		}
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
		new HtmlWebpackPlugin(getHtmlConfig('index', '首页')),
		new HtmlWebpackPlugin(getHtmlConfig('login', '登录')),
		new HtmlWebpackPlugin(getHtmlConfig('register', '注册')),
		new HtmlWebpackPlugin(getHtmlConfig('result', '操作结果')),
		new HtmlWebpackPlugin(getHtmlConfig('my-ace', '个人中心')),
		new HtmlWebpackPlugin(getHtmlConfig('goods-detail', '商品详情')),
		new HtmlWebpackPlugin(getHtmlConfig('goods-list', '商品列表')),
		new HtmlWebpackPlugin(getHtmlConfig('cart', '购物车')),
		new HtmlWebpackPlugin(getHtmlConfig('checkout', '确认订单')),
		new HtmlWebpackPlugin(getHtmlConfig('order', '我的订单')),
		new HtmlWebpackPlugin(getHtmlConfig('pay', '支付')),
		new HtmlWebpackPlugin(getHtmlConfig('order-detail', '订单详情')),
		new HtmlWebpackPlugin(getHtmlConfig('my-evaluate', '我的评价')),
		new HtmlWebpackPlugin(getHtmlConfig('change-password', '修改密码')),
		new HtmlWebpackPlugin(getHtmlConfig('about', '关于ACE'))
	],

	devServer: {
		disableHostCheck: true,
		hot: true
	}
}

module.exports = config

if (WEBPACK_ENV === 'dev') {
	config.entry.common.push('webpack-dev-server/client?http://localhost:8088/')
}
