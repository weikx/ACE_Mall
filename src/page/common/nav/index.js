require('./index.css')
var _ace = require('util/ace.js')
var templateIndex = require('./index.ace')
var _goods = require('service/goods-service.js')
// 导航
var navList = {
	option: {
		categoryId: '',
		navList: [
			{
				categoryId: 'home',
				categoryName: '首页',
				href: './index.html'
			}
		]
	},

	init: function (option) {
		// 合并选项
		$.extend(this.option, option)
		this.getGoodsCategory()
	},
	// 渲染导航菜单
	renderNav: function () {
		// 计算 active 数据
		var _this = this
		this.option.navList.forEach(function (item, index) {
			if (item.categoryId == _this.option.categoryId) {
				item.isActive = true
			}
		})
		// 渲染 list
		var navHtml = _ace.renderHtml(templateIndex, {
			navList : this.option.navList
		})
		// 把html放入容器
		$('.nav-wrap .nav-list').html(navHtml)
	},

	getGoodsCategory: function () {
		var _this = this
		_goods.getGoodsCategory(function (res) {
			res.forEach(function (item) {
				item.href = './goods-list.html'
				navList.option.navList.push(item)
			})
			_this.renderNav()
		})
	}
}

module.exports = navList
