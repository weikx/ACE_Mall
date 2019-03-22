require('./index.css')
require('page/common/footer/index.js')
require('page/common/nav-simple/index.js')
var _ace = require('util/ace.js')

// 表单错误提示
var fromError = {
	show: function (msg) {
		$('.err-box').show().find('.err-msg').text(msg)
	},

	hide: function () {
		$('.err-box').hide().find('.err-msg').text('')
	}
}

var page = {
	init: function () {
		this.bindEvent()
	},

	bindEvent: function () {
		var _this = this
		$('#submit').click(function () {
			_this.submit()
		})
		$('.user-content').keyup(function (e) {
			// 按下回车
			if (e.keyCode == 13) {
				_this.submit()
			}
		})
	},
	// 表单提交
	submit: function () {
		var formData = {
			username: $.trim($('#username').val()),
			password: $.trim($('#password').val()),
			confirmPassword: $.trim($('#confirm-password').val())
		}
		// 表单验证结果
		var validateResult = this.formValidate(formData)
		if (validateResult.status) {
			// 注册
			fromError.hide()
			window.location.href = './result.html?type=register'
		} else {
			fromError.show(validateResult.msg)
		}
	},
	// 表单字段验证
	formValidate: function (formData) {
		var result = {
			status  : false,
			msg     : ''
		}
		if (!_ace.validate(formData.username, 'require')) {
			result.msg = '请输入用户名'
			return result
		}
		if (!_ace.validate(formData.password, 'require')) {
			result.msg = '请输入密码'
			return result
		}
		if (!_ace.validate(formData.confirmPassword, 'require')) {
			result.msg = '请再次输入密码'
			return result
		}
		if (formData.password !== formData.confirmPassword) {
			result.msg = '两次输入密码不一致'
			return result
		}
		result.status = true
		result.msg = 'nice'
		return result
	}
}

$(function () {
	page.init()
})
