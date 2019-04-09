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

navSide.init()
navList.init()

var page = {
  data: {
    order: []
  },

  init: function () {
    this.onLoad()
  },

  onLoad: function () {
    this.bindEvent()
  },

  bindEvent: function () {
  }
}

$(function () {
  page.init()
})