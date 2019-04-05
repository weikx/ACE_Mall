require('./index.css')
require('page/common/footer/index.js')
require('page/common/nav-simple/index.js')
require('page/common/nav/index.js')
var _ace = require('util/ace.js')
var navList = require('page/common/nav/index.js')
var cartTemplate = require('page/cart/index.ace')
var _user = require('service/user-service.js')

navList.init({
	categoryId: ''
})

var cart = {
	data: {
		goods: []
	},

	init: function () {
		this.onLoad()
	},

	onLoad: function () {
		this.bindEvent()
		this.getShopCart()
	},

	bindEvent: function () {
		$(document).on('click', '.goods-count-btn', function () {
			var $this = $(this),
				goodsId = $this.parents('.list-item-wrap').data('id'),
				type = $this.hasClass('plus') ? 'plus' : 'minus',
				$goodsCount = $this.siblings('.goods-count'),
				currCount = parseInt($goodsCount.val()),
				maxCount = $goodsCount.data('stock'),
				minCount = 1
			if (type === 'plus') {
				$goodsCount.val(currCount > maxCount ? maxCount : currCount + 1)
			} else {
				$goodsCount.val(currCount < minCount ? minCount : currCount - 1)
			}
			_user.updateShopCartNum({
				userId: _ace.getUserInfo.id(),
				goodId: goodsId,
				number: currCount
			})
		})
	},

	getShopCart: function () {
		_user.getShopCart(function (res) {
			cart.data.goods = res
			var cartHtml = _ace.renderHtml(cartTemplate, cart.data)
			$('.cart-goods-list').html(cartHtml)
		})
	},

	updateShopCartNum: function () {
		_user.updateShopCartNum({
			userId: 0,
			goodId: 0,
			number: 0
		}, function (res) {
			console.log(res)
		})
	}
}

$(function () {
	cart.init()
})
