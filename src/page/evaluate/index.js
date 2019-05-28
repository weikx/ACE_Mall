require('./index.css')
require('../cart/index.css')
require('page/common/footer/index.js')
require('page/common/nav-simple/index.js')
require('page/common/nav/index.js')
var _ace = require('util/ace.js')
var navList = require('page/common/nav/index.js')
var _goods = require('service/goods-service.js')
navList.init()

var page = {
  data: {
    star: 5
  },

  init: function () {
    this.onLoad()
  },

  onLoad: function () {
    this.bindEvent()
  },

  bindEvent: function () {
    $('.star-list .star-item').mouseover(function(){
      page.data.star = $(this).index + 1
      $(this).addClass('active')
        .prevAll().addClass('active')
      $(this).nextAll().removeClass('active')
    })
  },

  submitEvaluation: function () {
    _goods.addGoodEvaluation({
      goodId: 0,
      content: 'string',
      orderNo: '',
      star: 5
    }, function (res) {
    })
  }
}

$(function () {
  page.init()
})
