require('./index.css')
require('page/common/nav/index.js')
require('page/common/footer/index.js')
require('page/common/nav-simple/index.js')
require('page/common/fail-tip/index.js')
var _ace = require('util/ace.js')
var navList = require('page/common/nav/index.js')
var navSide = require('page/common/nav-side/index.js')
var _order = require('service/order-service.js')
var failTipTemplate = require('page/common/fail-tip/index.ace')
var orderDetailTemplate = require('./index.ace')

navSide.init()
navList.init()

var page = {
  data: {
    order: {},
    orderNo: _ace.getUrlPatam('orderNo')
  },

  init: function () {
    this.onLoad()
  },

  onLoad: function () {
    this.bindEvent()
    this.getOrderDetail()
  },

  bindEvent: function () {
    var _this = this
    $(document).on('click', '.cancel-order', function () {
      _this.cancelOrder()
    })
  },

  getOrderDetail: function () {
    var _this = this
    _order.getOrderDetail({
      orderNo: page.data.orderNo
    }, function (res) {
      res = res[0]
      page.data.order = res
      _this.renderOrderDetail()
    })
  },

  renderOrderDetail: function () {
    var orderDetailHtml = _ace.renderHtml(orderDetailTemplate, page.data.order)
    $('.order-detail').html(orderDetailHtml)
    this.setOrderStatusText(page.data.order.orderState)
    this.setOrderStatus()
  },

  setOrderStatusText: function (status) {
    // 设置订单状态文字
    var statusText = ''
    switch (status) {
      case 0:
        statusText = '全部'
        break
      case 1:
        statusText = '待付款'
        $('.order-header').append('<a class="btn-border cancel-order">取消订单</a>\n')
        break
      case 2:
        statusText = '待发货'
        break
      case 3:
        statusText = '待收货'
        break
      case 4:
        statusText = '待评价'
        break
      case 5:
        statusText = '已完成'
        break
      case 6:
        statusText = '已关闭'
        break
    }
    $('.order-status').text(statusText)
  },

  setOrderStatus: function () {
    // 设置订单状态进度条
    var timeProgress = page.data.order.timeProgress
    timeProgress.forEach(function (item, index) {
      if (item) {
        $('.progress-list .progress-item').eq(index).addClass('active')
        $('.progress-list-time .progress-item').eq(index).text(item)
      }
    })
  },

  cancelOrder: function () {
    _order.cancelOrder({
      orderNo: page.data.orderNo
    }, function (res) {
      window.location.href = './order.html'
    })
  }
}

$(function () {
  page.init()
})
