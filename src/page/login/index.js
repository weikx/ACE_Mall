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
    if (_ace.getCookie('Ticket')) {
      _ace.goHome()
      return
    }
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
      password: md5($.trim($('#password').val()))
    }
    // 表单验证结果
    var validateResult = this.formValidate(formData)
    if (validateResult.status) {
      // 登录
      fromError.hide()
      _user.login({
        account: formData.username,
        password: formData.password
      }, function (res) {
        res = res[0]
        _ace.setUserInfo(res)
        _ace.setCookie('Ticket', res.Ticket)
        window.location.href = _ace.getUrlPatam('redirect') || './index.html'
      })
    } else {
      fromError.show(validateResult.msg)
    }
  },
  // 表单字段验证
  formValidate: function (formData) {
    var result = {
      status: false,
      msg: ''
    }
    if (!_ace.validate(formData.username, 'require')) {
      result.msg = '请输入用户名'
      return result
    }
    if (!_ace.validate(formData.password, 'require')) {
      result.msg = '请输入密码'
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
