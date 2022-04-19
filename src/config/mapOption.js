export const mapOption = {
  basicOption: {
    title: [
      {
        left: "left",
        text: "全国",
        textStyle: {
          fontSize: 16,
          color: "#fff",
        },
      },
      {
        text: "",
        left: "left",
        top: "30",
        textStyle: {
          fontSize: 16,
          color: "#24CFF4",
        },
      },
    ],
    tooltip: {
      //提示框组件
      trigger: "item", //触发类型,'item'数据项图形触发，主要在散点图，饼图等无类目轴的图表中使用。 'axis'坐标轴触发，主要在柱状图，折线图等会使用类目轴的图表中使用。
      // triggerOn:"none",//提示框触发的条件,'mousemove'鼠标移动时触发。'click'鼠标点击时触发。'mousemove|click'同时鼠标移动和点击时触发。'none'不在 'mousemove' 或 'click' 时触发
      showContent: true, //是否显示提示框浮层
      alwaysShowContent: false, //是否永远显示提示框内容
      showDelay: 0, //浮层显示的延迟，单位为 ms
      hideDelay: 100, //浮层隐藏的延迟，单位为 ms
      enterable: false, //鼠标是否可进入提示框浮层中
      confine: false, //是否将 tooltip 框限制在图表的区域内
      transitionDuration: 0.4, //提示框浮层的移动动画过渡时间，单位是 s,设置为 0 的时候会紧跟着鼠标移动
      backgroundColor: "transparent", //标题背景色
      // position:['50%', '50%'],                //提示框浮层的位置，默认不设置时位置会跟随鼠标的位置,[10, 10],回掉函数，inside鼠标所在图形的内部中心位置，top、left、bottom、right鼠标所在图形上侧，左侧，下侧，右侧，
      borderColor: "#ccc", //边框颜色
      borderWidth: 0, //边框线宽
      padding: 0, //图例内边距，单位px  5  [5, 10]  [5,10,5,10]
      borderRadius: 5,
      textStyle: {
        fontSize: 10,
      }, //文本样式
      // formatter: '{b}',
      formatter: (param) => {
        let val =
          typeof param.value === "number" ? param.value : param.value[2];
        if (isNaN(val)) {
          val = 0;
        }
        return (
          '<div style="text-align:left;padding: 15px;font-weight: bolder;border-radius: 5px;background: linear-gradient(to right, rgba(36, 118, 183, 1) , rgba(36, 118, 183, .5))">' +
          '<div style="color: #26C4EB;padding-bottom: 10px;">' +
          "<span>● </span>" +
          "<span>" +
          param.name +
          "</span>" +
          "</div>" +
          '<div style="padding: 2px 16px;">' +
          "<span>" +
          val +
          "</span>" +
          "</div>" +
          "</div>"
        );
      },
    },
    //左侧导航视觉映射组件
    visualMap: {
      type: "continuous", // 连续型
      min: 0, // 值域最小值，必须参数
      max: 0, // 值域最大值，必须参数
      text: ["数量"],
      left: 0,
      bottom: 0,
      calculable: true,
      seriesIndex: [0],
      inRange: {
        color: ["#24CFF4", "#2E98CA", "#1E62AC"], // 指定数值从低到高时的颜色变化
      },
      textStyle: {
        color: "#24CFF4", // 值域控件的文本颜色
      },
    },
    // 新建一个地理坐标系 geo
    geo: {
      // map: 'china',//地图类型为中国地图
      // itemStyle:{ // 定义样式
      //   normal:{       // 普通状态下的样式
      //     areaColor:'#6699CC',
      //     borderColor: '#fff',
      //   },
      //   emphasis: {         // 高亮状态下的样式
      //     areaColor: '#e9fbf1'
      //   }
      // }
    },
  },
  seriesOption: {
    type: "map",
    // roam: false,
    zoom: 1.2,
    nameMap: {
      china: "中国",
    },
    label: {
      normal: {
        show: true,
        textStyle: {
          //省份标签
          color: "#fff",
          fontSize: 10,
        },
        color: "#fff",
        formatter: (p) => {
          return p.name;
        },
      },
      emphasis: {
        show: true,
        textStyle: {
          color: "#f75a00",
        },
      },
    },
    itemStyle: {
      normal: {
        areaColor: "#24CFF4",
        borderColor: "#53D9FF",
        borderWidth: 1.3,
        shadowBlur: 15,
        shadowColor: "rgb(58,115,192)",
        shadowOffsetX: 7,
        shadowOffsetY: 6,
      },
      emphasis: {
        areaColor: "#8dd7fc",
        borderWidth: 1.6,
        shadowBlur: 25,
      },
    },
  },
};
