# ACE_Mall 前端项目

### [预览 ACE_Mall](http://meigeni.cn "ACE_Mall")


### 目录结构

``` README
├─── src                                 // 资源目录
│     ├─── image                         // 图片资源
│     ├─── page                          // 页面文件 (.js .css .ace)
│     │     ├─── xxxx                    // (对应下方 view 文件夹页面)
│     │     │     └─── xxx.xxx
│     │     └─── common                  // 公共组件 (webpack 会打包到页面上)
│     │            └─── layout.css       // 全局样式
│     ├─── service                       // 接口请求集合
│     │     ├─── goods-service.js        // 商品接口集合
│     │     ├─── order-service.js        // 订单接口集合
│     │     └─── user-service.js         // 用户接口集合
│     ├─── util
│     │     └─── ace.js                  // 公用方法
│     └─── view                          // 页面模板
│           ├─── layout                  // 公用模板 (webpack 会打包到页面上)
│           │      ├─── footer.html      // 页脚模板
│           │      ├─── head-common.html // seo相关
│           │      ├─── nav.html         // 顶部白色分类模板
│           │      ├─── nav-side.html    // 个人中心左侧 side 模板
│           │      └─── nav-simple.html  // 顶部黑色导航模板
│           ├─── cart.html               // 购物车
│           ├─── checkout.html           // 结算页
│           ├─── goods-detail.html       // 商品详情
│           ├─── goods-list.html         // 商品列表
│           ├─── index.html              // 首页
│           ├─── login.html              // 登录
│           ├─── my-ace.html             // 个人中心
│           ├─── order.html              // 订单
│           ├─── order-detail.html       // 订单详情
│           ├─── pay.html                // 支付
│           ├─── register.html           // 注册
│           └─── result.html             // 无用
├─── README.md                           // README
├─── webpack.config.js                   // webpack 配置文件
└─── package.json                        // 依赖配置文件

```
### 技术栈
> * HTML
> * CSS
> * JS
> * jQuery
> * webpack
    ```
       webpack 是一个模块打包器。webpack 的主要目标是将 JavaScript 文件打包在一起，打包后的文件用于在浏览器中使用，但它也能够胜任转换(transform)、打包(bundle)或包裹(package)任何资源(resource or asset)。
    ```
> * Hogan.js
    ```
       Hogan.js is a 3.4k JS templating engine developed at Twitter. Use it as a part of your asset packager to compile templates ahead of time or include it in your browser to handle dynamic templates.
    ```

### 运行
```bash
    cd ACE_Mall
    npm install         // 安装项目依赖 需 nodejs
    npm run dev         // mac 运行
    npm run dev_win     // windows 运行
    npm run build       // mac 打包
    npm run build_win   // windows 打包
```
