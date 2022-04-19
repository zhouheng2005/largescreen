<template>
  <div>
    <Echart
      id="chartId"
      :tooltip="1"
      :options="options"
      height="430px"
      width="580px"
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
        if (this.tooltipAutoplayIndex >= this.cdata.month.length) {
          this.tooltipAutoplayIndex = 0;
          this.setTooltipAutoplay();
        }
      }, 3000);
    },
  },
  watch: {
    cdata: {
      handler(newData) {
        let series = [];
        newData.series.forEach((item, index) => {
          let rColor = Math.floor(Math.random() * 246) + index,
            gColor = Math.floor(Math.random() * 246) + index,
            bColor = Math.floor(Math.random() * 246) + index;
          let newsData = {
            name: item.name,
            type: "bar",
            smooth: true,
            showAllSymbol: true,
            symbol: "emptyCircle",
            symbolSize: 8,
            itemStyle: {
              normal: {
                barBorderRadius: 0,
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color:
                      "rgba(" + rColor + "," + gColor + "," + bColor + ",1)",
                  },
                  {
                    offset: 1,
                    color:
                      "rgba(" + rColor + "," + gColor + "," + bColor + ",.6)",
                  },
                ]),
              },
            },
            data: item.data,
          };
          series.push(newsData);
        });
        this.options = {
          tooltip: {
            trigger: "axis",
            backgroundColor: "rgba(255,255,255,0.1)",
            axisPointer: {
              type: "shadow",
              label: {
                show: true,
                backgroundColor: "#7B7DDC",
              },
            },
          },
          grid: {
            left: 80,
            top: 70,
            with: "100%",
          },
          legend: {
            data: newData.xData,
            textStyle: {
              color: "#B4B4B4",
            },
            left: "60px",
            top: "20px",
          },
          xAxis: {
            data: newData.month,
            axisLine: {
              show: true,
              lineStyle: {
                color: "#32c5e9",
              },
            },
            axisTick: {
              show: true,
              lineStyle: {
                color: "#32c5e9",
                lineWidth: 1,
              },
            },
          },
          yAxis: [
            {
              splitLine: { show: false },
              axisLine: {
                show: true,
                lineStyle: {
                  color: "#32c5e9",
                },
              },
              axisLabel: {
                show: true,
                formatter: "{value}",
                style: {
                  fill: "#333",
                  fontSize: 10,
                  rotate: 0,
                },
              },
              axisTick: {
                show: true,
                lineStyle: {
                  color: "#32c5e9",
                  lineWidth: 1,
                },
              },
            },
            {
              splitLine: { show: false },
              axisLine: {
                show: false,
                lineStyle: {
                  color: "#32c5e9",
                },
              },
              axisLabel: {
                show: true,
                formatter: "{value}",
              },
            },
          ],
          series: series,
        };
        this.setTooltipAutoplay();
      },
      immediate: true,
      deep: true,
    },
  },
};
</script>

<style lang="scss" scoped></style>
