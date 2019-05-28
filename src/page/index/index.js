require('./index.css')
require('page/common/nav/index.js')
require('page/common/footer/index.js')
require('../common/goods-item/index.js')
require('page/common/nav-simple/index.js')
var _ace = require('util/ace.js')
var swiperTemplate = require('./swiper.ace')
var navList = require('page/common/nav/index.js')
var goodsTemplate = require('../common/goods-item/index.ace')
var _goods = require('service/goods-service.js')

navList.init({
	categoryId: 'home'
})

var page = {
	data: {
		swiperImgs: [],

		hotGoods: {},

		krisRecommend: {}

	},

	init: function () {
		this.onLoad()
	},

	onLoad: function () {
		this.getHomeGoods()
		this.getSwiper()
	},

	swiperInit: function () {
		// 初始化轮播
		var swiperHtml = _ace.renderHtml(swiperTemplate, {
			swiperImgs: page.data.swiperImgs
		})
		$('.swiper-wrapper').html(swiperHtml)

		var mySwiper = new Swiper ('.swiper-container', {
			autoplay: true,
			loop: true
		})
	},

	// 商品列表初始化
	goodsItemInit: function () {
		var hotGoodsHtml = _ace.renderHtml(goodsTemplate, {
			data: page.data.hotGoods
		}),
		recommendGoodsHtml = _ace.renderHtml(goodsTemplate, {
			data: page.data.krisRecommend
		})
    // 追加页面内容
    $('.home-loading').remove()
    $('.page-wrap.width').append(hotGoodsHtml)
      .append(recommendGoodsHtml)
      .append('<div class="page-end"></div>')
    // 移除加载动画
	},

	// 获取首页商品
	getHomeGoods: function () {
		var _this = this
		_goods.getHomeGoods(function (res) {
			_this.data.hotGoods = res.hotGoods
			_this.data.krisRecommend = res.krisRecommend
			_this.goodsItemInit()
		})
	},

	getSwiper: function () {
		var _this = this
		_goods.getSwiper(function (res) {
			_this.data.swiperImgs = res
			_this.swiperInit()
		})
	}
}

$(function () {
	page.init()
})
