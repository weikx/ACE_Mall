require('./index.css')
require('page/common/footer/index.js')
require('page/common/nav-simple/index.js')
require('page/common/nav/index.js')
var _ace = require('util/ace.js')
var navList = require('page/common/nav/index.js')
var cartTemplate = require('page/cart/index.ace')
var _user = require('service/user-service.js')

navList.init()

var cart = {
	data: {},

	init: function () {
		this.onLoad()
	},

	onLoad: function () {
		this.bindEvent()
		this.getShopCart()
	},

	bindEvent: function () {
		var _this = this
		$(document).on('click', '.goods-count-btn', function () {
			// 商品加减
			var $this = $(this),
				goodsId = $this.parents('.list-item-wrap').data('id'),
				type = $this.hasClass('plus') ? 'plus' : 'minus',
				$goodsCount = $this.siblings('.goods-count'),
				currCount = parseInt($goodsCount.val()),
				maxCount = $goodsCount.data('stock'),
				minCount = 1
			if (type === 'plus') {
				$goodsCount.val(currCount < maxCount ? currCount += 1 : alert('库存不足') || maxCount)
			} else {
				$goodsCount.val(currCount > minCount ? currCount -= 1 : minCount)
			}
			_this.updateShopCartNum(goodsId, currCount)
		})

		$(document).on('change', 'input:checkbox.select-goods', function () {
			// 商品选择☑事件
			var $this = $(this),
				goodsId = $this.parents('.list-item-wrap').data('id'),
				isChecked = $this.is(':checked')
			_this.setGoodsChecked(goodsId, isChecked)
		})

		$(document).on('change', 'input:checkbox.select-all', function () {
			// 商品全选☑事件
			var $this = $(this),
				isChecked = $this.is(':checked')
			_this.setGoodsAllChecked(isChecked)
		})

		$(document).on('click', '.item-action .ace-cha', function () {
			// 商品删除事件
			var $this = $(this),
				goodsId = $this.parents('.list-item-wrap').data('id')
			_this.deleteGoods(goodsId)
		})

		$(document).on('click', '.btn.topay', function () {
			// 提交订单事件
			if (cart.data.checkNumber) {
				window.location.href = './checkout.html'
			} else {
				alert('请先选择商品')
			}
		})
	},

	getShopCart: function () {
		// 获取购物车数据
		var _this = this
		_user.getShopCart(function (res) {
			cart.data = res
			_this.renderCart(cart.data)
		})
	},

	renderCart: function (data) {
		// 渲染购物车
		var cartHtml = _ace.renderHtml(cartTemplate, data)
		$('.cart-goods-list').html(cartHtml)
	},

	updateShopCartNum: function (goodsId, number) {
		// 更新购物车数量
		var _this = this
		_user.updateShopCartNum({
			userId: _ace.getUserInfo.id(),
			goodId: goodsId,
			number: number
		}, function (res) {
			cart.data = res
			_this.renderCart(cart.data)
		})
	},

	setGoodsChecked: function (goodsId, isChecked) {
		// 设置商品是否选中
		var _this = this
		_user.setGoodsChecked({
			userId: _ace.getUserInfo.id(),
			goodId: goodsId,
			isChecked: isChecked
		}, function (res) {
			cart.data = res
			_this.renderCart(cart.data)
		})
	},

	setGoodsAllChecked: function (isChecked) {
		// 设置商品是否全选
		var _this = this
		_user.setGoodsAllChecked({
			userId: _ace.getUserInfo.id(),
			isChecked: isChecked
		}, function (res) {
			cart.data = res
			_this.renderCart(cart.data)
		})
	},

	deleteGoods: function (goodsId) {
		// 删除商品
		var _this = this
		confirm('是否删除该商品') && _user.deleteGoods({
			userId: _ace.getUserInfo.id(),
			goodId: goodsId
		}, function (res) {
			cart.data = res
			_this.renderCart(cart.data)
		})
	},

	submitOrder: function () {
		// 提交订单
		// _user.postOrderShow(function (res) {
		// 	console.log(res)
		// })
	}
}

$(function () {
	cart.init()
})
