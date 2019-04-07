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
  }
}

module.exports = _order
