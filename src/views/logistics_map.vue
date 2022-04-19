<template>
  <div class="map-box">
    <a-spin :spinning="spinning">
      <div id="amap" class="amap"></div>
      <div class="info">
        <div class="input-item">
          <a-input
            id="tipinput"
            placeholder="检索关键字定位"
            autocomplete="off"
          />
        </div>
      </div>
    </a-spin>
  </div>
</template>
<script>
import { Input, Button, Spin } from "ant-design-vue";
import iconDelivery from "@/assets/icon_delivery.gif";
export default {
  components: {
    AInput: Input,
    AButton: Button,
    ASpin: Spin,
  },
  data() {
    return {
      spinning: false,
      iconDelivery, // 骑手图片
      map: null, // 地图对象
      oldLabelsLayer: null, // 全部标记图标
      autocomlete: null, // 搜索
      searchlLabelsLayer: null, // 上个搜索定位标记图标
    };
  },
  props: {
    mapData: {
      type: Object,
      default: () => ({}),
    },
  },
  mounted() {
    this.init();
  },
  methods: {
    // 地图初始化
    init() {
      let that = this;
      if (that.map !== null) {
        that.clearAll();
      }
      // 地图实例对象 （amap 为容器的id）
      that.map = new AMap.Map("amap", {
        zoom: 15, //设置地图显示的缩放级别
        resizeEnable: true,
        expandZoomRange: true,
        pitch: 60,
        center: [117.95751, 28.42302], //设置地图中心点坐标
      });
      // 在图面添加工具条控件，工具条控件集成了缩放、平移、定位等功能按钮在内的组合控件
      AMap.plugin(["AMap.ToolBar"], function() {
        that.map.addControl(
          new AMap.ToolBar({
            // 简易缩放模式，默认为 false
            liteStyle: true,
          })
        );
      });
      that.loadAutocomlete();
    },
    // 搜索定位
    loadAutocomlete() {
      const that = this;
      that.autocomlete = new AMap.Autocomplete({
        city: "全国",
        citylimit: true,
        datatype: "poi",
        input: "tipinput",
      });
      AMap.event.addListener(that.autocomlete, "select", function(data) {
        let points = [data.poi.location.lng, data.poi.location.lat];
        that.map.setZoom(15);
        that.map.setCenter(points);
        that.loadAutocomleteIcon([
          data.poi.location.lng,
          data.poi.location.lat,
        ]);
      });
      that.addLabelMarker(that.mapData);
    },
    loadAutocomleteIcon(lng_lat) {
      var labelMarker = new AMap.LabelMarker({
        name: "搜索定位",
        position: lng_lat,
        zIndex: 16,
        icon: {
          type: "image", // 图标类型，现阶段只支持 image 类型
          image: "https://a.amap.com/jsapi_demos/static/images/poi-marker.png", // 图片url
          clipOrigin: [718, 8],
          clipSize: [50, 68],
          size: [25, 34], // 图片尺寸
          anchor: "center", // 图片相对 position 的锚点，默认为 bottom-center
          retina: true,
        }, // 将第一步创建的 icon 对象传给 icon 属性
      });
      // 创建 LabelsLayer
      var labelsLayer = new AMap.LabelsLayer({
        zooms: [3, 20],
        zIndex: 1000,
        collision: false, // 该层内标注是否避让
        animation: true, // 开启标注淡入动画，默认为开启，v1.4.15 新增属性
      });
      // 将已创建的 LabelMarker 添加到 LabelsLayer 上
      labelsLayer.add(labelMarker);
      // 删除上一个标记点
      if (this.searchlLabelsLayer) {
        this.map.remove(this.searchlLabelsLayer);
      }
      this.searchlLabelsLayer = labelsLayer;
      // 将 LabelsLayer 添加到地图实例
      this.map.add(labelsLayer);
    },
    // 海量点标记
    addLabelMarker(list) {
      // 创建 LabelMarker
      // 设置骑手图标对象
      var riderIcon = {
        type: "image", // 图标类型，现阶段只支持 image 类型
        image: this.iconDelivery, // 图片url
        size: [50, 42], // 图片尺寸
        anchor: "center", // 图片相对 position 的锚点，默认为 bottom-center
        retina: true,
      };
      // 设置卖家图标对象
      var sellerIcon = {
        type: "image", // 图标类型，现阶段只支持 image 类型
        image: "https://a.amap.com/jsapi_demos/static/images/poi-marker.png", // 图片url
        clipOrigin: [18, 8],
        clipSize: [50, 68],
        size: [25, 34], // 图片尺寸
        anchor: "center", // 图片相对 position 的锚点，默认为 bottom-center
        retina: true,
      };
      // 设置买家图标对象
      var buyerIcon = {
        type: "image", // 图标类型，现阶段只支持 image 类型
        image: "https://a.amap.com/jsapi_demos/static/images/poi-marker.png", // 图片url
        clipOrigin: [195, 8],
        clipSize: [50, 68],
        size: [25, 34], // 图片尺寸
        anchor: "center", // 图片相对 position 的锚点，默认为 bottom-center
        retina: true,
      };
      // 设置骑手文字对象
      var riderText = {
        // content: '骑手信息', // 要展示的文字内容
        direction: "top", // 文字方向，有 icon 时为围绕文字的方向，没有 icon 时，则为相对 position 的位置
        // 文字样式
        style: {
          fontSize: 14, // 字体大小
          padding: "2, 4",
          fillColor: "#ffffff", // 字体颜色
          backgroundColor: "#000000", // 字体背景颜色
        },
      };
      // 设置卖家文字对象
      var sellerText = {
        // content: '卖家信息', // 要展示的文字内容
        direction: "top", // 文字方向，有 icon 时为围绕文字的方向，没有 icon 时，则为相对 position 的位置
        // 文字样式
        style: {
          fontSize: 14, // 字体大小
          padding: "2, 4",
          fillColor: "#ffffff", // 字体颜色
          backgroundColor: "#b1009b", // 字体背景颜色
        },
      };
      // 设置买家文字对象
      var buyerText = {
        // content: '买家信息', // 要展示的文字内容
        direction: "top", // 文字方向，有 icon 时为围绕文字的方向，没有 icon 时，则为相对 position 的位置
        // 文字样式
        style: {
          fontSize: 14, // 字体大小
          padding: "2, 4",
          fillColor: "#ffffff", // 字体颜色
          backgroundColor: "#22884f", // 字体背景颜色
        },
      };
      // 创建 LabelMarker 实例
      var labelMarker = [];
      // 骑手信息
      if (0 < list.expressmanlist.length) {
        list.expressmanlist.forEach((item) => {
          labelMarker.push(
            new AMap.LabelMarker({
              name: item.eid,
              position: [
                item.locations.split(",")[0],
                item.locations.split(",")[1],
              ],
              zIndex: 16,
              icon: riderIcon, // 将第一步创建的 icon 对象传给 icon 属性
              text: {
                ...riderText,
                content: "骑手：" + item.name + "(" + item.mobile + ")",
              }, // 将第二步创建的 text 对象传给 text 属性
            })
          );
        });
      }
      if (0 < list.orderlist.length) {
        list.orderlist.forEach((item) => {
          // 卖家信息
          labelMarker.push(
            new AMap.LabelMarker({
              name: item.shop_info.cid,
              position: [item.shop_info.lng, item.shop_info.lat],
              zIndex: 16,
              icon: sellerIcon, // 将第一步创建的 icon 对象传给 icon 属性
              text: {
                ...sellerText,
                content:
                  item.shop_info.shop_name +
                  "(" +
                  this.calculateOrder(list.orderlist, item.shop_info.cid) +
                  ")单",
              }, // 将第二步创建的 text 对象传给 text 属性
            })
          );
          // 买家信息
          labelMarker.push(
            new AMap.LabelMarker({
              name: item.eid,
              position: [item.lng, item.lat],
              zIndex: 16,
              icon: buyerIcon, // 将第一步创建的 icon 对象传给 icon 属性
              text: {
                ...buyerText,
                content:
                  item.shop_info.shop_name +
                  "#" +
                  item.name +
                  "(" +
                  item.mobile +
                  ")",
              }, // 将第二步创建的 text 对象传给 text 属性
            })
          );
        });
      }
      var labelsLayer = new AMap.LabelsLayer({
        zooms: [3, 20],
        zIndex: 1000,
        collision: false, // 该层内标注是否避让
        animation: true, // 开启标注淡入动画，默认为开启，v1.4.15 新增属性
      });
      labelsLayer.add(labelMarker);
      // 先删除原来的标记点
      if (this.oldLabelsLayer) {
        this.map.remove(this.oldLabelsLayer);
      }
      this.oldLabelsLayer = labelsLayer;
      this.map.add(labelsLayer);
    },
    // 计算当前商家订单数量
    calculateOrder(list, cid) {
      var number = 0;
      list.forEach((item) => {
        if (item.shop_info.cid == cid) {
          number += 1;
        }
      });
      return number;
    },
    // 销毁地图
    clearAll() {
      this.map.clearMap();
      this.map.destroy();
      this.oldLabelsLayer = null;
      this.autocomlete = null;
      this.searchlLabelsLayer = null;
    },
  },
  watch: {
    mapData: {
      handler(newData) {
        if (this.map) {
          this.addLabelMarker(newData);
        }
        //  this.addLabelMarker(newData); // 海量点标记
      },
      immediate: true,
      deep: true,
    },
  },
};
</script>
<style lang="scss" scoped>
.map-box {
  width: 1888px;
  height: 900px;
  text-align: center;
  box-sizing: border-box;
  position: relative;
  .but {
    position: absolute;
    left: 30px;
    top: 40px;
    z-index: 99;
  }
  // 定位搜索
  .info {
    position: absolute;
    right: 30px;
    top: 40px;
    width: 400px;
    .input-item {
      position: relative;
      display: flex;
      -ms-flex-wrap: wrap;
      flex-wrap: wrap;
      -ms-flex-align: center;
      align-items: center;
      width: 100%;
      padding: 10px;
      border-radius: 10px;
      border: 0;
      background-color: #fff;
    }
  }
  .amap {
    position: absolute;
    margin-top: 26px;
    margin-left: 20px;
    overflow: hidden;
    width: 1868px;
    height: 888px;
    border-radius: 20px;
  }
}
</style>
