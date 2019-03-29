require('./index.css')
require('page/common/footer/index.js')
require('page/common/nav-simple/index.js')
require('page/common/nav/index.js')
var _ace = require('util/ace.js')
var navList = require('page/common/nav/index.js')

navList.init({
	name: ''
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
	},

	bindEvent: function () {},

	getGoodsData: function () {
		var id = _ace.getUrlPatam('id'),
			name = _ace.getUrlPatam('name')
		$('.crumb-this').text(name)
	},

	initSwiper: function () {
		var mySwiper = new Swiper ('.img-con .swiper-container', {
			loop: true, // 循环模式选项
			effect: 'fade',
			// 如果需要前进后退按钮
			navigation: {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev',
			},
			pagination: {
				el: '.swiper-pagination',
			}
		})
	}
}

$(function () {
	page.init()
})
