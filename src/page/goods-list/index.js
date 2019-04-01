require('./index.css')
require('page/common/footer/index.js')
require('page/common/nav-simple/index.js')
require('page/common/nav/index.js')
require('../common/goods-item/index.js')
var _ace = require('util/ace.js')
var navList = require('page/common/nav/index.js')
var goodsTemplate = require('../common/goods-item/index.ace')
var _goods = require('service/goods-service.js')

var page = {
	data: {
		goodsList: []
	},

	init: function () {
		this.getPageType()
	},

	getPageType: function () {
		// 获取商品类别
		var type = _ace.getUrlPatam('type'),
			name = _ace.getUrlPatam('name')
		// 初始化 Nav
		navList.init({
			categoryId: type
		})
		$('.crumb-this').text(name)
		// 获取商品数据
		this.getGoodsList(type)
	},

	goodsItemInit: function () {
		// 渲染商品数据
		var hotGoodsHtml = _ace.renderHtml(goodsTemplate, {
				data: page.data
			})
		$('.page-wrap').append(hotGoodsHtml)
	},

	getGoodsList: function (categoryId) {
		var _this = this
		_goods.getGoodsList({
			categoryId: categoryId,
			sortNo: 0
		}, function (res) {
			page.data.goodsList = res.goodsList
			_this.goodsItemInit()
		})
	}
}

$(function () {
	page.init()
})
