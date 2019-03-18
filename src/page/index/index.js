var _ace = require('util/ace.js')

console.log(_ace.getUrlPatam('test'))

var html = '<div>{{data}}</div>'
var data = {
	data: 'shit'
}

console.log(_ace.renderHtml(html, data))
