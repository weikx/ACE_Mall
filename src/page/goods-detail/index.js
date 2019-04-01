require('./index.css')
require('page/common/footer/index.js')
require('page/common/nav-simple/index.js')
require('page/common/nav/index.js')
var _ace = require('util/ace.js')
var navList = require('page/common/nav/index.js')
var _goods = require('service/goods-service.js')

navList.init({
	categoryId: ''
})
var page = {
	data: {
		goodsId: _ace.getUrlPatam('id') || ''
	},
	init: function () {
		this.onLoad()
	},

	onLoad: function () {
		if (!this.data.goodsId) {
			// 没有商品 ID 则返回首页
			_ace.goHome()
		}
		this.getGoodsData()
		this.initSwiper()
		this.getGoodsDetail()
	},

	bindEvent: function () {},

	getGoodsData: function () {
		var id = _ace.getUrlPatam('id'),
			name = _ace.getUrlPatam('name')
		$('.crumb-this').text(name)
	},

	initSwiper: function () {
		// Doc: https://www.swiper.com.cn/
		var mySwiper = new Swiper ('.img-con .swiper-container', {
			loop: true,
			effect: 'fade',
			navigation: {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev',
			},
			pagination: {
				el: '.swiper-pagination',
			}
		})
	},

	getGoodsDetail: function () {
		_goods.getGoodsDetail({
			goodId: 1
		}, function (res) {
			res = res[0]
			res.detailImage = res.detailImage.split(',')
			res.infoImage = res.infoImage.split(',')
		})
	}
}

$(function () {
	page.init()
})
