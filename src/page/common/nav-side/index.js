require('./index.css')
var _ace = require('util/ace.js')
var templateIndex = require('./index.ace')
// 导航
var navSide = {
	option: {
		name: '',
		navList: [
			{
				name: 'my-ace',
				desc: '个人中心',
				href: './my-ace.html'
			},
			{
				name: 'order',
				desc: '我的订单',
				href: './order.html'
			},
			{
				name: 'my-evaluate',
				desc: '我的评价',
				href: './my-evaluate.html'
			},
			{
				name: 'about',
				desc: '关于ACE_Mall',
				href: './about.html'
			}
		]
	},

	init: function (option) {
		// 合并选项
		$.extend(this.option, option)
		this.renderNav()
	},
	// 渲染导航菜单
	renderNav: function () {
		// 计算 active 数据
		var _this = this
		this.option.navList.forEach(function (item, index) {
			if (item.name === _this.option.name) {
				item.isActive = true
			}
		})
		// 渲染 list
		var navHtml = _ace.renderHtml(templateIndex, {
			navList: this.option.navList
		})
		// 把html放入容器
		$('.nav-side').html(navHtml)
	}
}

module.exports = navSide
