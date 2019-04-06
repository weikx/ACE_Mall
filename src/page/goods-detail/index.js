require('./index.css')
require('page/common/footer/index.js')
require('page/common/nav-simple/index.js')
require('page/common/nav/index.js')
require('page/common/fail-tip/index.js')
var _ace = require('util/ace.js')
var navList = require('page/common/nav/index.js')
var _goods = require('service/goods-service.js')
var _user = require('service/user-service.js')
var goodsDetailTemplate = require('./index.ace')
var failTipTemplate = require('page/common/fail-tip/index.ace')
var evaluateTemplate = require('./evaluate.ace')

navList.init()
var page = {
	data: {
		goodsId: _ace.getUrlPatam('id') || '',
		goodsDetail: {},
		evaluate: []
	},

	init: function () {
		this.onLoad()
	},

	onLoad: function () {
		$('.goods-wrap').html('<p class="loading-text">A.C.E. 载入中...</p>')
		if (!this.data.goodsId) {
			// 若没有商品ID 则返回首页
			_ace.goHome()
		}
		this.getCrumbType()
		this.getGoodsDetail()
		this.bindEvent()
	},

	getCrumbType: function () {
		// 获取 设置面包屑导航文字
		var id = _ace.getUrlPatam('id'),
			name = _ace.getUrlPatam('name')
		$('.crumb-this').text(name || '未知商品')
	},

	initSwiper: function () {
		// 初始化轮播
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
		var _this = this,
			$pageWrap = $('.goods-wrap')
		_goods.getGoodsDetail({
			goodId: page.data.goodsId
		}, function (res) {
			res = res[0]
			_this.data.goodsDetail = res
			if (res) {
				res.detailImage = res.detailImage && res.detailImage.split(',')				// 分割图片地址
				res.infoImage = res.infoImage && res.infoImage.split(',')
				var goodsDetailHtml = _ace.renderHtml(goodsDetailTemplate, res)
				$pageWrap.html(goodsDetailHtml)
				_this.initSwiper()
			} else {
				var tipHtml = _ace.renderHtml(failTipTemplate, {
					msg: '商品出错，换个商品试试'
				})
				$pageWrap.html(tipHtml)
			}
		})
	},

	bindEvent: function () {
		var _this = this
		$(document).on('click', '.goods-count-btn', function () {
			// 数量加减
			var type = $(this).hasClass('plus') ? 'plus' : 'minus',
				$goodsCount = $('.goods-count'),
				currCount = parseInt($goodsCount.val()),
				maxCount = _this.data.goodsDetail.stock || 1,
				minCount = 1
			if (type === 'plus') {
				$goodsCount.val(currCount < maxCount ? currCount +1 : maxCount)
			} else {
				$goodsCount.val(currCount > minCount ? currCount -1 : minCount)
			}
		})

		$(document).on('click', '.btn', function () {
			// 加入购物车
			_user.addShopCart({
				userId: _ace.getUserInfo.id(),
				number: $('.goods-count').val(),
				goodId: page.data.goodsId
			}, function () {
				_ace.successTips('加入成功')
				_this.setCartCount()
			})
		})

		$(document).on('click', '.tab-list .tab-item', function (i) {
			var tabIndex = $(this).attr('index').split(' ')
			$(this).addClass('active')
			$(this).siblings('.active').removeClass('active')
			var detail = $('.detail-con').children()
			$(detail[tabIndex]).show().siblings().hide()
			if (tabIndex == 1) {
				_this.getEvaluate()
			}
		})
	},

	getEvaluate: function () {
		// 获取评论
		if (!page.data.evaluate.length) {
			_goods.getEvaluate({
				goodId: page.data.goodsId
			}, function (res) {
				if (res.length) {
					page.data.evaluate = res
					var evaluateHtml = _ace.renderHtml(evaluateTemplate, page.data)
					$('.detail-evaluate-wrap').html(evaluateHtml)
				} else {
					$('.detail-evaluate-wrap').html('<p>暂无评论</p>')
				}
			})
		}
	},

	setCartCount: function () {
		// 设置购物车数量
		_user.getShopCart(function (res) {
			$('.cart-count').text(res.mymodel.length)
		})
	}
}

$(function () {
	page.init()
})
