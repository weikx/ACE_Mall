var _ace = require('util/ace.js')

var _order = {
  submitOrder: function (params, success, error) {
    _ace.request({
      url: _ace.getServerUrl('api/Order/SubmitOrder'),
      method: 'POST',
      data: params,
      success: success,
      error: error
    })
  },

  payOrder: function (params, success, error) {
    _ace.request({
      url: _ace.getServerUrl('api/Order/PayOrder'),
      method: 'POST',
      data: params,
      success: success,
      error: error
    })
  },

  getOrderNum: function (success, error) {
    _ace.request({
      url: _ace.getServerUrl('api/Order/GetOrderStatusNumber'),
      success: success,
      error: error
    })
  },

  getOrderList: function (params, success, error) {
    _ace.request({
      url: _ace.getServerUrl('api/Order/GetOrderList'),
      data: params,
      success: success,
      error: error
    })
  },

  getOrderDetail: function (params, success, error) {
    _ace.request({
      url: _ace.getServerUrl('api/Order/GetOrderDetail'),
      data: params,
      success: success,
      error: error
    })
  },

  cancelOrder: function (params, success, error) {
    _ace.request({
      url: _ace.getServerUrl('api/Order/CancelOrder'),
      method: 'POST',
      data: params,
      success: success,
      error: error
    })
  },

  confirmReceipt: function (params, success, error) {
    _ace.request({
      url: _ace.getServerUrl('api/Order/ConfirmReceipt'),
      method: 'POST',
      data: params,
      success: success,
      error: error
    })
  },

  deleteOrder: function (params, success, error) {
    _ace.request({
      url: _ace.getServerUrl('api/Order/DeleteOrder'),
      method: 'DELETE',
      data: params,
      success: success,
      error: error
    })
  }
}

module.exports = _order
