<template>
  <div class="basic-box">
    <div class="bg-color-black">
      <div class="d-flex pt-4 pl-2">
        <div>
          <icon name="chart-pie" class="text-icon"></icon>
        </div>
        <div class="d-flex">
          <span class="fs-xl text mx-2 top-title">商户类型统计</span>
          <dv-decoration-1 class="dv-dec-3" />
        </div>
      </div>
      <div class="surface d-flex jc-center">
        <pieChart :cdata="data" />
      </div>
    </div>
  </div>
</template>

<script>
import pieChart from "./pie_chart";
export default {
  data() {
    return {
      data: {
        xData: [],
        seriesData: [],
      },
    };
  },
  props: {
    shopTypeData: {
      type: Array,
      default: () => [],
    },
  },
  components: {
    pieChart,
  },
  watch: {
    shopTypeData: {
      handler(newData) {
        let xData = [],
          seriesData = [];
        newData.forEach((item) => {
          xData.push(item.name);
          let mewData = {
            name: item.name,
            value: Number(item.value),
          };
          seriesData.push(mewData);
        });
        this.data.xData = xData;
        this.data.seriesData = seriesData;
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
  width: 500px;
  height: 400px;
  border-radius: 10px;
  .bg-color-black {
    height: 380px;
    width: 490px;
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
