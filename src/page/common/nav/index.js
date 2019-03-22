require('./index.css')
var _ace = require('util/ace.js')
var templateIndex = require('./index.ace')
// 导航
var navList = {
	option: {
		name: '',
		navList: [
			{
				name: 'home',
				desc: '首页',
				href: './index.html'
			},
			{
				name: 'all',
				desc: '所有产品',
				href: './goods-list.html'
			},
			{
				name: 'fearless',
				desc: '无畏系列',
				href: './goods-list.html'
			},
			{
				name: 'logo',
				desc: 'A.C.E.LOGO系列',
				href: './goods-list.html'
			},
			{
				name: 'cuban',
				desc: 'CUBAN系列',
				href: './goods-list.html'
			},
			{
				name: 'tennis',
				desc: 'TENNIS系列',
				href: './goods-list.html'
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
			console.log(item)
			if (item.name === _this.option.name) {
				item.isActive = true
			}
		})
		// 渲染 list
		var navHtml = _ace.renderHtml(templateIndex, {
			navList : this.option.navList
		})
		// 把html放入容器
		$('.nav-wrap .nav-list').html(navHtml)
	}
}

module.exports = navList
