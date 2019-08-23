require('./index.css')
require('page/common/footer/index.js')
require('page/common/nav-simple/index.js')
require('page/common/nav/index.js')
require('page/common/fail-tip/index.js')
require('../common/goods-item/index.js')
require('page/common/jquerypage/js/zxf_page.js')
require('page/common/jquerypage/css/zxf_page.css')
var _ace = require('util/ace.js')
var navList = require('page/common/nav/index.js')
var _goods = require('service/goods-service.js')
var _user = require('service/user-service.js')
var goodsDetailTemplate = require('./index.ace')
var failTipTemplate = require('page/common/fail-tip/index.ace')
var evaluateTemplate = require('./evaluate.ace')
var goodsTemplate = require('../common/goods-item/index.ace')

navList.init()
var page = {
	data: {
		goodsId: _ace.getUrlPatam('id') || '',
		goodsDetail: {},
		evaluate: [],
		page: 1,
		pageSize: 5,
		isFirst: true
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

	setCrumbText: function (type, text) {
		$('.crumb-category').text(text || '未知分类')
			.attr('href', './goods-list.html?type=' + type + '&name=' + text)
	},

	initSwiper: function () {
		// 初始化轮播
		// Doc: https://www.swiper.com.cn/
		var mySwiper = new Swiper('.img-con .swiper-container', {
			loop: true,
			effect: 'fade',
			navigation: {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev',
			},
			pagination: {
				el: '.swiper-pagination',
			},
			getKrisRecommend: {}
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
			_this.getKrisRecommend()
			if (res) {
				res.detailImage = res.detailImage && res.detailImage.split(',')				// 分割图片地址
				res.infoImage = res.infoImage && res.infoImage.split(',')
				_this.setCrumbText(res.categoryID, res.categoryName)
				var goodsDetailHtml = _ace.renderHtml(goodsDetailTemplate, res)
				$pageWrap.html(goodsDetailHtml)
				_this.initSwiper()
			} else {
				var tipHtml = _ace.renderHtml(failTipTemplate, {
					msg: '商品不存在或已下架，换个商品试试',
					onlineShopping: true
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
				$goodsCount.val(currCount < maxCount ? currCount + 1 : maxCount)
			} else {
				$goodsCount.val(currCount > minCount ? currCount - 1 : minCount)
			}
		})

		$(document).on('click', '.btn', function () {
			// 加入购物车
			_user.addShopCart({
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

		$(document).on('click', '.load-more', function (i) {
			page.loadMoreEvaluate()
		})
	},

	getEvaluate: function () {
		// 获取评论
		var _this = this
		_goods.getEvaluate({
			goodId: page.data.goodsId,
			page: _this.data.page,
			pageSize: _this.data.pageSize
		}, function (res) {
			if (res.model.length) {
				page.data.evaluate = res.model
				res.model.forEach(function (item) {
					item.star = new Array(item.star)
				})
				var evaluateHtml = _ace.renderHtml(evaluateTemplate, page.data)
				$('.evaluate-main').html(evaluateHtml)
				_this.data.isFirst && _this.initPaging(Math.ceil(res.total / _this.data.pageSize)); _this.data.isFirst = false
			} else {
				$('.evaluate-main').html('<p>暂无评论</p>')
			}
		})
	},

	setCartCount: function () {
		// 设置购物车数量
		_user.getShopCart(function (res) {
			$('.cart-count').text(res.mymodel.length)
		})
	},

	getKrisRecommend: function () {
		var _this = this
		_goods.getHomeGoods(function (res) {
			res.krisRecommend.length = 5
			_this.data.krisRecommend = res.krisRecommend
			_this.goodsItemInit()
		})
	},

	// 推荐商品列表初始化
	goodsItemInit: function () {
		var recommendGoodsHtml = _ace.renderHtml(goodsTemplate, {
			data: page.data.krisRecommend
		})
		// 追加页推荐商品
		$('.detail-recommend-wrap').append(recommendGoodsHtml)
	},

	initPaging: function (pageNum) {
		//翻页
		var _this = this
		$(".zxf_pagediv.evaluate-page").createPage({
			pageNum: pageNum,
			current: _this.data.page,
			backfun: function (e) {
				_this.data.page = e.current || _this.data.page
				_this.getEvaluate()
			}
		});
	}
}

$(function () {
	page.init()
})
