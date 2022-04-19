<template>
  <div class="basic-box">
    <div class="bg-color-black">
      <div class="d-flex pt-4 pl-2">
        <div>
          <icon name="chart-pie" class="text-icon"></icon>
        </div>
        <div class="d-flex">
          <span class="fs-xl text mx-2 top-title">基础数据</span>
          <dv-decoration-3 class="dv-dec-3" />
        </div>
      </div>

      <div class="list-data d-flex jc-center">
        <div v-for="(item, index) in liatData" :key="index">
          <div class="text" :style="'color:' + item.numberData.style.fill">
            {{ item.text }}
          </div>
          <div class="d-flex">
            <dv-digital-flop
              class="dv-digital-flop"
              :config="item.numberData"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  formatter,
  numToUnit,
  symbolToUnit,
  fillColor,
} from "@/utils/index.js";
export default {
  data() {
    return {
      liatData: [],
    };
  },
  props: {
    dasicsData: {
      type: Array,
      default: () => [],
    },
  },
  watch: {
    dasicsData: {
      handler(newData) {
        let newList = [];
        newData.forEach((item) => {
          let boxData = {
            numberData: {
              number: [item.value ? numToUnit(item.value) : 0],
              toFixed: 2,
              textAlign: "center",
              content: "{nt}" + symbolToUnit(item.value),
              style: {
                fontSize: 23,
                fill: fillColor(),
              },
              formatter,
            },
            text: item.name,
          };
          newList.push(boxData);
        });
        this.liatData = newList;
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
  height: 200px;
  border-radius: 10px;
  .bg-color-black {
    height: 180px;
    border-radius: 10px;
  }

  .top-title {
    font-size: 30px;
    font-weight: bold;
  }

  .text {
    color: #fff;
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
  .list-data {
    margin-top: 40px;
    font-size: 24px;
    text-align: center;
    .coin {
      position: relative;
      top: 6px;
      font-size: 20px;
      color: #ffc107;
    }
    .dv-digital-flop {
      width: 165ppx;
      height: 80px;
    }
  }
}
</style>
