var _ace = require('util/ace.js')

var _user = {
	login: function (params, success, error) {
		_ace.request({
			url: _ace.getServerUrl('api/User/MyLogin'),
			method: 'POST',
			data: params,
			success: success,
			error: error
		})
	},

	register: function (params, success, error) {
		_ace.request({
			url: _ace.getServerUrl('api/User/MyRegister'),
			method: 'POST',
			data: params,
			success: success,
			error: error
		})
	},

	addShopCart: function (params, success, error) {
		_ace.request({
			url: _ace.getServerUrl('api/User/AddMyShopCart'),
			method: 'POST',
			data: params,
			success: success,
			error: error
		})
	},

	getShopCart: function (success, error) {
		_ace.request({
			url: _ace.getServerUrl('api/User/GetMyShopCart'),
			data: {
				userId: _ace.getUserInfo.id()
			},
			success: success,
			error: error
		})
	},

	updateShopCartNum: function (params, success, error) {
		_ace.request({
			url: _ace.getServerUrl('api/User/UpdateShopCartNumber'),
			method: 'POST',
			data: params,
			success: success,
			error: error
		})
	},

	setGoodsChecked: function (params, success, error) {
		_ace.request({
			url: _ace.getServerUrl('api/User/SetGoodsChecked'),
			method: 'POST',
			data: params,
			success: success,
			error: error
		})
	},

	setGoodsAllChecked: function (params, success, error) {
		_ace.request({
			url: _ace.getServerUrl('api/User/SetGoodsAllChecked'),
			method: 'POST',
			data: params,
			success: success,
			error: error
		})
	},

	deleteGoods: function (params, success, error) {
		_ace.request({
			url: _ace.getServerUrl('api/User/DeleteShopCartGood'),
			method: 'DELETE',
			data: params,
			success: success,
			error: error
		})
	},

	postOrderShow: function (params, success, error) {
		_ace.request({
			url: _ace.getServerUrl('api/User/PostShopCartShow'),
			method: 'POST',
			data: {
				userId: _ace.getUserInfo.id()
			},
			success: success,
			error: error
		})
	}
}

module.exports = _user
