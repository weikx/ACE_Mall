var HTTP_OK = 0 // http ok
var HTTP_FAIL = 1 // http fail
var NO_LOGIN = 10 // 未登录
var Hogan = require('hogan.js')
var _ace = {
	request: function (param) {
		// 网络请求
		var _this = this
		$.ajax({
			type: param.method || 'get',
			url: param.url || '',
			dataType: param.type || 'json',
			data: param.data || '',
			success: function (res) {
				if (res.status === HTTP_OK) {
					param.success && param.success(res.data)
				} else if (res.status == NO_LOGIN) {
					_this.toLogin()
				} else if (res.status == HTTP_FAIL) {
					param.error && param.error(res)
				}
			},
			error: function (err) {
				param.error && param.error(err)
			}
		})
	},
	toLogin: function () {
		// 登录处理
		window.location.href = './login.html?redirect=' + encodeURIComponent(window.location.href)
	},
	getUrlPatam: function (name) {
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
		alert(msg || '错了一些问题～')
	},
	validate: function (value, type) {
		// 字段验证，支持非空，手机，邮箱的判断
		var value = $.trim(value)
		switch (value) {
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
	}
}

module.exports = _ace
