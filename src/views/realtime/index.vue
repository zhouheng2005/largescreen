<template>
  <div class="basic-box">
    <div class="bg-color-black">
      <dv-scroll-board :config="config" ref="scrollBoard" />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      config: {
        header: [
          "订单号",
          "店铺",
          "支付方式",
          "买家信息",
          "交易金额(元)",
          "时间",
        ],
        headerBGC: "#4BF7F1",
        data: [
          // [
          //   '<div style="cursor:pointer" title="行1列1">行1列1</div>',
          //   '<div style="cursor:pointer" title="行1列1">行1列1</div>',
          //   '<div style="cursor:pointer" title="行1列1">行1列1</div>',
          //   '<div style="cursor:pointer" title="行1列1">行1列1</div>',
          //   '<div style="cursor:pointer" title="行1列1">行1列1</div>',
          //   '<div style="cursor:pointer" title="行1列1">行1列1</div>',
          // ],
        ],
        columnWidth: [145],
        align: "center",
      },
    };
  },

  props: {
    realTimeData: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  watch: {
    realTimeData: {
      handler(newData) {
        let configData = [];
        for (let index = 0; index < newData.length; index++) {
          const item = newData[index];
          let list = [];
          list.push(
            '<div style="cursor:pointer;overflow:hidden;text-overflow:ellipsis;" title="' +
              item.order_name +
              '">' +
              item.order_name +
              "</div>"
          );
          list.push(
            '<div style="cursor:pointer;overflow:hidden;text-overflow:ellipsis;" title="' +
              item.shop_name +
              '">' +
              item.shop_name +
              "</div>"
          );
          list.push(
            '<div style="cursor:pointer;overflow:hidden;text-overflow:ellipsis;" title="' +
              item.pay_type +
              '">' +
              item.pay_type +
              "</div>"
          );
          list.push(
            '<div style="cursor:pointer;overflow:hidden;text-overflow:ellipsis;" title="' +
              item.buy_name +
              '">' +
              item.buy_name +
              "</div>"
          );
          list.push(
            '<div style="cursor:pointer;overflow:hidden;text-overflow:ellipsis;" title="' +
              item.money +
              '">' +
              item.money +
              "</div>"
          );
          list.push(
            '<div style="cursor:pointer;overflow:hidden;text-overflow:ellipsis;" title="' +
              item.time +
              '">' +
              item.time +
              "</div>"
          );
          configData.push(list);
        }
        this.config.data = configData;
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
  width: 780px;
  height: 190px;
  border-radius: 10px;
  overflow: hidden;
  .bg-color-black {
    margin-top: 35px;
    margin-left: 8px;
    height: 290px;
    width: 760px;
    border-radius: 10px;
  }
}
</style>
