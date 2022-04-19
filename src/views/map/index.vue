<template>
  <div id="map-container">
    <div class="right-back">
      <button class="back" @click="back" v-if="deepTree.length > 1">
        返回
      </button>
      <div class="right-txt">
        下钻：单击地图要下钻的区域
      </div>
    </div>
    <div class="echarts">
      <div id="map"></div>
    </div>
  </div>
</template>

<script>
import { mapOption } from "@/config/mapOption";
export default {
  name: "china",
  components: {},
  props: {
    areaCode: {
      type: String,
      default: "000000",
    },
    areaLevel: {
      type: [String, Number],
      default: 0,
    },
    areaName: {
      type: String,
      default: "china",
    },
    // 当前地图上的地区名字
    mapNameList: {
      type: Array,
      default() {
        return [];
      },
    },
    // 当前地图上的地区Code
    mapCodeList: {
      type: Array,
      default() {
        return [];
      },
    },
    // 地区统计数据
    areaStatistic: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      chart: null, // 实例化echarts
      mapDataList: [], // 当前地图上的地区
      option: { ...mapOption.basicOption }, // map的相关配置
      deepTree: [], // 点击地图时push，点返回时pop
      areaStatisticMapValue: {}, // 地图数据value, 只是amounts
      areaStatisticMapData: {}, // 地图数据data,包含所有数据
      areaLevelMap: {
        country: 0,
        china: 0,
        province: 1,
        city: 2,
        district: 3,
      },
      tooltipAutoplay: null, // 提示框自动播放
      tooltipAutoplayIndex: 0, // 提示框自动播放index
    };
  },
  // beforeDestroy() {
  //   // if (!this.chart) {
  //   //   return
  //   // }
  //   // this.chart.dispose()
  //   // this.chart = null
  // },
  mounted() {
    this.$nextTick(() => {
      const that = this;
      that.initEcharts();
      that.chart.on("click", that.echartsMapClick);
      that.chart.on("mouseover", that.echartsMapMouseover);
      that.chart.on("mouseout", that.echartsMapMouseout);
      that.chart.on("geoRoam", function(params) {
        // console.log(JSON.stringify(params) + "****");
        var option = that.chart.getOption();
        if (params.zoom != null && params.zoom != undefined) {
          option.geo[0].zoom = option.series[0].zoom; //下层geo的缩放等级跟着上层的geo一起改变
          option.geo[0].center = option.series[0].center; //下层的geo的中心位置随着上层geo一起改变
        } else {
          //捕捉到拖曳时
          option.geo[0].center = option.series[0].center; //下层的geo的中心位置随着上层geo一起改变
        }
        that.chart.setOption(option, true);
      });
    });
  },
  watch: {
    areaStatistic: {
      handler(val) {
        var objValue = {},
          objData = {};
        for (var i = 0; i < val.length; i++) {
          objValue[val[i].areaCode] = val[i].amounts * 1;
          objData[val[i].areaCode] = val[i];
        }
        this.areaStatisticMapValue = objValue;
        this.areaStatisticMapData = objData;
        this.$nextTick(() => {
          this.initEcharts();
        });
      },
      immediate: true,
      deep: true,
    },
  },
  methods: {
    // 初次加载绘制地图
    initEcharts() {
      if (this.chart) {
        return;
      }
      //地图容器
      this.chart = this.$echarts.init(document.getElementById("map"));
      if (this.areaLevel === 0) {
        this.requestGetChinaJson();
      } else if (this.areaLevel === 1) {
        this.requestGetProvinceJSON({
          name: this.areaName,
          level: "province",
          adcode: this.areaCode.substr(0, 6),
        });
      } else if (this.areaLevel === 2) {
        this.requestGetCityJSON({
          name: this.areaName,
          level: "city",
          adcode: this.areaCode.substr(0, 6),
        });
      } else if (this.areaLevel === 3) {
        this.requestGetDistrictJSON({
          name: this.areaName,
          level: "district",
          adcode: this.areaCode.substr(0, 6),
        });
      } else {
        return false;
      }
    },
    // 地图点击
    echartsMapClick(params) {
      this.$emit("update:areaCode", params.data.adcode + "000000");
      this.$emit("update:areaName", params.data.name);
      this.$emit("update:areaLevel", this.areaLevelMap[params.data.level]);
      if (params.data.level === "province") {
        this.requestGetProvinceJSON(params.data);
      } else if (params.data.level === "city") {
        this.requestGetCityJSON(params.data);
      } else if (
        params.data.level === "district" &&
        this.mapDataList.length > 1
      ) {
        this.requestGetDistrictJSON(params.data);
      } else {
        return false;
      }
    },
    //绘制全国地图areaStatistic
    async requestGetChinaJson() {
      const that = this;
      try {
        const res = await that.$apis.common.getChinaJson();
        this.$emit("update:areaLevel", 0);
        this.setJsonData(res);
      } catch (e) {
        console.log(e);
      }
    },
    // 加载省级地图
    async requestGetProvinceJSON(params) {
      const that = this;
      try {
        const res = await that.$apis.common.getProvinceJson(params.adcode);
        this.$emit("update:areaLevel", 1);
        this.setJsonData(res, params);
      } catch (e) {
        console.log(e);
      }
    },
    // 加载市级地图
    async requestGetCityJSON(params) {
      const that = this;
      try {
        const res = await that.$apis.common.getCityJson(params.adcode);
        this.$emit("update:areaLevel", 2);
        this.setJsonData(res, params);
      } catch (e) {
        console.log(e);
      }
    },
    // 加载县级地图
    async requestGetDistrictJSON(params) {
      const that = this;
      try {
        const res = await that.$apis.common.getDistrictJson(params.adcode);
        this.$emit("update:areaLevel", 3);
        this.setJsonData(res, params);
      } catch (e) {
        console.log(e);
      }
    },
    // 设置数据
    setJsonData(res, params) {
      var mapDataList = [];
      var mapNameList = [];
      var mapCodeList = [];
      for (var i = 0; i < res.features.length; i++) {
        var obj = {
          ...res.features[i].properties,
          value: this.areaStatisticMapValue[res.features[i].properties.adcode]
            ? this.areaStatisticMapValue[res.features[i].properties.adcode]
            : 0,
          valueData: this.areaStatisticMapData[
            res.features[i].properties.adcode
          ]
            ? this.areaStatisticMapData[res.features[i].properties.adcode]
            : 0,
        };
        mapDataList.unshift(obj);
        mapNameList.unshift(res.features[i].properties.name);
        mapCodeList.unshift(res.features[i].properties.adcode + "000000");
      }
      this.mapDataList = mapDataList;
      this.$emit("update:mapNameList", mapNameList);
      this.$emit("update:mapCodeList", mapCodeList);
      this.setMapData(res, params);
    },
    // 设置地图信息
    setMapData(res, params) {
      if (this.areaName === "china") {
        this.deepTree = [];
        this.deepTree.push({
          mapDataList: this.mapDataList,
          params: { name: "china", level: "country", adcode: "100000" },
        });
        //注册地图
        this.$echarts.registerMap("china", res);
        //绘制地图
        this.renderMap("china", this.mapDataList);
      } else {
        if (this.deepTree.length - 1 == this.areaLevel) {
          this.deepTree[this.areaLevel] = {
            mapDataList: this.mapDataList,
            params: params,
          };
        } else {
          this.deepTree.push({ mapDataList: this.mapDataList, params: params });
        }
        this.$echarts.registerMap(params.name, res);
        this.renderMap(params.name, this.mapDataList);
      }
    },
    // 渲染地图
    renderMap(map, data) {
      var mapDataList = data.map((item) => {
        return {
          name: item.name,
          value: item.value,
        };
      });
      mapDataList = mapDataList.sort(function(a, b) {
        return b.value - a.value;
      });
      var pointData = [];
      for (var i = 0; i < data.length; i++) {
        if (data[i].value != 0) {
          pointData.push({
            ...data[i],
            value: [data[i].center[0], data[i].center[1], data[i].value],
          });
        }
      }
      // 设置左下角数量范围值
      this.option.visualMap.min =
        mapDataList.length > 1 ? mapDataList[mapDataList.length - 2].value : 0;
      this.option.visualMap.max =
        mapDataList.length > 0 ? mapDataList[0].value : 0;
      // 设置左上角当前位置
      this.option.title[0].text =
        map === "china" ? "全国企惠商户分布数据" : map + "企惠商户分布数据";
      this.option.geo = {
        show: false,
        map: map,
        zoom: 1.2, //当前视角的缩放比例
        roam: true, //是否开启平游或缩放
        center: undefined,
      };
      this.option.series = [
        {
          name: map,
          mapType: map,
          zoom: 1, //当前视角的缩放比例
          roam: true, //是否开启平游或缩放
          center: undefined,
          scaleLimit: {
            //滚轮缩放的极限控制
            min: 0.5,
            max: 10,
          },
          ...mapOption.seriesOption,
          data: data,
        },
        {
          name: "散点", //series名称
          type: "effectScatter", //散点类型
          coordinateSystem: "geo", // series坐标系类型
          rippleEffect: {
            brushType: "fill",
          },
          normal: {
            show: true,
            // 提示内容
            formatter: (params) => {
              return params.name;
            },
            position: "top", // 提示方向
            color: "#fff",
          },
          emphasis: {
            show: true, // 点
          },
          itemStyle: {
            normal: {
              color: "#F4E925",
              shadowBlur: 10,
              shadowColor: "#000",
            },
          },
          // symbol:'pin', // 散点样式'pin'（标注）、'arrow'（箭头）
          data: pointData,
          symbolSize: function(val) {
            // return val[2] / 100;
            if (val[2] === mapDataList[0].value) {
              return 10;
            }
            return 6;
          },
          showEffectOn: "render", //加载完毕显示特效
        },
      ];
      //渲染地图
      this.chart.setOption(this.option, true);
      this.setTooltipAutoplay();
    },
    // 地图鼠标移入事件
    echartsMapMouseover() {
      clearInterval(this.tooltipAutoplay);
    },
    // 地图鼠标移出事件
    echartsMapMouseout() {
      this.setTooltipAutoplay();
    },
    // 动态显示tooltip
    setTooltipAutoplay() {
      clearInterval(this.tooltipAutoplay);
      // var index = 0; //播放所在下标
      // if(this.chart.dispatchAction) {
      this.tooltipAutoplay = setInterval(() => {
        this.chart.dispatchAction({
          type: "showTip",
          seriesIndex: 0,
          dataIndex: this.tooltipAutoplayIndex,
        });
        this.tooltipAutoplayIndex++;
        if (this.tooltipAutoplayIndex >= this.mapDataList.length) {
          this.tooltipAutoplayIndex = 0;
          this.setTooltipAutoplay();
        }
      }, 6666);
      // }
    },
    // 返回
    back() {
      if (this.deepTree.length > 1) {
        this.deepTree.pop();
        this.mapDataList = this.deepTree[this.deepTree.length - 1].mapDataList;
        let areaName = this.deepTree[this.deepTree.length - 1].params.name;
        let areaCode = this.deepTree[this.deepTree.length - 1].params.adcode;
        let areaLevel = this.deepTree[this.deepTree.length - 1].params.level;
        let mapNameList = this.mapDataList.map((item) => {
          return item.name;
        });
        let mapCodeList = this.mapDataList.map((item) => {
          return item.adcode + "000000";
        });
        this.$emit(
          "update:areaCode",
          (areaCode === "100000" ? "000000" : areaCode) + "000000"
        );
        this.$emit("update:areaName", areaName);
        this.$emit("update:areaLevel", this.areaLevelMap[areaLevel]);
        this.$emit("update:mapNameList", mapNameList);
        this.$emit("update:mapCodeList", mapCodeList);
        this.renderMap(areaName, this.mapDataList);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
#map-container {
  width: 900px;
  height: 720px;
  padding: 10px;
  position: relative;

  .echarts {
    height: 100%;

    #map {
      width: 100%;
      height: 100%;
    }
  }
  .right-back {
    position: absolute;
    top: 55px;
    left: 25px;
    z-index: 9;
    .back {
      margin-bottom: 10px;
      color: #24cff4;
      font-weight: bolder;
    }
    .right-txt {
      color: #fff;
      font-weight: bolder;
    }
  }
}
</style>
