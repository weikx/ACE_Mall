require('./index.css')
require('page/common/footer/index.js')
require('page/common/nav-simple/index.js')
require('page/common/nav/index.js')
require('page/common/goods-item/index.js')
require('page/common/fail-tip/index.js')
var _ace = require('util/ace.js')
var navList = require('page/common/nav/index.js')
var goodsTemplate = require('../common/goods-item/index.ace')
var _goods = require('service/goods-service.js')
var failTipTemplate = require('page/common/fail-tip/index.ace')

var page = {
	data: {
		goodsList: [],
		categoryId: 0,
		sortPrice: 0
	},

	init: function () {
		this.onLoad()
	},

	onLoad: function () {
		this.bindEvent()
		this.getPageType()
	},

	bindEvent: function () {
		var _this = this
		$('.sort-item').on('click', function () {
			// 排序
			// TODO: Waiting for optimization
			$(this).addClass('active')
				.siblings().removeClass('active')
			var sortType = $(this).data('sort')
			if (!!sortType) {
				var sortPriceType = page.data.sortPrice %2 == 0 ? 1 : 2
				_this.getGoodsList(sortPriceType)
				page.data.sortPrice += 1
			} else {
				_this.getGoodsList(0)
			}
		})
	},

	getPageType: function () {
		// 获取商品类别id
		var type = _ace.getUrlPatam('type'),
			name = _ace.getUrlPatam('name')
		page.data.categoryId = type
		// 初始化 Nav
		navList.init({
			categoryId: type
		})
		$('.crumb-this').text(name || '未知商品')
		this.getGoodsList()
	},

	goodsItemInit: function () {
		// 渲染商品数据
		var hotGoodsHtml = _ace.renderHtml(goodsTemplate, {
				data: page.data
			})
		if (page.data.goodsList.length) {
			$('.goods-wrap').html(hotGoodsHtml)
		} else {
			// 渲染错误提示
			var tipHtml = _ace.renderHtml(failTipTemplate, {
				msg: '此分类无商品，换个分类看看吧'
			})
			$('.goods-wrap').html(tipHtml)
		}
	},

	getGoodsList: function (sortNo) {
		// 获取商品列表
		var _this = this
		_goods.getGoodsList({
			categoryId: page.data.categoryId,
			sortNo: sortNo || 0
		}, function (res) {
			page.data.goodsList = res.goodsList
			_this.goodsItemInit()
		}, function () {
			var tipHtml = _ace.renderHtml(failTipTemplate, {
				msg: '出了一点问题，换个分类看看吧'
			})
			$('.goods-wrap').append(tipHtml)
		})
	},

	goodsSort: function () {

	}
}

$(function () {
	page.init()
})
