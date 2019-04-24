require('./index.css')
require('page/common/nav/index.css')
require('page/common/footer/index.js')
require('page/common/nav-simple/index.js')
require('page/common/nav/index.js')
require('page/common/fail-tip/index.js')
var _ace = require('util/ace.js')
var _order = require('service/order-service.js')
var _user = require('service/user-service.js')
var checkoutTemplate = require('./index.ace')
var failTipTemplate = require('page/common/fail-tip/index.ace')

var page = {
  data: {
    checkout: {}
  },
  
  init: function () {
    this.onLoad()
  },
  
  onLoad: function () {
    this.bindEvent()
    this.getCartShow()
  },
  
  bindEvent: function () {
    var _this = this
    $(document).on('click', '.btn.payment', function () {
      var note = $('.note').val(),
          totalPrice = page.data.checkout.totalPrice
      _this.submitOrder(note, totalPrice)
    })
  },
  
  submitOrder: function (note, payMoney) {
    var _this = this
    _order.submitOrder({
      note: note || '',
      payMoney: payMoney
    }, function (res) {
      var orderNo = res.orderNo.OrderNo
      _this.toPay(orderNo)
    })
  },

  payOrder: function (orderNo) {
    _order.payOrder({
      orderNo: orderNo
    })
  },

  toPay: function (orderNo) {
    window.location.href = './pay.html?orderNo=' + orderNo
  },

  getCartShow: function () {
    var _this = this
    _user.getCartShow(function (res) {
      page.data.checkout = res
      _this.renderCheckout(res)
    })
  },

  renderCheckout: function (data) {
    var checkoutHtml = _ace.renderHtml(checkoutTemplate, data)
    $('.checkout-wrap').html(checkoutHtml)
    this.renderErrorTip()
  },

  renderErrorTip: function () {
    // 无商品错误提示
    var tipHtml = _ace.renderHtml(failTipTemplate, {
      msg: '请勾选需要结算的商品',
      checklist: true
    })
    $('.no-goods').html(tipHtml)
  }
}

$(function () {
  page.init()
})