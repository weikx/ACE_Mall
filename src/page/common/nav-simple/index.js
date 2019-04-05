require('./index.css')
var _ace = require('util/ace.js')
var _user = require('service/user-service.js')

var navSimple = {
	data: {
		userInfo: _ace.getUserInfo.info(),
		cartCount: 0
	},

	init: function () {
		this.onLoad()
	},

	onLoad: function () {
		this.setUserData()
		this.setCartCount()
		this.bindEvent()
	},

	bindEvent: function () {
		var _this = this
		$('.logout').click(function () {
			_this.logout()
		})
		$('.js-login').click(function () {
			_this.login()
		})
	},

	setUserData: function () {
		navSimple.data.userInfo && $('.no-login').hide()
			.siblings('.login').show()
			.find('.username').text(navSimple.data.userInfo.receiveName)
	},

	setCartCount: function () {
		// 设置购物车数量
		var _this = this
		$('.cart-count').text(_this.getLocationCount() || 0) // 先从本地读购物车数量，再获取。免得获取慢数量闪一下
		navSimple.data.userInfo && _user.getShopCart(function (res) {
			$('.cart-count').text(res.length)
			_this.setLocationCount(res.length)
		})
	},

	setLocationCount: function (num) {
		localStorage.setItem('cartCount', num)
	},

	getLocationCount: function () {
		return localStorage.getItem('cartCount')
	},

	logout: function () {
		_ace.logout()
		window.location.reload()
	},

	login: function () {
		_ace.toLogin()
	}
}

navSimple.init()
