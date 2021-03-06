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

    // 监听页面进入
    document.addEventListener('visibilitychange', function () {
      if (document.visibilityState == 'visible') {
        window.location.reload()
      }
    });
  },

  submitOrder: function (note, payMoney) {
    this.setPayMoney(payMoney)
    // TODO: 后期需要后台修改为不需要传递 money
    window.open('./pay.html?note=' + note)
  },

  setPayMoney: function (money) {
    window.sessionStorage.setItem('m', money)
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
      msg: '请勾选需要结算的商品 ',
      checklist: true
    })
    $('.no-goods').html(tipHtml).children().append('<a href="./order.html" class="link">去订单列表看看？</a>')
  }
}

$(function () {
  page.init()
})
