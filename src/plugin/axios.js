import axios from "axios";
import apiConfig from "@/api/config.js";
import notification from 'ant-design-vue/es/notification';
// 创建 axios 实例
const service = axios.create({
  baseURL: apiConfig.baseUrl, // api base_url
  timeout: 100000, // 请求超时时间
});

const err = (error) => {
  if (error.response) {
    const data = error.response.data;
    if (error.response.status === 403) {
      notification.error({
        message: "禁止访问",
        description: data.message,
      });
    } else if (
      error.response.status === 401 &&
      !(data.result && data.result.isLogin)
    ) {
      notification.error({
        message: "非法请求",
        description: "授权验证失败",
      });
    } else {
      notification.error({
        message: `系统出错，请查看控制台`,
        description: error.response.data.msg,
      });
    }
  }
  return Promise.reject("您请求的太快了，歇会吧！~");
};

// request interceptor
service.interceptors.request.use((config) => {
  if (config.headers && config.headers.isDirect == true) {
    return config;
  }
  if (config.method === "get" || config.method === "GET") {
    if (config.params) {
      config.params = config.params  //如需要对数据加密自行根据后端配合加密数据传送;
    }
  }
  if (
    config.method === "post" ||
    config.method === "POST" ||
    config.method === "put" ||
    config.method === "PUT" ||
    config.method === "DELETE" ||
    config.method === "delete"
  ) {
    if (config.data) {
      if (config.headers["Content-Type"] == "multipart/form-data") {
        // eslint-disable-next-line no-self-assign
        config.data = config.data;
      } else {
        config.data = config.data; //如需要对数据加密自行根据后端配合加密数据传送;
      }
    }
  }
  return config;
}, err);

// response interceptor
service.interceptors.response.use((response) => {
  const _data = response.data;
  if (_data.code > 200 && _data.code < 2000) {
    if (_data.code === 401 || _data.code === 403 || _data.code === 440) {
      console.log("退出登录");
    } else if (_data.code != 404) {
      notification.error({
        message: `很抱歉，您的请求失败！`,
        description: `原因：${_data.msg}`,
      });
    }
  }
  return _data;
}, err);

export default service;
