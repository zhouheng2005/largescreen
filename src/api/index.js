import service from "@/plugin/axios.js";
import apiConfig from "@/api/config.js";
import axios from "axios";
axios.defaults.timeout = 60 * 1000 * 10;
const api = apiConfig.jsonUrl;

const common = {
  // 获取大屏数据
  getBigScreen: (params) => service.get("xxx后端给的api接口", { params }),

  // 本地接口单独配置访问
  // 全国json
  getChinaJson: (params) => get(api + "/map/china.json", { params }),
  // 获取省JSON
  getProvinceJson: (path, params) =>
    get(api + `/map/province/${path}.json`, { params }),
  // 获取市JSON
  getCityJson: (path, params) =>
    get(api + `/map/city/${path}.json`, { params }),
  // 获取县JSON
  getDistrictJson: (path, params) =>
    get(api + `/map/county/${path}.json`, { params }),
};

export function get(url, params) {
  return axios.get(url, { params }).then(checkStatus);
}

function checkStatus(response) {
  if (response.status === 200 || response.status === 304) {
    return response["data"];
  } else {
    throw new Error(response.data.message); // eslint-disable-line
  }
  throw new Error(response.statusText); // eslint-disable-line
}

export default {
  common,
};
