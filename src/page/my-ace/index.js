require('./index.css')
require('page/common/nav/index.js')
require('page/common/footer/index.js')
require('page/common/nav-simple/index.js')
var _ace = require('util/ace.js')
var navList = require('page/common/nav/index.js')
var navSide = require('page/common/nav-side/index.js')
var _user = require('service/user-service.js')

navSide.init({
	name: 'my-ace'
})
navList.init()

var page = {
	data: {
		userData: {}
	},

	init: function () {
		this.onLoad()
  },

	onLoad: function () {
		this.bindEvent()
		this.getMyData()
  },

	bindEvent: function () {

  },

	getMyData: function () {
		_user.getMyData(function (res) {
			page.data.userData = res[0]
    })
  }
}

$(function () {
	page.init()
})