<template>
  <div>
    <Echart
      :options="options"
      id="centreLeft1Chart"
      height="220px"
      width="260px"
    ></Echart>
  </div>
</template>

<script>
import Echart from "@/common/echart";
export default {
  data() {
    return {
      options: {},
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
  watch: {
    cdata: {
      handler(newData) {
        this.options = {
          color: ["#fb7293", "#32c5e9", "#9fe6b8"],
          tooltip: {
            trigger: "item",
            formatter: "{b} : {c} ({d}%)",
          },
          toolbox: {
            show: true,
          },
          calculable: true,
          // legend: {
          //   orient: "horizontal",
          //   icon: "circle",
          //   bottom: 0,
          //   x: "center",
          //   data: newData.xData,
          //   textStyle: {
          //     color: "#fff"
          //   }
          // },
          series: [
            {
              name: "",
              type: "pie",
              radius: [10, 50],
              roseType: "area",
              center: ["50%", "40%"],
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
