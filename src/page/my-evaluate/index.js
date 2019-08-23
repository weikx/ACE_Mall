require('./index.css')
require('page/order/index.css')
require('page/common/nav/index.js')
require('page/common/footer/index.js')
require('page/common/nav-simple/index.js')
require('page/common/jquerypage/js/zxf_page.js')
require('page/common/jquerypage/css/zxf_page.css')
var _ace = require('util/ace.js')
var navList = require('page/common/nav/index.js')
var navSide = require('page/common/nav-side/index.js')
var _user = require('service/user-service.js')
var pageTemplate = require('./index.ace')

navSide.init({
  name: 'my-evaluate'
})
navList.init()

var page = {
  data: {
    evaluateList: [],
    page: 1,
    pageSize: 5,
    isFirst: true
  },

  init: function () {
    this.onLoad()
  },

  onLoad: function () {
    this.bindEvent()
    this.getMyEvaluation()
  },

  bindEvent: function () {

  },

  getMyEvaluation: function () {
    var _this = this
    _user.getMyEvaluation({
      page: _this.data.page,
      pageSize: _this.data.pageSize
    }, function (res) {
      res.model.forEach(function (item) {
        item.star = new Array(item.star)
      })
      _this.data.evaluateList = res.model
      _this.data.isFirst && _this.initPaging(Math.ceil(res.total / _this.data.pageSize)); _this.data.isFirst = false
      _this.renderPage()
    })
  },

  renderPage: function () {
    var pageHtml = _ace.renderHtml(pageTemplate, this.data)
    $('.evaluate-list').html(pageHtml)
  },

  initPaging: function (pageNum) {
    //翻页
    var _this = this
    $(".zxf_pagediv.evaluate-page").createPage({
      pageNum: pageNum,
      current: _this.data.page,
      backfun: function (e) {
        _this.data.page = e.current || _this.data.page
        _this.getMyEvaluation()
      }
    });
  }
}

$(function () {
  page.init()
})
