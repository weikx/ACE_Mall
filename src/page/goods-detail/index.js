require('./index.css')
require('page/common/footer/index.js')
require('page/common/nav-simple/index.js')
require('page/common/nav/index.js')
var _ace = require('util/ace.js')
var navList = require('page/common/nav/index.js')

navList.init({
	name: ''
})
var page = {
	init: function () {
		this.getGoodsData()
	},

	getGoodsData: function () {
		var id = _ace.getUrlPatam('id'),
			name = _ace.getUrlPatam('name')
		$('.page-wrap').append(id)
		$('.page-wrap').append('<br/>')
		$('.page-wrap').append('商品名称: ')
		$('.page-wrap').append(name)

	}
}

$(function () {
	page.init()
})
