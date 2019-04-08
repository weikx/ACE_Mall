require('./index.css')
require('page/common/nav/index.js')
require('page/common/footer/index.js')
require('page/common/nav-simple/index.js')
var _ace = require('util/ace.js')
var navList = require('page/common/nav/index.js')
var navSide = require('page/common/nav-side/index.js')
var _order = require('service/order-service.js')

navSide.init({
  name: 'order'
})
navList.init()

var page = {
  init: function () {
    this.onLoad()
  },

  onLoad: function () {
    this.bindEvent()
    this.getOrderNum()
  },

  bindEvent: function () {
    $('.order-tab-item').on('click', function () {
      var index = $(this).index()
      $('.order-tab-main').hide().eq(index).show()
      $(this).addClass('active').siblings().removeClass('active')
    })
  },

  getOrderNum: function () {
    _order.getOrderNum(function (res) {
      console.log(res)
    })
  }
}

$(function () {
  page.init()
})