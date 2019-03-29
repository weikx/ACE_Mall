require('./index.css')
require('page/common/footer/index.js')
require('page/common/nav-simple/index.js')
require('page/common/nav/index.js')
require('../common/goods-item/index.js')
var _ace = require('util/ace.js')
var navList = require('page/common/nav/index.js')
var goodsTemplate = require('../common/goods-item/index.ace')

var page = {
	data: {
		hot: {
			goodsList: [
				{
					name: 'A.C.E. 925银 合成宝石 TENNIS项链',
					img: 'https://img.alicdn.com/bao/uploaded/i2/2200607101491/O1CN01ZnW5dJ1Msv1eMy7gj_!!2200607101491.jpg_180x180.jpg',
					presentPrice: 3800,
					originalPrice: 0,
					id: 3
				},
				{
					name: 'A.C.E. 925银 合成宝石 TENNIS手链手环',
					img: 'https://img.alicdn.com/imgextra/i1/2200607101491/O1CN01v3AET51Msv1hj3uzO_!!0-item_pic.jpg_180x180.jpg',
					presentPrice: 1500,
					originalPrice: 0,
					id: 1
				},
				{
					name: 'A.C.E. LOGO系列 925银镶合成宝石 黄色 吊坠项链',
					img: 'https://img.alicdn.com/bao/uploaded/i3/2200607101491/O1CN01DCNWwz1Msv1dff0oy_!!0-item_pic.jpg_180x180.jpg',
					presentPrice: 580,
					originalPrice: 0,
					id: 2
				}
			]
		}
	},

	init: function () {
		this.getPageType()
		this.goodsItemInit()
	},

	getPageType: function () {
		var type = _ace.getUrlPatam('type')
		navList.init({
			name: type
		})
		$('.crumb-this').text(type + '系列')
	},

	goodsItemInit: function () {
		var hotGoodsHtml = _ace.renderHtml(goodsTemplate, {
				data: page.data.hot
			})
		$('.page-wrap').append(hotGoodsHtml)
	}
}

$(function () {
	page.init()
})
