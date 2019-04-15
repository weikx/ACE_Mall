require('./index.css')
require('page/common/nav/index.js')
require('page/common/footer/index.js')
require('page/common/nav-simple/index.js')
var _ace = require('util/ace.js')
var navList = require('page/common/nav/index.js')
var navSide = require('page/common/nav-side/index.js')
var _user = require('service/user-service.js')
var pageTemplate = require('./index.ace')

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
    this.sayHello()

  },

	bindEvent: function () {
		var val = '',
				_this = this

    $(document).on('click', '.link.change', function () {
      // 点击修改按钮 使 input 可输入
      var type = $(this).data('type')
      val = $('.' + type).val()
      $('.' + type).removeAttr('disabled').focus()
    })
    $(document).on('blur', '.input', function () {
      // input 失焦上传信息
      _this.setData($(this), val)
    })
    $(document).on('keydown', '.input', function (e) {
      if (e.keyCode === 13) {
        $(this).attr('disabled', true)
      }
    })
    $(document).on('change', '#file', function (e) {
      // 修改头像
      _this.getUrlBase64(this, function (img) {
        _user.uploadImg({
          file: img
        }, function (res) {
          $('#avater-img').attr('src', res.img)
          _this.updateMyData()
        })
      })
    })
  },

	getMyData: function () {
		// 获取个人信息
    var _this = this
		_user.getMyData(function (res) {
		  if (res) {
        res[0].sayHello = _this.sayHello()
      }
      page.data.userData = res[0]
      _this.renderPage(res[0])
    })
  },
	
	changeName: function () {
		$('#change-name')
  },

	setData: function ($this, val) {
    var inputClass = $this.eq(0).attr('class').split(' ')[1],
				type = inputClass,
        inputNode = $('.' + inputClass),
				thisValue = inputNode.val(),
        _this = this
    inputNode.attr('disabled', true)
    if (!thisValue) {
      _ace.errorTips('请输入正确内容')
      inputNode.val(val)
    } else if (type === 'phone' && !_ace.validate(thisValue, 'phone')) {
      _ace.errorTips('请输入正确的手机号')
      inputNode.val(val)
    } else if (type === 'email' && !_ace.validate(thisValue, 'email')) {
      _ace.errorTips('请输入正确的邮箱')
      inputNode.val(val)
    } else if (thisValue !== val) {
      if (type == 'account') {
        $('.user-info .account-name').text(thisValue)
      }
      _this.updateMyData()
    }
  },

  getInputVal (type) {
	  return $('.input.' + type).val()
  },

  updateMyData () {
	  var _this = this
    _user.updateMyData({
      userId: _ace.getUserInfo.id(),
      email: _this.getInputVal('email'),
      image: $('#avater-img').attr('src'),
      password: _this.getInputVal('password'),
      receiveName: _this.getInputVal('name'),
      receivePhone: _this.getInputVal('phone'),
      receiveAddress: _this.getInputVal('address')
    })
  },

  renderPage: function (data) {
    var pageHtml = _ace.renderHtml(pageTemplate, data)
    $('.content').html(pageHtml)
  },

  sayHello: function () {
    var date = new Date().getHours()
    if (date >= 22 && date < 5) {
      return '该睡觉了'
    } else if (date >= 5 && date < 8) {
      return '早晨好'
    } else if (date >= 8 && date < 11) {
      return '上午好'
    } else if (date >= 11 && date < 13) {
      return '中午好'
    } else if (date >= 13 && date < 18) {
      return '下午好'
    } else if (date >= 18 && date < 22) {
      return '晚上好'
    } else {
      return '你好'
    }
  },

  getUrlBase64: function ($file, callback) {
	  // 图片转 Base64
    var src = window.URL.createObjectURL($file.files[0]),
        canvas = document.createElement('canvas'),
        ctx = canvas.getContext('2d'),
        img = new Image
    img.crossOrigin = 'Anonymous'
    img.src = src
    img.onload = function () {
      canvas.height = img.height
      canvas.width = img.width
      ctx.drawImage(img, 0, 0, img.width, img.height)
      var dataURL = canvas.toDataURL('image/jpg')
      callback.call(this, dataURL.slice(22))
      canvas = null
    }
  }
}

$(function () {
	page.init()
})