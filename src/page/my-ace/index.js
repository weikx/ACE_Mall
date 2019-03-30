require('./index.css')
require('page/common/nav/index.js')
require('page/common/footer/index.js')
require('page/common/nav-simple/index.js')
var _ace = require('util/ace.js')
var navList = require('page/common/nav/index.js')
var navSide = require('page/common/nav-side/index.js')

navSide.init({
	name: 'my-ace'
})
navList.init()
