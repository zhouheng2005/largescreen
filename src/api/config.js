const CONFIG = {
	//开发环境配置
	development: { 
		baseUrl: "/api/",//vue.config.js本地服务订阅的跨域解决
		jsonUrl:"",
	},
	//测试环境配置
	test: {
		baseUrl: "",//你的测试访问域名
		jsonUrl:"",//服务器访问地址就是打包之后放地图json的地址
	},
	//生产环境配置
	production: {
		baseUrl: "",//你的正式访问域名
		jsonUrl:"",//服务器访问地址就是打包之后放地图json的地址
	}
}
export default CONFIG[process.env.NODE_ENV];
