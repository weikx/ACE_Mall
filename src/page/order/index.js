require('./index.css')
require('page/common/nav/index.js')
require('page/common/footer/index.js')
require('page/common/nav-simple/index.js')
require('page/common/fail-tip/index.js')
var _ace = require('util/ace.js')
var navList = require('page/common/nav/index.js')
var navSide = require('page/common/nav-side/index.js')
var _order = require('service/order-service.js')
var _goods = require('service/goods-service.js')
var orderTemplate = require('./index.ace')
var failTipTemplate = require('page/common/fail-tip/index.ace')
var evaluateTemplate = require('./evaluate.ace')

navSide.init({
  name: 'order'
})
navList.init()

var page = {
  data: {
    orderList: [],
    evaluate: {}
  },

  init: function () {
    this.onLoad()
  },

  onLoad: function () {
    this.bindEvent()
    this.getOrderNum()
    this.getOrderList()
  },

  bindEvent: function () {
    var _this = this
    $('.order-tab-item').on('click', function () {
      var index = $(this).index()
      $('.order-tab-main').hide().eq(index).show()
      $(this).addClass('active').siblings().removeClass('active')
      _this.getOrderList(index)
    })
    // 确认订单
    $(document).on('click', '.confirm-receipt', function () {
      var orderNo = $(this).data('order-no')
      _order.confirmReceipt({
        orderNo: orderNo
      }, function () {
        window.location.reload()
      })
    })
    // 点击评价
    $(document).on('click', '.to-evaluate', function () {
      var index = $(this).parents('.order-card').index(),
        waitEvaluateGoods = page.data.orderList[index]
      page.data.evaluate = waitEvaluateGoods
      var evaluataHtml = _ace.renderHtml(evaluateTemplate, waitEvaluateGoods)
      $('.stick-footer-content-inside').append(evaluataHtml)
      $('.evaluate-popup').show()
      $('.evaluate-popup').animate({opacity: 100}, 300)
    })
    // 点击关闭弹窗
    $(document).on('click', '.evaluate-close', function () {
      _this.closePopup()
    })
    // 评星
    $(document).on('mouseover', '.star-list .star-item', function () {
      var starNum = $(this).index() + 1,
        goodsIndex = $(this).parents('.evaluate-wrap').index()
      page.data.evaluate.goodList[goodsIndex].star = starNum
      $(this).addClass('active')
        .prevAll().addClass('active')
      $(this).nextAll().removeClass('active')
    })
    // 输入评价
    $(document).on('blur', '.evaluate-text', function () {
      var goodsIndex = $(this).parents('.evaluate-wrap').index()
      page.data.evaluate.goodList[goodsIndex].content = $(this).val()
    })
    // 发布评价
    $(document).on('click', '.publish', function () {
      var evaluate = page.data.evaluate
      // 遍历订单商品列表 提交评论
      evaluate.goodList.forEach(function (item) {
        _this.submitEvaluation({
          orderNo: evaluate.orderNo,
          content: item.content || '',
          goodId: item.goodId,
          star: item.star || 5
        })
      })
    })
  },

  getOrderNum: function () {
    // 获取 and 设置 订单数量
    _order.getOrderNum(function (res) {
      // ['全部', '待付款', '待发货', '待收货', '待评价', '已完成', '已关闭']
      res.forEach(function (item, index) {
        $('.order-tab-item .order-num').eq(index).html(item)
      })
    })
  },

  getOrderList: function (orderStatus) {
    var _this = this
    _order.getOrderList({
      orderStatus: orderStatus || 0
    }, function (res) {
      page.data.orderList = res
      res.forEach(function (item) {
        // 添加字段用于 Hogan.js 模板渲染
        // （垃圾 Hogan.js） 不支持条件渲染 so 多加了一些字段用来判断
        // ['全部', '待付款', '待发货', '待收货', '待评价', '已完成', '已关闭']
        switch (item.orderState) {
          case 0:
            item.orderStateTexe = '全部'
            item.all = true
            break
          case 1:
            item.orderStateTexe = '待付款'
            item.waitPay = true
            break
          case 2:
            item.orderStateTexe = '待发货'
            item.waitDelivery = true
            break
          case 3:
            item.orderStateTexe = '待收货'
            item.waitReceive = true
            break
          case 4:
            item.orderStateTexe = '待评价'
            item.waitEvaluate = true
            break
          case 5:
            item.orderStateTexe = '已完成'
            item.completed = true
            break
          case 6:
            item.orderStateTexe = '已关闭'
            item.closed = true
            break
        }
      })
      _this.renderOrder(orderStatus)
    })
  },

  renderOrder: function (index) {
    // 渲染订单模板
    var orderHtml = _ace.renderHtml(orderTemplate, page.data)
    var tipHtml = _ace.renderHtml(failTipTemplate, {
      msg: '当前列表无订单',
      shopping: true
    })
    // 有订单则渲染订单 无订单则渲染提示
    var hasOrder = !!page.data.orderList.length
    $('.order-tab-main').eq(index || 0).html(hasOrder ? orderHtml : tipHtml)
  },

  // 发布评价
  submitEvaluation: function (params) {
    var _this = this
    _goods.addGoodEvaluation(params,
      function (res) {
      _this.closePopup()
      window.location.reload()
    })
  },

  // 关闭评价弹窗
  closePopup: function () {
    $('.evaluate-popup').animate({opacity: 0}, 300, 'swing', function () {
      $('.evaluate-popup').hide().remove()
    })
  }
}

$(function () {
  page.init()
})