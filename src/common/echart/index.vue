<template>
  <div :id="id" :class="className" :style="{ height: height, width: width }" />
</template>

<script>
import tdTheme from "./theme.json"; // 引入默认主题

export default {
  name: "echart",
  props: {
    className: {
      type: String,
      default: "chart",
    },
    id: {
      type: String,
      default: "chart",
    },
    width: {
      type: String,
      default: "100%",
    },
    height: {
      type: String,
      default: "2.5rem",
    },
    options: {
      type: Object,
      default: () => ({}),
    },
    tooltip: {
      type: [Number,String],
      default: 0,
    },
  },
  data() {
    return {
      chart: null,
    };
  },
  watch: {
    options: {
      handler(options) {
        // 设置true清空echart缓存
        this.chart.setOption(options, true);
      },
      deep: true,
    },
  },
  mounted() {
    this.$echarts.registerTheme("tdTheme", tdTheme); // 覆盖默认主题
    this.initChart();
  },
  beforeDestroy() {
    this.chart.dispose();
    this.chart = null;
  },
  methods: {
    initChart() {
      // 初始化echart
      this.chart = this.$echarts.init(this.$el, "tdTheme");
      this.chart.setOption(this.options, true);
      if (this.tooltip == 1) {
        this.$parent.assignment(this.chart);
      }
    },
  },
};
</script>

<style></style>
