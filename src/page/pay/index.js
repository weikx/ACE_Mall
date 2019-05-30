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
    this.pay()
  },

  pay: function () {
    var _this = this,
      note = _ace.getUrlPatam('note') || '',
      payMoney = _this.getPayMoney()
    if (!payMoney) {
      $('.pay-title').text('请确认付款信息后重试')
      return
    }
    _order.submitOrder({
      note: note,
      payMoney: payMoney
    }, function (res) {
      document.write(res)
    })
  },

  getPayMoney: function () {
    var money = window.sessionStorage.getItem('m')
    this.removeMoney()
    return money
  },

  removeMoney: function () {
    window.sessionStorage.removeItem('m')
  }
}

$(function () {
  page.init()
})
