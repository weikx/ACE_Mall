require('./index.css')
require('page/common/nav/index.css')
require('page/common/footer/index.js')
require('page/common/nav-simple/index.js')
require('page/common/nav/index.js')
require('page/common/fail-tip/index.js')
var _ace = require('util/ace.js')
var _order = require('service/order-service.js')
var _user = require('service/user-service.js')
var failTipTemplate = require('page/common/fail-tip/index.ace')

var page = {
  init: function () {
    this.onLoad()
  },

  onLoad: function () {
    this.bindEvent()
  },

  bindEvent: function () {
    var _this = this
    $('.pay.btn').on('click', function () {
      _this.payOrder()
    })
  },

  payOrder: function () {
    // 支付
    var orderNo = _ace.getUrlPatam('orderNo')
    _order.payOrder({
      orderNo: orderNo
    }, function (res) {
      window.location.href = './order.html'
    })
  }
}

$(function () {
  page.init()
})