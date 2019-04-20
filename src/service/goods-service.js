var _ace = require('util/ace.js')

var _goods = {
	getGoodsCategory: function (success, error) {
		_ace.request({
			url: _ace.getServerUrl('api/Good/GetGoodsCategory'),
			success: success,
			error: error
		})
	},

	getGoodsList: function (params, success, error) {
		_ace.request({
			url: _ace.getServerUrl('api/Good/ByCategoryGetGoods'),
			data: params,
			success: success,
			error: error
		})
	},

	getGoodsDetail: function (params, success, error) {
		_ace.request({
			url: _ace.getServerUrl('api/Good/ByGoodIDGetGoodDetail'),
			data: params,
			success: success,
			error: error
		})
	},

	getEvaluate: function (params, success, error) {
		_ace.request({
			url: _ace.getServerUrl('api/Good/ByGoodIDGetGoodEvaluation'),
			data: params,
			success: success,
			error: error
		})
	},

	getHomeGoods: function (success, error) {
		_ace.request({
			url: _ace.getServerUrl('api/Good/GetHomeGoods'),
			success: success,
			error: error
		})
	},

	getSwiper: function (success, error) {
		_ace.request({
			url: _ace.getServerUrl('api/Good/GetRotationPicture'),
			success: success,
			error: error
		})
	}
}

module.exports = _goods
