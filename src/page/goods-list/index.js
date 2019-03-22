require('./index.css')
require('page/common/footer/index.js')
require('page/common/nav-simple/index.js')
require('page/common/nav/index.js')
var _ace = require('util/ace.js')
var navList = require('page/common/nav/index.js')

var page = {
	init: function () {
		this.getPageType()
	},

	getPageType: function () {
		var type = _ace.getUrlPatam('type')
		navList.init({
			name: type
		})
		$('.page-wrap').append(type + '系列')
	}
}

$(function () {
	page.init()
})
