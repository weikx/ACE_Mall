require('./index.css')
require('page/common/footer/index.js')
require('page/common/nav-simple/index.js')
var md5 = require('util/md5.min')
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
	  // if (_ace.getCookie('Ticket')) {
	  //   // _ace.goHome()
    //   return
    // }
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
			oldPassword: $.trim($('#old-password').val()),
			newPassword: $.trim($('#new-password').val()),
      confirmPassword: $.trim($('#confirm-password').val())
		}
		// 表单验证结果
		var validateResult = this.formValidate(formData)
		if (validateResult.status) {
			// 登录
			fromError.hide()
      _user.updatePassword({
        oldPassword: md5(formData.oldPassword),
        password: md5(formData.newPassword)
      }, function (res) {
        alert('修改成功,请重新登录')
        _ace.logout()
        window.location.href = './login.html'
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
		if (!_ace.validate(formData.oldPassword, 'require')) {
			result.msg = '请输入旧密码'
			return result
		}
		if (!_ace.validate(formData.newPassword, 'require')) {
			result.msg = '请输入新密码'
			return result
		}
    if (formData.newPassword !== formData.confirmPassword) {
      result.msg = '两次新密码不一致'
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
