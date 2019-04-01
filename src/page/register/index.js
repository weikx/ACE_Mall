require('./index.css')
require('page/common/footer/index.js')
require('page/common/nav-simple/index.js')
var _ace = require('util/ace.js')
var _user = require('service/user-service.js')

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
			confirmPassword: $.trim($('#confirm-password').val()),
			email: $.trim($('#email').val()),
			receiveName: $.trim($('#receive-name').val()),
			receiveAddress: $.trim($('#receive-address').val()),
			receivePhone: $.trim($('#receive-phone').val())
		}
		// 表单验证结果
		var validateResult = this.formValidate(formData)
		if (validateResult.status) {
			// 注册
			fromError.hide()
			_user.register({
				email: formData.email,
				account: formData.username,
				password: formData.password,
				receiveName: formData.receiveName,
				receiveAddress: formData.receiveAddress,
				receivePhone: formData.receivePhone
			}, function (res) {
				console.log(res)
				// window.location.href = './result.html?type=register'
			})
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
		if (!_ace.validate(formData.email, 'email')) {
			result.msg = '请输入正确的邮箱地址'
			return result
		}
		if (!_ace.validate(formData.receiveName, 'require')) {
			result.msg = '请输入收货人姓名'
			return result
		}
		if (!_ace.validate(formData.receiveAddress, 'require')) {
			result.msg = '请输入收货地址'
			return result
		}
		if (!_ace.validate(formData.receivePhone, 'phone')) {
			result.msg = '请输入正确手机号'
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
