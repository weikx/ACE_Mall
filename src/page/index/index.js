require('./index.css')
require('page/common/footer/index.js')
require('page/common/nav-simple/index.js')
require('page/common/nav/index.js')
var _ace = require('util/ace.js')
var navList = require('page/common/nav/index.js')
var swiperTemplate = require('./swiper.ace')
var goodsTemplate = require('./goods-item.ace')

navList.init({
	name: 'home'
})

var page = {
	data: {
		swiperImgs: [
			{
				src: 'https://s2.ax1x.com/2019/03/23/AGw0kF.png',
				href: './goods-detail.html',
				id: 666,
				name: '龙吟🐲'
			},
			{
				src: 'https://s2.ax1x.com/2019/03/23/AGwWTO.png',
				href: './goods-detail.html',
				id: 888,
				name: '虎啸🐯'
			},
			{
				src: 'https://s2.ax1x.com/2019/03/23/AG0p1s.png',
				href: './goods-detail.html',
				id: 520,
				name: '太极☯️'
			},
			{
				src: 'https://gdp.alicdn.com/imgextra/i3/2200607101491/O1CN01H8kQXG1Msv1ZBaMjD_!!2200607101491.jpg',
				href: './goods-detail.html',
				id: 999,
				name: '这是啥'
			}
		],

		hot: {
			title: '热卖商品',
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
				},
				{
					name: 'A.C.E. CUBAN系列 925银镶合成宝石 戒指指环',
					img: 'https://img.alicdn.com/bao/uploaded/i4/2200607101491/O1CN01C6PIse1Msv2HENI3f_!!0-item_pic.jpg_180x180.jpg',
					presentPrice: 1700,
					originalPrice: 0,
					id: 4
				},
				{
					name: 'A.C.E. 虎啸系列 925银镶合成宝石虎头吊坠项链',
					img: 'https://img.alicdn.com/bao/uploaded/i4/2200607101491/O1CN01XCv9xT1Msv1efZphQ_!!0-item_pic.jpg_180x180.jpg',
					presentPrice: 2800,
					originalPrice: 0,
					id: 5
				},
				{
					name: 'A.C.E. CUBAN系列 925银 925银镶合成宝石 手链手环',
					img: 'https://img.alicdn.com/bao/uploaded/i4/2200607101491/O1CN01Dia1fu1Msv2J8lqUi_!!0-item_pic.jpg_180x180.jpg',
					presentPrice: 1500,
					originalPrice: 0,
					id: 6
				},
				{
					name: 'A.C.E. LOGO系列 925银镶合成宝石 黄色 吊坠项链',
					img: 'https://img.alicdn.com/bao/uploaded/i3/2200607101491/O1CN01BdhZUX1Msv1hlbHbV_!!0-item_pic.jpg_180x180.jpg',
					presentPrice: 1600,
					originalPrice: 0,
					id: 7
				},
				{
					name: 'A.C.E. 虎啸系列 18K金镶钻石虎头吊坠项链',
					img: 'https://img.alicdn.com/bao/uploaded/i3/2200607101491/O1CN01IOK9MV1Msv1hBmwWP_!!0-item_pic.jpg_180x180.jpg',
					presentPrice: 12800,
					originalPrice: 0,
					id: 8
				},
				{
					name: 'A.C.E. 18K金 合成宝石 TENNIS耳钉',
					img: 'https://img.alicdn.com/bao/uploaded/i4/2200607101491/O1CN01kSUgPz1Msv1fw4HrD_!!0-item_pic.jpg_180x180.jpg',
					presentPrice: 1300,
					originalPrice: 0,
					id: 9
				},
				{
					name: 'A.C.E. K.O.系列 925银镶合成宝石 白色 吊坠项链',
					img: 'https://img.alicdn.com/bao/uploaded/i3/2200607101491/O1CN01opVXzg1Msv1v1vskl_!!0-item_pic.jpg_180x180.jpg',
					presentPrice: 1500,
					originalPrice: 0,
					id: 10
				}
			]
		},

		recommend: {
			title: 'Kris wu 推荐',
			goodsList: [
				{
					name: 'A.C.E. 虎啸系列 925银镶合成宝石虎头耳钉',
					img: 'https://img.alicdn.com/bao/uploaded/i2/2200607101491/O1CN01N1fYLr1Msv2KbtI7D_!!0-item_pic.jpg_180x180.jpg',
					presentPrice: 2200,
					originalPrice: 0,
					id: 11
				},
				{
					name: 'A.C.E. LOGO系列 925银镶合成宝石 白色 吊坠项链',
					img: 'https://img.alicdn.com/bao/uploaded/i4/2200607101491/O1CN01UzblHa1Msv1iDfsmB_!!0-item_pic.jpg_180x180.jpg',
					presentPrice: 1600,
					originalPrice: 0,
					id: 12
				},
				{
					name: 'A.C.E. CUBAN系列 925银 925银镶合成宝石 项链',
					img: 'https://img.alicdn.com/bao/uploaded/i2/2200607101491/O1CN01eXiQQK1Msv2JKfO0w_!!0-item_pic.jpg_180x180.jpg',
					presentPrice: 3500,
					originalPrice: 0,
					id: 13
				},
				{
					name: 'A.C.E. 18K金 合成宝石 TENNIS手链手环',
					img: 'https://img.alicdn.com/bao/uploaded/i2/2200607101491/O1CN01DzN2p01Msv1eO8tlK_!!0-item_pic.jpg_180x180.jpg',
					presentPrice: 7800,
					originalPrice: 0,
					id: 14
				},
				{
					name: 'A.C.E. 18K金 合成宝石 TENNIS项链',
					img: 'https://img.alicdn.com/bao/uploaded/i2/2200607101491/O1CN019ErA2D1Msv1grfucn_!!0-item_pic.jpg_180x180.jpg',
					presentPrice: 19800,
					originalPrice: 0,
					id: 15
				}
			]
		}
	},

	init: function () {
		this.swiperInit()
		this.goodsItemInit()
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
			data: page.data.hot
		}),
		recommendGoodsHtml = _ace.renderHtml(goodsTemplate, {
			data: page.data.recommend
		})
		$('.page-wrap').append(hotGoodsHtml)
		$('.page-wrap').append(recommendGoodsHtml)
	}
}

$(function () {
	page.init()
})
