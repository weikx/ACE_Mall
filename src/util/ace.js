var HTTP_OK = 0 // http ok
var HTTP_FAIL = 1 // http fail
var NO_LOGIN = 2 // 未登录
var Hogan = require('hogan.js')
var cof = {
	serverHost: 'http://192.168.0.143:60391/'
}
var _ace = {
	request: function (param) {
		// 网络请求
		var _this = this
		$.ajax({
			type: param.method || 'get',
			url: param.url || '',
			dataType: param.type || 'json',
			data: param.data || '',
			headers: {
				Authorization: _ace.getCookie('Ticket')
			},
			success: function (res) {
				if (res.status === HTTP_OK) {
					param.success && param.success(res.data)
				} else if (res.status == NO_LOGIN) {
					_this.toLogin()
				} else {
					_this.errorTips(res.message)
					param.error && param.error(res)
				}
			},
			error: function (err) {
				_this.errorTips(err.statusText)
				param.error && param.error(err.statusText)
			}
		})
	},

	toLogin: function () {
		// 登录处理
		window.location.href = './login.html?redirect=' + encodeURIComponent(window.location.href)
	},

	getUrlPatam: function (name) {
		// 获取地址栏参数
		var reg = new RegExp('(^|&)'+ name + '=([^&]*)(&|$)')
		var result = window.location.search.substr(1).match(reg)
		return result ? decodeURIComponent(result[2]) : null
	},

	renderHtml: function (htmlTemplate, data) {
		// 渲染html模板
		var template = Hogan.compile(htmlTemplate),
			result = template.render(data)
		return result
	},

	successTips: function (msg) {
		// 成功提示
		alert(msg || '操作成功')
	},

	errorTips: function (msg) {
		// 错误提示
		alert(msg || '出了一些问题～')
	},

	validate: function (value, type) {
		// 字段验证，支持非空，手机，邮箱的判断
		var value = $.trim(value)
		switch (type) {
			case 'require':
				return !!value
			break
			case 'phone':
				return /^1\d{10}$/.test(value)
			break
			case 'email':
				return /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/.test(value)
			break
		}
	},

	goHome: function () {
		// 返回首页
		window.location.href = './index.html'
	},

	getServerUrl: function (path) {
		return cof.serverHost + path
	},

	setUserInfo: function (userInfo) {
		localStorage.setItem('userInfo', JSON.stringify(userInfo))
	},

	logout: function () {
		localStorage.clear()
    _ace.delCookie('Ticket')
	},

	getUserInfo: {
		info: function () {
			var userInfo = localStorage.getItem('userInfo')
			return JSON.parse(userInfo)
		},

		id: function () {
			return this.info() && this.info().id || 0
		},

		name: function () {
			return this.info().receiveName
		}
	},
  
  setCookie: function (name, value) {
    const Days = 1,
      exp = new Date()
    exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000)
    document.cookie = name + '=' + escape (value) + ';expires=' + exp.toGMTString()
  },
  
  getCookie: function (name) {
    let arr,
      reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)')
    if(arr = document.cookie.match(reg))
      return 'BasicAuth ' + unescape(arr[2])
    else
      return ''
  },
  
  delCookie: function (name) {
    var exp = new Date()
    exp.setTime(exp.getTime() - 1)
    var cval = _ace.getCookie(name)
    if(cval != null)
      document.cookie = name + '=' + cval + ';expires=' + exp.toGMTString()
  },

  showTip: function () {
    var tipHtml = '<div></div>'
  }
}

module.exports = _ace
