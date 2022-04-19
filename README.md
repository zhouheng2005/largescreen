## 一、项目描述

- 一个基于 Vue、Datav、Echart 框架的 " **数据大屏项目** "，通过 Vue 组件实现数据动态刷新渲染，内部图表可实现自由替换。部分图表使用 DataV 自带组件，可进行更改，详情请点击下方 DataV 文档。
- 项目需要全屏展示（按 F11）。
- 项目部分区域使用了全局注册方式，增加了打包体积，在实际运用中请使用 **按需引入**。
- 拉取项目之后，建议按照自己的功能区域重命名文件，现以简单的位置进行区分。
- 项目环境：Vue-cli-5.0.1、DataV-2.10.0、Echarts-4.6.0(如果5.x版本有问题，请切换到4.x版本)。
- 请拉取 master 分支的代码，其余分支是开发分支。
- 需要其它图表样式数据请查看echarts官方文档
相关链接：
1.  [Vue 官方文档](https://cn.vuejs.org/v2/guide/instance.html)
2.  [DataV 官方文档](http://datav.jiaminghi.com/guide/)
3.  [echarts 实例](https://echarts.apache.org/examples/zh/index.html)，[echarts API 文档](https://echarts.apache.org/zh/api.html#echarts)

## 二、项目目录文件介绍

| 文件                | 作用/功能                                                              |
| ------------------- | --------------------------------------------------------------------- |

```
.
├── public                           # 百度地图json以及h5HTML配置以及浏览器ico图标
├── src                           
│   ├──api                           # 接口相关设置
│   │   ├── config.js                # 相关域名配置
│   │   └── index.js                 # 接口url方法设置
│   ├──assets                        # 全局scss以及图片
│   ├──common/...                    # 全局封装的 ECharts 和 flexible 插件代码（适配屏幕尺寸，可定制化修改
│   ├──config/...                    # 全局封装的map的相关配置
│   ├──plugin/...                    # 全局封装的axios的接口请求封装
│   ├──router/...                    # 全局封装的router的路由封装
│   ├──store/...                     # 全局封装的vuex的store状态（数据）管理封装
│   ├──utils/...                     # 页面适配、图表适配、数据
│   ├──views                         # 主要文件
│   │   ├── basicdata/...            # 基础数据子组件、饼图封装
│   │   ├── map/...                  # 平台商户分布数据子组件、中国地图封装
│   │   ├── member/...               # 平台会员数据子组件、饼图图表封装
│   │   ├── orderdata/...            # 平台订单数据子组件、柱形图表封装
│   │   ├── realtime/...             # 平台订单实时数据子组件封装
│   │   ├── salesvolume/...          # 平台销售额统计数据子组件、柱形图表封装
│   │   ├── shoptype/...             # 平台商户类型统计子组件、饼图图表封装
│   │   ├── index                    # 主页
│   │   └── logistics_map            # 物流地图
│   ├──App.Vue                       # 主应用组件
│   └──main.js                       # 入口文件 
├── babel.config.js                  # Babel相关配置文件
├── package.json                     # 引入第三方npm包
│......
└──vue.config.js                     # build相关代理webpack相关配置文件 
```

## 三、使用介绍

### 启动项目

- 需要提前安装好 `nodejs` 与 `yarn`
- 下载项目后在项目主目录下运行 `yarn` 拉取依赖包。
- 安装完依赖包之后然后使用 `vue-cli` 或者直接使用命令`npm run serve`，
- 就可以启动项目，启动项目后需要手动全屏（按 F11）。
- 如果编译项目的时候提示没有 DataV 框架的依赖，
- 输入 `npm install @jiaminghi/data-view` 或者 `yarn add @jiaminghi/data-view` 进行手动安装。

### 封装组件渲染图表

所有的 ECharts 图表都是基于 `common/echart/index.vue` 封装组件创建的，已经对数据和屏幕改动进行了监听，能够动态渲染图表数据和大小。在监听窗口小大的模块，使用了防抖函数来控制更新频率，节约浏览器性能。

项目配置了默认的 ECharts 图表样式，文件地址：`common/echart/theme.json`。

封装的渲染图表组件支持传入以下参数，可根据业务需求自行添加/删除。

参数名称              | 类型      | 作用/功能                      |
| -------------------| --------- | ------------------------------|
| id                 | String    | 唯一 id，渲染图表的节点（非必填，使用了 $el）|
| className          | String    | class样式名称（非必填）                 |
| options            | Object    | ECharts 配置（必填）                   |
| height             | String    | 图表高度（建议填）                    |
| width              | String    | 图表宽度（建议填）                    |

### 动态渲染图表

动态渲染图表案例为 `components` 目录下各个图表组件，index 文件负责数据获取和处理，chart 文件负责监听和数据渲染。

chart 文件的主要逻辑为：

```html
<template>
  <div>
    <Echart :options="options" id="id" height="height" width="width" ></Echart>
  </div>
</template>

<script>
  // 引入封装组件
import Echart from '@/common/echart'
export default {
  // 定义配置数据
  data(){ return { options: {}}},
  // 声明组件
  components: { Echart},
  // 接收数据
  props: {
    cdata: {
      type: Object,
      default: () => ({})
    },
  },
  // 进行监听，也可以使用 computed 计算属性实现此功能
  watch: {
    cdata: {
      handler (newData) {
        this.options ={
          // 这里编写 ECharts 配置
        }
      },
      // 立即监听
      immediate: true,
      // 深度监听
      deep: true
    }
  }
};
</script>
```
### 更换边框

边框是使用了 DataV 自带的组件，只需要去 views 目录下去寻找对应的位置去查找并替换就可以，具体的种类请去 DavaV 官网查看
如：

```html
<dv-border-box-1></dv-border-box-1>
<dv-border-box-2></dv-border-box-2>
<dv-border-box-3></dv-border-box-3>
```

### Mixins 解决自适应适配功能

使用 mixins 注入解决了界面大小变动图表自适应适配的功能，函数在 `utils/resizeMixins.js` 中，应用在 `common/echart/index.vue` 的封装渲染组件，主要是对 `this.chart` 进行了功能注入。