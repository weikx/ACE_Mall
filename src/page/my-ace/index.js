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
		var val = '',
				_this = this

		$('.link.change').on('click', function () {
			var type = $(this).data('type')
      val = $('.' + type).val()
      $('.' + type).removeAttr('disabled').focus()
    })
		
		$('.input').blur(function () {
			_this.setData($(this), val)
    }).keydown(function (e) {
			if (e.keyCode === 13) {
        $(this).attr('disabled', true)
			}
    })












    // var userName = '',
			// 	phoneNum = '',
			// 	nameNode = $('.user-name'),
			// 	phoneNode = $('.user-phone')
    // $('#change-name').on('click', function () {
			// // 修改用户名点击
			// userName = nameNode.text()
			// nameNode.attr('contenteditable', true).
			// addClass('focus').focus()
    // })
    //
    //
    // $('#change-phone').on('click', function () {
			// // 修改手机点击
    //   phoneNum = phoneNode.val()
    //   phoneNode.removeAttr('disabled').
    //   addClass('focus').focus()
    // })
    //
    // nameNode.blur(function () {
    // 	// 用户名失焦
    // 	if (!nameNode.text()) {
    // 		nameNode.text(userName)
			// }
    //   nameNode.attr('contenteditable', false).
			// removeClass('focus')
    // }).keydown(function (e) {
    // 	if (e.keyCode === 13) {
    //     nameNode.attr('contenteditable', false)
    //   }
    // })
    //
    // phoneNode.blur(function () {
    // 	// 手机号失焦
    //   if (!_ace.validate(phoneNode.val(), 'phone')) {
    //   	_ace.errorTips('请输入正确的手机号')
    //     phoneNode.val(phoneNum)
    //   }
    //   phoneNode.attr('disabled', true).
    //   removeClass('focus')
    // }).keydown(function (e) {
    //   if (e.keyCode === 13) {
    //     phoneNode.attr('disabled', true)
    //   }
    // })
  },

	getMyData: function () {
		// 获取个人信息
		_user.getMyData(function (res) {
			page.data.userData = res[0]
    })
  },
	
	changeName: function () {
		$('#change-name')
  },

	setData: function ($this, val) {
    var inputClass = $this.eq(0).attr('class').split(' ')[1],
				type = inputClass,
        inputNode = $('.' + inputClass),
				thisValue = inputNode.val()
    inputNode.attr('disabled', true)
    if (!thisValue) {
      _ace.errorTips('请输入正确内容')
      inputNode.val(val)
    }

    if (type === 'phone' && !_ace.validate(thisValue, 'phone')) {
    	_ace.errorTips('请输入正确的手机号')
		}
  }
}

$(function () {
	page.init()
})