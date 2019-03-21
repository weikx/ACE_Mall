require('./index.css')
require('page/common/footer/index.js')
require('page/common/nav-simple/index.js')
var _ace = require('util/ace.js')

$(function () {
	var type = _ace.getUrlPatam('type') || 'default',
		$element = $('.' + type + '-success').show()
})
