<template>
  <div>
    <Echart
      :options="options"
      id="chart<emberId"
      :tooltip="1"
      height="280px"
      width="460px"
    ></Echart>
  </div>
</template>

<script>
import Echart from "@/common/echart";
export default {
  data() {
    return {
      options: {},
      tooltipAutoplay: null, // 提示框自动播放
      tooltipAutoplayIndex: 0, // 提示框自动播放index
    };
  },
  components: {
    Echart,
  },
  props: {
    cdata: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  mounted() {
    this.$nextTick(() => {
      const that = this;
      that.chart.on("mouseover", that.echartsMapMouseover);
      that.chart.on("mouseout", that.echartsMapMouseout);
    });
  },
  methods: {
    assignment(chartDom) {
      this.chart = chartDom;
      this.setTooltipAutoplay();
    },
    //鼠标移入事件
    echartsMapMouseover() {
      clearInterval(this.tooltipAutoplay);
    },
    //鼠标移出事件
    echartsMapMouseout() {
      this.setTooltipAutoplay();
    },
    // 动态显示tooltip
    setTooltipAutoplay() {
      clearInterval(this.tooltipAutoplay);
      this.tooltipAutoplay = setInterval(() => {
        this.chart.dispatchAction({
          type: "showTip",
          seriesIndex: 0,
          dataIndex: this.tooltipAutoplayIndex,
        });
        this.tooltipAutoplayIndex++;
        if (this.tooltipAutoplayIndex >= this.cdata.xData.length) {
          this.tooltipAutoplayIndex = 0;
          this.setTooltipAutoplay();
        }
      }, 2500);
    },
  },
  watch: {
    cdata: {
      handler(newData) {
        this.options = {
          color: ["#ffffff", "#FF6200", "#C300FF", "#333333"],
          tooltip: {
            trigger: "item",
            formatter: "{b} : {c} ({d}%)",
          },
          emphasis: {
            // 高亮样式
            itemStyle: {
              color: "yellow",
            },
            label: {
              fontSize: 20,
            },
          },
          toolbox: {
            show: true,
          },
          calculable: true,
          legend: {
            orient: "horizontal",
            icon: "rect",
            top: 20,
            x: "center",
            data: newData.xData,
            textStyle: {
              color: "#fff",
            },
            iconStyle: {
              borderRadius: 10,
            },
          },
          series: [
            {
              type: "pie",
              top: 40,
              data: newData.seriesData,
            },
          ],
        };
      },
      immediate: true,
      deep: true,
    },
  },
};
</script>

<style lang="scss" scoped></style>
