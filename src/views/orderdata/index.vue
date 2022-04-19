<template>
  <div class="basic-box">
    <div class="bg-color-black">
      <div class="d-flex pt-4 pl-2">
        <div>
          <icon name="chart-bar" class="text-icon"></icon>
        </div>
        <div class="d-flex">
          <span class="fs-xl text mx-2 top-title">企惠订单</span>
          <dv-decoration-5 class="dv-dec-3" />
        </div>
      </div>
      <div class="surface d-flex jc-center">
        <barChart :cdata="data" />
      </div>
    </div>
  </div>
</template>

<script>
import barChart from "./bar_chart";
export default {
  data() {
    return {
      data: {
        month: [],
        xData: [],
        series: [],
      },
    };
  },
  props: {
    orderData: {
      type: Object,
      default: () => ({}),
    },
  },
  components: {
    barChart,
  },
  watch: {
    orderData: {
      handler(newData) {
        let xData = [];
        if (newData.series && newData.series.length > 0) {
          newData.series.forEach((item) => {
            xData.push(item.name);
          });
        }
        this.data.month = newData.categories ? newData.categories : [];
        this.data.xData = xData;
        this.data.series = newData.series ? newData.series : [];
      },
      immediate: true,
      deep: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.basic-box {
  padding: 16px;
  width: 580px;
  height: 470px;
  border-radius: 10px;
  .bg-color-black {
    height: 450px;
    border-radius: 10px;
  }

  .top-title {
    font-size: 30px;
    font-weight: bold;
  }

  .text {
    color: #fff;
    &.color1 {
      color: #fb7293;
    }
    &.color2 {
      color: #32c5e9;
    }
    &.color3 {
      color: #9fe6b8;
    }
  }

  .dv-dec-3 {
    position: relative;
    width: 100px;
    height: 20px;
    top: 8px;
  }

  .surface {
    margin: 10px 0 20px 0;
  }
}
</style>
