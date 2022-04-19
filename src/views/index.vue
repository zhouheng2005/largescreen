<template>
  <div id="index" ref="appRef">
    <div class="bg">
      <dv-loading v-if="loading">
        <div class="loading">Loading...</div>
        <div class="version">企惠大数据V{{ version }}</div>
      </dv-loading>
      <div v-else class="host-body">
        <div class="d-flex">
          <dv-decoration-2 :reverse="true" style="width: 5px; height: 55px" />
          <dv-decoration-2 :reverse="true" style="width: 5px; height: 45px" />
          <dv-decoration-2 :reverse="true" style="width: 5px; height: 35px" />
          <dv-decoration-2 :reverse="true" style="width: 5px; height: 25px" />
          <dv-decoration-2 :reverse="true" style="width: 5px; height: 15px" />
          <div class="left">
            <div class="d-flex">
              <div class="top-text">企惠大数据</div>
              <div class="sub-title">
                <span class="mr-4">惠生活</span>
                <span>上企惠</span>
              </div>
            </div>
            <div class="time">{{ dateYear }} {{ dateWeek }} {{ dateDay }}</div>
          </div>
          <div class="flex-1"></div>
          <div class="tabs-box">
            <a-tabs
              :defaultActiveKey="tabIndex"
              size="default"
              :tabBarStyle="{ margin: 0, color: '#fff' }"
              @change="callback"
            >
              <a-tab-pane
                v-for="(item, index) in tabList"
                :tab="item.name"
                :key="index"
              ></a-tab-pane>
            </a-tabs>
          </div>
          <dv-decoration-2 :reverse="true" style="width: 5px; height: 15px" />
          <dv-decoration-2 :reverse="true" style="width: 5px; height: 25px" />
          <dv-decoration-2 :reverse="true" style="width: 5px; height: 35px" />
          <dv-decoration-2 :reverse="true" style="width: 5px; height: 45px" />
          <dv-decoration-2 :reverse="true" style="width: 5px; height: 55px" />
        </div>
        <div class="d-flex jc-center">
          <dv-decoration-10 class="dv-dec-10" />
          <div class="d-flex jc-center">
            <dv-decoration-8 class="dv-dec-8" :color="decorationColor" />
            <div class="title">
              <dv-decoration-6
                class="dv-dec-6"
                :reverse="true"
                :color="['#50e3c2', '#67a1e5']"
              />
              <span class="top-text center-txt"
                >{{ tabIndex == 0 ? "驾驶舱" : "物流地图" }}
              </span>
            </div>
            <dv-decoration-8
              class="dv-dec-8"
              :reverse="true"
              :color="decorationColor"
            />
          </div>
          <dv-decoration-10 class="dv-dec-10-s" />
        </div>
        <div class="body-box" v-show="tabIndex == 0">
          <div class="content-box">
            <!-- 地图 -->
            <dv-border-box-10 class="mr-4" style="width: 1300px">
              <div class="d-flex">
                <china
                  :area-code.sync="areaCode"
                  :area-level.sync="areaLevel"
                  :area-name.sync="areaName"
                  :map-name-list.sync="mapNameList"
                  :map-code-list.sync="mapCodeList"
                  :area-statistic="areaStatistic"
                />
                <div>
                  <!-- 商户类型 -->
                  <shopType :shopTypeData="shopTypeData" />
                  <!-- 会员数据 -->
                  <memberDara :memberData="memberData" />
                </div>
              </div>
            </dv-border-box-10>
            <!-- 销售额 -->
            <dv-border-box-1 style="height: 470px">
              <salesVolume :salesData="salesData" />
            </dv-border-box-1>
          </div>
          <div class="content-box mt-3">
            <!-- 数据总览 -->
            <dv-border-box-12 style="width: 500px; height: 200px">
              <basicData :dasicsData="dasicsData" />
            </dv-border-box-12>
            <!-- 实时交易信息 -->
            <dv-border-box-11
              title="实时交易数据"
              style="width: 810px; height: 200px"
            >
              <realTimeTrade :realTimeData="realTimeData" />
            </dv-border-box-11>
            <!-- 企惠订单 -->
            <dv-border-box-1 style="height: 470px; margin-top: -270px">
              <orderData :orderData="orderData" />
            </dv-border-box-1>
          </div>
        </div>
        <dv-border-box-1
          v-show="tabIndex == 1"
          style="height: 940px; width: 1910px"
        >
          <logisticsMap :mapData="mapData" />
        </dv-border-box-1>
      </div>
    </div>
  </div>
</template>

<script>
import { Tabs } from "ant-design-vue";
import drawMixin from "../utils/drawMixin";
import config from "../../package.json";
import { formatTime } from "@/utils/index.js";
import china from "./map/index";
import shopType from "./shoptype/index";
import memberDara from "./member/index";
import salesVolume from "./salesvolume/index";
import basicData from "./basicdata/index";
import realTimeTrade from "./realtime/index";
import orderData from "./orderdata/index";
import logisticsMap from "./logistics_map";
export default {
  mixins: [drawMixin],
  data() {
    return {
      version: config.version,
      subscribeMessage: null,
      timing: null,
      loading: true,
      dateDay: null,
      dateYear: null,
      dateWeek: null,
      weekday: ["周日", "周一", "周二", "周三", "周四", "周五", "周六"],
      decorationColor: ["#568aea", "#000000"],
      tabList: [{ name: "驾驶舱" }, { name: "物流地图" }],
      tabIndex: 0,
      areaCode: "000000", // 当前用的areaCode
      areaLevel: 0, // 当前用的areaCode
      areaName: "china", // 当前用的areaName
      mapNameList: [], // 当前地图上的地区名字
      mapCodeList: [], // 当前地图上的地区Code
      areaStatistic: [], // 地图上数据汇总
      shopTypeData: [],
      memberData: [],
      salesData: {},
      dasicsData: [],
      realTimeData: [],
      orderData: {},
      mapData: {},
      isRefresh: false,
    };
  },
  components: {
    ATabs: Tabs,
    china,
    shopType,
    memberDara,
    basicData,
    salesVolume,
    realTimeTrade,
    orderData,
    logisticsMap,
  },
  mounted() {
    this.changeTiming();
    this.fnGetBigScreen();
    this.timeFn();
  },
  beforeDestroy() {
    clearInterval(this.timing);
    clearInterval(this.subscribeMessage);
  },
  methods: {
    changeTiming() {
      this.subscribeMessage = setInterval(() => {
        if (this.isRefresh) {
          this.isRefresh = false;
          this.fnGetBigScreen();
        }
      }, 8000);
    },
    async fnGetBigScreen() {
      const that = this;
      try {
        // const res = await that.$apis.common.getBigScreen();//请求接口数据
        // if (res.code == 200) {
        //  全国商户地图数据定义
        let listMap = [];
        let shopNumMap = [
          {
            adcode: "110000",
            value: 4,
            city: [
              {
                adcode: "110100",
                value: 4,
                county: [
                  {
                    adcode: 110101,
                    value: 3,
                  },
                  {
                    adcode: 110102,
                    value: 1,
                  },
                ],
              },
            ],
          },
          {
            adcode: "140000",
            value: 1,
            city: [
              {
                adcode: "140800",
                value: 1,
                county: [
                  {
                    adcode: 140802,
                    value: 1,
                  },
                ],
              },
            ],
          },
          {
            adcode: "210000",
            value: 1,
            city: [
              {
                adcode: "210400",
                value: 1,
                county: [
                  {
                    adcode: 210402,
                    value: 1,
                  },
                ],
              },
            ],
          },
          {
            adcode: "230000",
            value: 1,
            city: [
              {
                adcode: "230100",
                value: 1,
                county: [
                  {
                    adcode: 230102,
                    value: 1,
                  },
                ],
              },
            ],
          },
          {
            adcode: "330000",
            value: 1,
            city: [
              {
                adcode: "330300",
                value: 1,
                county: [
                  {
                    adcode: 330302,
                    value: 1,
                  },
                ],
              },
            ],
          },
          {
            adcode: "350000",
            value: 2,
            city: [
              {
                adcode: "350500",
                value: 1,
                county: [
                  {
                    adcode: 350582,
                    value: 1,
                  },
                ],
              },
              {
                adcode: "350700",
                value: 1,
                county: [
                  {
                    adcode: 350782,
                    value: 1,
                  },
                ],
              },
            ],
          },
          {
            adcode: "360000",
            value: 2439,
            city: [
              {
                adcode: "360100",
                value: 11,
                county: [
                  {
                    adcode: 360102,
                    value: 1,
                  },
                  {
                    adcode: 360103,
                    value: 1,
                  },
                  {
                    adcode: 360111,
                    value: 8,
                  },
                  {
                    adcode: 360121,
                    value: 1,
                  },
                ],
              },
              {
                adcode: "360600",
                value: 1,
                county: [
                  {
                    adcode: 360602,
                    value: 1,
                  },
                ],
              },
              {
                adcode: "361100",
                value: 2427,
                county: [
                  {
                    adcode: 361102,
                    value: 1192,
                  },
                  {
                    adcode: 361103,
                    value: 14,
                  },
                  {
                    adcode: 361104,
                    value: 1191,
                  },
                  {
                    adcode: 361121,
                    value: 16,
                  },
                  {
                    adcode: 361123,
                    value: 3,
                  },
                  {
                    adcode: 361124,
                    value: 4,
                  },
                  {
                    adcode: 361125,
                    value: 4,
                  },
                  {
                    adcode: 361126,
                    value: 1,
                  },
                  {
                    adcode: 361128,
                    value: 1,
                  },
                  {
                    adcode: 361129,
                    value: 1,
                  },
                ],
              },
            ],
          },
          {
            adcode: "370000",
            value: 1,
            city: [
              {
                adcode: "371500",
                value: 1,
                county: [
                  {
                    adcode: 371524,
                    value: 1,
                  },
                ],
              },
            ],
          },
          {
            adcode: "410000",
            value: 1,
            city: [
              {
                adcode: "411700",
                value: 1,
                county: [
                  {
                    adcode: 411727,
                    value: 1,
                  },
                ],
              },
            ],
          },
          {
            adcode: "440000",
            value: 2,
            city: [
              {
                adcode: "440100",
                value: 1,
                county: [
                  {
                    adcode: 440106,
                    value: 1,
                  },
                ],
              },
              {
                adcode: "445200",
                value: 1,
                county: [
                  {
                    adcode: 445203,
                    value: 1,
                  },
                ],
              },
            ],
          },
          {
            adcode: "460000",
            value: 1,
            city: [
              {
                adcode: "460100",
                value: 1,
                county: [
                  {
                    adcode: 460108,
                    value: 1,
                  },
                ],
              },
            ],
          },
          {
            adcode: "530000",
            value: 2,
            city: [
              {
                adcode: "530100",
                value: 2,
                county: [
                  {
                    adcode: 530102,
                    value: 1,
                  },
                  {
                    adcode: 530111,
                    value: 1,
                  },
                ],
              },
            ],
          },
          {
            adcode: "540000",
            value: 1,
            city: [
              {
                adcode: "540100",
                value: 1,
                county: [
                  {
                    adcode: 540126,
                    value: 1,
                  },
                ],
              },
            ],
          },
          {
            adcode: "630000",
            value: 2,
            city: [
              {
                adcode: "630100",
                value: 2,
                county: [
                  {
                    adcode: 630102,
                    value: 1,
                  },
                  {
                    adcode: 630105,
                    value: 1,
                  },
                ],
              },
            ],
          },
          {
            adcode: "650000",
            value: 2,
            city: [
              {
                adcode: "653100",
                value: 2,
                county: [
                  {
                    adcode: 653122,
                    value: 1,
                  },
                  {
                    adcode: 653127,
                    value: 1,
                  },
                ],
              },
            ],
          },
        ];
        shopNumMap.forEach((item) => {
          let newProvinceData = {
            areaCode: item.adcode,
            amounts: item.value,
          };
          listMap.push(newProvinceData);
          item.city.forEach((itemCity) => {
            let newCityData = {
              areaCode: itemCity.adcode,
              amounts: itemCity.value,
            };
            listMap.push(newCityData);
            itemCity.county.forEach((itemCounty) => {
              let newCountyData = {
                areaCode: itemCounty.adcode,
                amounts: itemCounty.value,
              };
              listMap.push(newCountyData);
            });
          });
        });
        // 中国地图商户数量分部数据
        that.areaStatistic = listMap;
        // 商户类型饼图数据
        that.shopTypeData = [
          {
            name: "商城",
            value: 988,
          },
          {
            name: "餐饮",
            value: 1174,
          },
          {
            name: "房产",
            value: 8,
          },
          {
            name: "汽车",
            value: 16,
          },
          {
            name: "线下",
            value: 280,
          },
          {
            name: "生活",
            value: 4,
          },
        ];
        // 会员数据
        that.memberData = [
          {
            name: "董事局",
            value: 14,
          },
          {
            name: "钻卡会员",
            value: 1938,
          },
          {
            name: "贵宾会员",
            value: 22539,
          },
          {
            name: "普通会员",
            value: 41474,
          },
        ];

        that.salesData = {
          categories: ["2022-01", "2022-02", "2022-03", "2022-04"],
          series: [
            {
              name: "平台优惠券",
              data: [600.6, 671.96, 20116.8, 6026.54],
            },
            {
              name: "支付金额",
              data: [73854.67, 125293.28, 292136.34, 155710.81],
            },
          ],
        };

        that.dasicsData = [
          { name: "总销售额", value: 361296916 },
          { name: "注册会员", value: 12899882 },
          { name: "入驻商户", value: 98898887 },
        ];

        that.realTimeData = [
          {
            order_name: "4727684200504320",
            shop_name: "上层米粉",
            pay_type: "app支付",
            buy_name: "齐力",
            money: "15.00",
            time: "2022-04-19 09:13:19",
          },
          {
            order_name: "4727676821240832",
            shop_name: "信州区娜时花店",
            pay_type: "支付宝支付",
            buy_name: "沉默的鸡翅",
            money: "69.00",
            time: "2022-04-19 09:05:48",
          },
          {
            order_name: "4727676283819008",
            shop_name: "信州区娜时花店",
            pay_type: "支付宝支付",
            buy_name: "沉默的鸡翅",
            money: "69.00",
            time: "2022-04-19 09:05:16",
          },
          {
            order_name: "4727676134748160",
            shop_name: "信州区乐速型元气餐厅",
            pay_type: "app支付",
            buy_name: "刘",
            money: "50.00",
            time: "2022-04-19 09:05:07",
          },
          {
            order_name: "4727659785590784",
            shop_name: "信州区娜时花店",
            pay_type: "支付宝支付",
            buy_name: "沉默的鸡翅",
            money: "69.00",
            time: "2022-04-19 08:48:29",
          },
          {
            order_name: "4727629925684224",
            shop_name: "广信区刘小惠小吃店",
            pay_type: "余额支付",
            buy_name: "徐丹",
            money: "6.00",
            time: "2022-04-19 08:18:06",
          },
          {
            order_name: "4727628873501696",
            shop_name: "广信区刘小惠小吃店",
            pay_type: "余额支付",
            buy_name: "房产销售杨丽",
            money: "6.00",
            time: "2022-04-19 08:17:02",
          },
          {
            order_name: "4727613686033408",
            shop_name: "玖佰碗粉店",
            pay_type: "小程序支付",
            buy_name: "筑城天家（饶朝伟",
            money: "15.00",
            time: "2022-04-19 08:01:35",
          },
          {
            order_name: "4727531925321728",
            shop_name: "食鲜粉.铅山烫粉",
            pay_type: "小程序支付",
            buy_name: "食鲜粉",
            money: "336.00",
            time: "2022-04-19 06:38:25",
          },
          {
            order_name: "4727098086471680",
            shop_name: "柒沐甜品",
            pay_type: "app支付",
            buy_name: "啊啊啊",
            money: "68.00",
            time: "2022-04-18 23:17:05",
          },
          {
            order_name: "4727035566558208",
            shop_name: "广信区香烤里拉餐饮店",
            pay_type: "小程序支付",
            buy_name: "不重复",
            money: "101.30",
            time: "2022-04-18 22:13:30",
          },
          {
            order_name: "4727025827021824",
            shop_name: "广信区香烤里拉餐饮店",
            pay_type: "小程序支付",
            buy_name: "棉毛裤",
            money: "31.00",
            time: "2022-04-18 22:03:35",
          },
          {
            order_name: "4727022513670144",
            shop_name: "三江鸡腿哥（万达店）",
            pay_type: "小程序支付",
            buy_name: "叮当猫",
            money: "37.00",
            time: "2022-04-18 22:00:13",
          },
          {
            order_name: "4727015668034560",
            shop_name: "朱师傅脆皮五花肉",
            pay_type: "支付宝支付",
            buy_name: "🖤",
            money: "22.00",
            time: "2022-04-18 21:53:15",
          },
          {
            order_name: "4727012768977920",
            shop_name: "三江鸡腿哥（万达店）",
            pay_type: "小程序支付",
            buy_name: "感_恩",
            money: "30.00",
            time: "2022-04-18 21:50:18",
          },
          {
            order_name: "4727002173078528",
            shop_name: "广信区生鲜传奇聚鲜园超市",
            pay_type: "支付宝支付",
            buy_name: "上汽大通",
            money: "51.74",
            time: "2022-04-18 21:39:31",
          },
          {
            order_name: "4726959078942720",
            shop_name: "朱师傅脆皮五花肉",
            pay_type: "小程序支付",
            buy_name: "🖤",
            money: "40.50",
            time: "2022-04-18 20:55:41",
          },
          {
            order_name: "4726941436519424",
            shop_name: "朱师傅脆皮五花肉",
            pay_type: "小程序支付",
            buy_name: "丽娟",
            money: "22.00",
            time: "2022-04-18 20:37:44",
          },
          {
            order_name: "4726937056680960",
            shop_name: "生活驿站(筑城小区店)",
            pay_type: "余额支付",
            buy_name: "张如益",
            money: "130.00",
            time: "2022-04-18 20:33:17",
          },
          {
            order_name: "4726931774116864",
            shop_name: "朱师傅脆皮五花肉",
            pay_type: "小程序支付",
            buy_name: "树叶",
            money: "22.00",
            time: "2022-04-18 20:27:54",
          },
          {
            order_name: "4726929055310848",
            shop_name: "一朵炒酸奶（信州区店）",
            pay_type: "小程序支付",
            buy_name: "辜辜",
            money: "23.00",
            time: "2022-04-18 20:25:08",
          },
          {
            order_name: "4726918847002624",
            shop_name: "朱师傅脆皮五花肉",
            pay_type: "小程序支付",
            buy_name: "叶莹.🍃",
            money: "26.00",
            time: "2022-04-18 20:14:45",
          },
          {
            order_name: "4726891699476480",
            shop_name: "朱师傅脆皮五花肉",
            pay_type: "小程序支付",
            buy_name: "One night精酿-滕",
            money: "39.00",
            time: "2022-04-18 19:47:08",
          },
          {
            order_name: "4726881171116032",
            shop_name: "三湘红.卤味（明星广场店）",
            pay_type: "公众号支付",
            buy_name: "h",
            money: "49.30",
            time: "2022-04-18 19:36:26",
          },
          {
            order_name: "4726867595346944",
            shop_name: "一朵炒酸奶（信州区店）",
            pay_type: "小程序支付",
            buy_name: "从地平线倒叙",
            money: "23.00",
            time: "2022-04-18 19:22:37",
          },
          {
            order_name: "4726865894343680",
            shop_name: "朱师傅脆皮五花肉",
            pay_type: "小程序支付",
            buy_name: "五月",
            money: "24.00",
            time: "2022-04-18 19:20:53",
          },
          {
            order_name: "4726855104326656",
            shop_name: "企惠牛奶体验馆",
            pay_type: "app支付",
            buy_name: "阳光下的绿植",
            money: "40.00",
            time: "2022-04-18 19:09:55",
          },
          {
            order_name: "4726850982279168",
            shop_name: "朱师傅脆皮五花肉",
            pay_type: "小程序支付",
            buy_name: "Angel",
            money: "38.00",
            time: "2022-04-18 19:05:43",
          },
          {
            order_name: "4726847639839744",
            shop_name: "汤木桶饭（豪美）",
            pay_type: "小程序支付",
            buy_name: "筑城天家（饶朝伟",
            money: "13.00",
            time: "2022-04-18 19:02:19",
          },
          {
            order_name: "4726839291767808",
            shop_name: "黄记瘦肉片县中店",
            pay_type: "小程序支付",
            buy_name: "小猫",
            money: "18.88",
            time: "2022-04-18 18:53:50",
          },
        ];
        that.orderData = {
          categories: ["2022-01", "2022-02", "2022-03", "2022-04"],
          series: [
            {
              name: "商城订单",
              data: [5211, 409, 1152, 400],
            },
            {
              name: "餐饮订单",
              data: [2715, 1799, 5817, 3236],
            },
            {
              name: "线下订单",
              data: [35, 2, 6, 4],
            },
            {
              name: "手机买单",
              data: [20834, 268, 242, 97],
            },
            {
              name: "购物金充值订单",
              data: [5, 3, 1, 0],
            },
            {
              name: "影院订单",
              data: [0, 0, 0, 3],
            },
          ],
        };
        that.mapData = {
          expressmanlist: [
            {
              eid: 17,
              name: "何光",
              mobile: "15390778649",
              avatar: null,
              locations: "117.906887,28.456796",
              take_count: 0,
              delivery_count: 0,
              no_receive: 0,
              update_at: 1650332915,
              destination_at: 1647063066,
            },
            {
              eid: 20,
              name: "吴菊美",
              mobile: "15779378168",
              avatar:
                "https://express.yfkjqhw.com/uploads/avatar/89/df1b0896463dd1d10e723589f9ee92.JPG",
              locations: "117.978289,28.454806",
              take_count: 0,
              delivery_count: 0,
              no_receive: 0,
              update_at: 1650333163,
              destination_at: 1650271177,
            },
            {
              eid: 57,
              name: "潘芝繁",
              mobile: "15979365079",
              avatar: null,
              locations: "117.921233,28.434068",
              take_count: 0,
              delivery_count: 0,
              no_receive: 0,
              orderlist: {
                total: 0,
                per_page: 20,
                current_page: 1,
                last_page: 0,
                data: [],
              },
              update_at: 1650332965,
              destination_at: 1650275585,
            },
            {
              eid: 61,
              name: "张小兰",
              mobile: "15779975837",
              avatar:
                "https://express.yfkjqhw.com/uploads/avatar/16/5892a57f53ae6c2f11bdbbc4485132.jpg",
              locations: "117.953830,28.444216",
              take_count: 0,
              delivery_count: 0,
              no_receive: 0,
              update_at: 1650332060,
              destination_at: 1650271871,
            },
            {
              eid: 72,
              name: "王开颜",
              mobile: "13627931018",
              avatar: null,
              locations: "117.967643,28.442086",
              take_count: 0,
              delivery_count: 0,
              no_receive: 0,
              update_at: 1650333096,
              destination_at: 1650268488,
            },
            {
              eid: 87,
              name: "袁文权",
              mobile: "13979363810",
              locations: "117.969180,28.458004",
              destination: "",
              take_count: 0,
              delivery_count: 0,
              no_receive: 0,
              update_at: 1650333161,
              destination_at: 1650269948,
            },
          ],
          orderlist: [
            {
              id: 97704,
              cmid: 11113,
              pmid: 11113,
              oid: "4590597095179264",
              cid: 786,
              area_code: 0,
              mid: 25289,
              order_type: 1,
              goods_price: 4900,
              express_method: 3,
              express_price: 400,
              pack_price: 0,
              charge_price: 0,
              pack_fee_model: 0,
              pick_up_address_id: 0,
              member_reduce_price: 0,
              platform_reduce_price: 0,
              consume_coupon_reduce_price: 0,
              merchant_reduce_price: 0,
              vouchers_reduce_price: 0,
              full_reduce_price: 0,
              groupleader_reduce_price: 0,
              multiple_reduce_price: 0,
              firstminus_reduce_price: 0,
              bargain_reduce_price: 0,
              combo_reduce_price: 0,
              total_combo_activity_price: 0,
              shopamount_reduce_price: 0,
              shopamount_info: '{"goods":0,"express":0,"pack":0}',
              discount_reduce_price: 0,
              member_delivery_time: "",
              member_remarks: "",
              shop_remarks: "",
              system_remarks: "",
              order_amount: 5300,
              payable_amount: 5300,
              pay_amount: 5300,
              pay_sn: "4200001320202201127013167051",
              pay_method: 1,
              pay_state: 1,
              pay_at: 1641963673,
              pay_oid: "4590597095179264",
              cid_order_state: 1,
              channel: "",
              create_at: 1641963666,
              deliver_at: 0,
              finish_at: 0,
              other_tag: "0",
              combo_id: 0,
              combo_package_type: 0,
              live_roomid: "",
              platform_separate: "6.00",
              member_separate: "0.00",
              collection_separate: "0.00",
              firstminus_separat: "0.00",
              invite_price: 0,
              invite_code: "",
              is_completion: 0,
              completion_at: 0,
              refund_amount: 0,
              is_refunding: 0,
              is_refund_all: 0,
              is_hide: 0,
              activity_id: "",
              inc_id: 1,
              notice_arrival_at: 0,
              counter_reduce_price: 0,
              name: "徐凯",
              mobile: "18817559001",
              province: "",
              city: "上饶市",
              area: "信州区",
              address: "",
              detailed_address: "五三大道148号三清城1栋1单元2004",
              address_alias: "江西省上饶市信州区中山路",
              lat: "28.44909",
              lng: "117.97526",
              memberinfo: {
                name: "",
                remark_name: "",
                mobile: "18817559001",
                avatar:
                  "https://api.yfkjqhw.com/uploads/avatar/18817559001.jpeg",
                nickname: "徐凯",
                uuid: "be9a16387d7328c0ae128b6326c918e0",
              },
              shop_name: "恒创科技",
              shop_info: {
                id: 607,
                cid: 786,
                shop_name: "恒创科技",
                shop_logo:
                  "https://static.yfkjqh.com/uploads/786/image/20200616/7d92086ba13579343f437a944c2ac7a9.jpg",
                tag_ids: "",
                shop_content:
                  "一家集办公产品，监控产品，音响产品，电脑品牌机/组装机为一体的整体公司",
                shop_channel_id: 0,
                shop_notice: "做好的产品，为客户提供更好的服务。",
                shop_service_tel: "15279319939",
                shop_service_type: 1,
                shop_service_range: "",
                shop_service_idea: "",
                shop_service_distance: 50000,
                shop_service_support: "",
                shop_service_mode: "",
                shop_vip_price_rate: 0,
                shop_cpi: 0,
                shop_switch: 1,
                closed_reason: "",
                closed_time: 0,
                cancel_time: 0,
                makes_time: 1800,
                shop_delivery_price: 0,
                pack_price: 0,
                pack_fee_model: 1,
                shop_level_star: 2,
                business_circle_id: 0,
                recommend_keyword:
                  "恒创科技,电脑,维护,组装,监控,打印机,配件,耳机,鼠标,音响,键盘",
                manage_tags: "手机数码,电脑",
                recommend_tags: "手机数码",
                category_id: 4,
                category_path: "1,4",
                template: 1,
                trade_type: 1,
                province: "江西省",
                province_id: 36,
                city: "上饶市",
                city_id: 3611,
                area: "广信区",
                area_id: 361104,
                lat: "28.444096",
                lng: "117.918406",
                address: "江西省上饶市广信区旭日街道稻花路广信区第五小学",
                shop_credentials: "",
                business_hour: ",24小时营业",
                business_hour_json:
                  '{"dateText":"","weeks":[],"isAllday":true}',
                business_status: 0,
                takeout_booking_json: '{"switch":1,"day":3,"notice_time":1800}',
                shop_video:
                  '{"path":"https://static.yfkjqh.com/uploads/786/video/20200710/cfa038a73587d0b8ae6a8db52528e1d7.mp4","size":1237181,"name":"cfa038a73587d0b8ae6a8db52528e1d7.mp4"}',
                shop_image:
                  "https://static.yfkjqh.com/uploads/786/image/20200829/f251e6e843d7d7533d97d3249fb135c6.jpg,https://static.yfkjqh.com/uploads/786/image/20200829/a94e2f4c15c0a3853439f012044be1d3.jpg,https://static.yfkjqh.com/uploads/786/image/20200829/05aa0ea95a38f3cc7631e4ce750464d5.jpg,https://static.yfkjqh.com/uploads/786/image/20200829/fca0c43a6e1a54cd68c1c94d8b6a854a.jpg,https://static.yfkjqh.com/uploads/786/image/20200829/a67b7e928b65c944df85253555a17cde.jpg",
                score: 0,
                follow: 26,
                browse_num: 306,
                repurchase_user: 0,
                is_top: 0,
                is_show_group_menu: 0,
                top_sort: 0,
                content: null,
                group_buying_mobile: null,
                film_arrange_time: 0,
                refund_type: 0,
                refund_time: 0,
                refund_charge: 0,
                is_view_android: 1,
                is_view_ios: 1,
                is_view_mini: 1,
                is_view_h5: 1,
                refund_time_type: 0,
                create_at: 1592288011,
                update_at: 1649746108,
                is_only_show: 0,
              },
              express_info: null,
              gift: null,
              pack_address: {
                id: 1168,
                cid: 786,
                shop_name: "恒创科技",
                business_hour: ",24小时营业",
                name: "恒创科技",
                mobile: "15279319939",
                tel: "15279319939",
                province: "江西省",
                city: "上饶市",
                area: "广信区",
                address: "江西省上饶市广信区旭日北大道6号",
                lat: "28.453716",
                lng: "117.907715",
              },
              total_order_amount: 5300,
              total_merchant_reduce_amount: 0,
              total_platform_reduce_amount: 0,
              group_info: null,
              activity_log: [],
            },
            {
              id: 19993,
              cmid: 0,
              pmid: 1,
              oid: "4188642121417728",
              cid: 1452,
              area_code: 0,
              mid: 13653,
              order_type: 1,
              goods_price: 201200,
              express_method: 3,
              express_price: 200,
              pack_price: 0,
              charge_price: 0,
              pack_fee_model: 1,
              pick_up_address_id: 0,
              member_reduce_price: 0,
              platform_reduce_price: 0,
              consume_coupon_reduce_price: 0,
              merchant_reduce_price: 0,
              vouchers_reduce_price: 0,
              full_reduce_price: 0,
              groupleader_reduce_price: 0,
              multiple_reduce_price: 0,
              firstminus_reduce_price: 0,
              bargain_reduce_price: 0,
              combo_reduce_price: 0,
              total_combo_activity_price: 0,
              shopamount_reduce_price: 0,
              shopamount_info: '{"goods":0,"express":0,"pack":0}',
              discount_reduce_price: 0,
              member_delivery_time: "",
              member_remarks: "",
              shop_remarks: "",
              system_remarks: "",
              order_amount: 201400,
              payable_amount: 201400,
              pay_amount: 201400,
              pay_sn: "2021040322001405971440247311",
              pay_method: 3,
              pay_state: 1,
              pay_at: 1617430323,
              pay_oid: "4188642121417728_1452",
              cid_order_state: 1,
              channel: "",
              create_at: 1617430281,
              deliver_at: 0,
              finish_at: 0,
              other_tag: "0",
              combo_id: 0,
              combo_package_type: 0,
              live_roomid: "",
              platform_separate: "0.00",
              member_separate: "0.00",
              collection_separate: "0.00",
              firstminus_separat: "0.00",
              invite_price: 0,
              invite_code: "",
              is_completion: 0,
              completion_at: 0,
              refund_amount: 201200,
              is_refunding: 0,
              is_refund_all: 0,
              is_hide: 1,
              activity_id: "",
              inc_id: 3,
              notice_arrival_at: 0,
              counter_reduce_price: 0,
              name: "惠宜便利店",
              mobile: "13979394644",
              province: "江西省",
              city: "上饶市",
              area: "信州区",
              address: "信江明珠小区11栋1-101商铺(1号店面)",
              detailed_address: "信江明珠小区11栋1-101店面第一个店面 ",
              address_alias: "江西省上饶市信州区惠宜便利店",
              lat: "28.44826",
              lng: "117.963274",
              memberinfo: {
                name: "",
                remark_name: "",
                mobile: "17321276961",
                avatar: "https://static.yfkjqh.com/static/avatar.png",
                nickname: "牛奶",
                uuid: "2cc18417943b61fb960075b1658fa050",
              },
              shop_name: "信州区广顺食品经营批发",
              shop_info: {
                id: 1164,
                cid: 1452,
                shop_name: "信州区广顺食品经营批发",
                shop_logo:
                  "https://static.yfkjqh.com/app/wechat/f5f10284fbdd0eb4f1b15fd81bccf6.png",
                tag_ids: "",
                shop_content:
                  "一项具,装食品、装食品、毛制品工程、商汽、事售(许展务,鞋自依法经律法须禁限经活可1",
                shop_channel_id: 0,
                shop_notice: "",
                shop_service_tel: "15579413433",
                shop_service_type: 1,
                shop_service_range: "",
                shop_service_idea: "",
                shop_service_distance: 50000,
                shop_service_support: "3",
                shop_service_mode: "",
                shop_vip_price_rate: 0,
                shop_cpi: 0,
                shop_switch: 1,
                closed_reason: "",
                closed_time: 0,
                cancel_time: 10800,
                makes_time: 1800,
                shop_delivery_price: 0,
                pack_price: 0,
                pack_fee_model: 1,
                shop_level_star: 2,
                business_circle_id: 0,
                recommend_keyword: "",
                manage_tags: "",
                recommend_tags: "",
                category_id: 4,
                category_path: "1,4",
                template: 1,
                trade_type: 1,
                province: "江西省",
                province_id: 36,
                city: "上饶市",
                city_id: 3611,
                area: "信州区",
                area_id: 361102,
                lat: "28.475306",
                lng: "117.984320",
                address:
                  "江西省上饶市信州区食品一街 优牛上饶总代理-牛奶饮料批发",
                shop_credentials: "",
                business_hour: "周一,24小时营业",
                business_hour_json:
                  '{"dateText":"周一","weeks":[1],"isAllday":true}',
                business_status: 0,
                takeout_booking_json: '{"switch":1,"day":3,"notice_time":1800}',
                shop_video: "",
                shop_image: "",
                score: 0,
                follow: 6,
                browse_num: 606,
                repurchase_user: 0,
                is_top: 0,
                is_show_group_menu: 0,
                top_sort: 0,
                content: null,
                group_buying_mobile: null,
                film_arrange_time: 0,
                refund_type: 0,
                refund_time: 0,
                refund_charge: 0,
                is_view_android: 1,
                is_view_ios: 1,
                is_view_mini: 1,
                is_view_h5: 1,
                refund_time_type: 0,
                create_at: 1610679563,
                update_at: 1638833360,
                is_only_show: 0,
              },
              express_info: null,
              gift: null,
              total_order_amount: 201400,
              total_merchant_reduce_amount: 0,
              total_platform_reduce_amount: 0,
              group_info: null,
              activity_log: [],
            },
            {
              id: 15844,
              cmid: 0,
              pmid: 1,
              oid: "4079970846442496",
              cid: 37,
              area_code: 0,
              mid: 139,
              order_type: 1,
              goods_price: 6990,
              express_method: 3,
              express_price: 0,
              pack_price: 0,
              charge_price: 0,
              pack_fee_model: 1,
              pick_up_address_id: 0,
              member_reduce_price: 0,
              platform_reduce_price: 0,
              consume_coupon_reduce_price: 0,
              merchant_reduce_price: 0,
              vouchers_reduce_price: 0,
              full_reduce_price: 0,
              groupleader_reduce_price: 0,
              multiple_reduce_price: 0,
              firstminus_reduce_price: 0,
              bargain_reduce_price: 0,
              combo_reduce_price: 0,
              total_combo_activity_price: null,
              shopamount_reduce_price: 0,
              shopamount_info: '{"goods":0,"express":0,"pack":0}',
              discount_reduce_price: 0,
              member_delivery_time: "",
              member_remarks: "",
              shop_remarks: "",
              system_remarks: "",
              order_amount: 6990,
              payable_amount: 6990,
              pay_amount: 6990,
              pay_sn: "4200000913202101164571888502",
              pay_method: 1,
              pay_state: 1,
              pay_at: 1610797522,
              pay_oid: "4079970846442496",
              cid_order_state: 1,
              channel: "",
              create_at: 1610797513,
              deliver_at: 0,
              finish_at: 0,
              other_tag: "0",
              combo_id: 0,
              combo_package_type: 0,
              live_roomid: "efdfa506",
              platform_separate: "5.00",
              member_separate: "1.00",
              collection_separate: "0.00",
              firstminus_separat: "0.00",
              invite_price: 0,
              invite_code: "",
              is_completion: 0,
              completion_at: 0,
              refund_amount: 0,
              is_refunding: 1,
              is_refund_all: 0,
              is_hide: 0,
              activity_id: "",
              inc_id: 2,
              notice_arrival_at: 0,
              counter_reduce_price: 0,
              name: "李美津",
              mobile: "18870300105",
              province: "江西省",
              city: "上饶市",
              area: "广信区",
              address: "安居巷与旭日中大道交叉口北100米",
              detailed_address: "上饶县旭日街道第二菜场对面香香衣柜7店",
              address_alias: "香香衣柜女装部7",
              lat: "28.439627",
              lng: "117.919668",
              shop_name: "香香衣柜",
              shop_info: {
                id: 23,
                cid: 37,
                shop_name: "香香衣柜",
                shop_logo:
                  "http://api.yfkjqhw.com//uploads/logo/75/61cecc94933fa154a975c213441f30.jpeg",
                tag_ids: "",
                shop_content: "打造有品质的专属衣柜",
                shop_channel_id: 0,
                shop_notice: "",
                shop_service_tel: "18870300105",
                shop_service_type: 1,
                shop_service_range: "",
                shop_service_idea: null,
                shop_service_distance: 100000,
                shop_service_support: "1,3",
                shop_service_mode: "",
                shop_vip_price_rate: 0,
                shop_cpi: null,
                shop_switch: 1,
                closed_reason: "",
                closed_time: 0,
                cancel_time: 0,
                makes_time: 1800,
                shop_delivery_price: 0,
                pack_price: 0,
                pack_fee_model: 1,
                shop_level_star: 3,
                business_circle_id: 0,
                recommend_keyword: "",
                manage_tags: "服饰鞋袜",
                recommend_tags: "服饰鞋袜",
                category_id: 4,
                category_path: "1,4",
                template: 1,
                trade_type: 1,
                province: "江西省",
                province_id: 36,
                city: "上饶市",
                city_id: 3611,
                area: "上饶县",
                area_id: 361121,
                lat: "28.440788",
                lng: "117.919874",
                address: "广信区旭日中大道66号",
                shop_credentials: "",
                business_hour: "周一至周日,24小时营业",
                business_hour_json:
                  '{"dateText":"周一至周日","endTime":"22:00","isAllday":true,"isNextDay":false,"isNextDay1":false,"isNextDay2":false,"startTime":"09:00","weeks":[1,2,3,4,5,6,7]}',
                business_status: 1,
                takeout_booking_json: '{"switch":1,"day":3,"notice_time":1800}',
                shop_video: "",
                shop_image: "",
                score: 0,
                follow: 119,
                browse_num: 1991,
                repurchase_user: 5,
                is_top: 0,
                is_show_group_menu: 0,
                top_sort: 0,
                content: null,
                group_buying_mobile: null,
                film_arrange_time: 0,
                refund_type: 0,
                refund_time: 0,
                refund_charge: 0,
                is_view_android: 1,
                is_view_ios: 1,
                is_view_mini: 1,
                is_view_h5: 1,
                refund_time_type: 0,
                create_at: 1578132821,
                update_at: 1649492609,
                is_only_show: 0,
              },
              express_info: null,
              gift: null,
              total_order_amount: 6990,
              total_merchant_reduce_amount: 0,
              total_platform_reduce_amount: 0,
              group_info: null,
              activity_log: [],
            },
          ],
        };

        if (that.loading) {
          that.cancelLoading();
        }
        that.isRefresh = true;
        // }
      } catch (e) {
        console.log(e);
        that.isRefresh = true;
      }
    },
    cancelLoading() {
      setTimeout(() => {
        this.loading = false;
      }, 500);
    },
    timeFn() {
      this.timing = setInterval(() => {
        this.dateDay = formatTime(new Date(), "HH: mm: ss");
        this.dateYear = formatTime(new Date(), "yyyy-MM-dd");
        this.dateWeek = this.weekday[new Date().getDay()];
      }, 1000);
    },
    callback(e) {
      this.tabIndex = e;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/scss/index.scss";

.loading {
  margin: 20px 0;
  font-size: 20px;
  text-align: center;
}
.version {
  text-align: center;
  font-size: 14px;
  color: darkgray;
}
.left {
  position: relative;
  padding-left: 20px;
  .sub-title {
    margin-left: 60px;
    margin-top: 15px;
    font-size: 24px;
    color: #fc5800;
    text-shadow: 0 0 4px #fc5800;
  }
  .time {
    position: absolute;
    left: 20px;
    bottom: -40px;
    font-size: 18px;
    color: #fff;
  }
}
.top-text {
  font-size: 35px;
  color: #fff;
  margin: 10px;
  animation: changeshadow 1s ease-in infinite;
  /* 其它浏览器兼容性前缀 */
  -webkit-animation: changeshadow 1s linear infinite;
  -moz-animation: changeshadow 1s linear infinite;
  -ms-animation: changeshadow 1s linear infinite;
  -o-animation: changeshadow 1s linear infinite;
}
@keyframes changeshadow {
  0% {
    text-shadow: 0 0 4px #fff;
  }
  50% {
    text-shadow: 0 0 40px #fff;
  }
  100% {
    text-shadow: 0 0 4px #fff;
  }
}
/* 添加兼容性前缀 */
@-webkit-keyframes changeshadow {
  0% {
    text-shadow: 0 0 4px #fff;
  }
  50% {
    text-shadow: 0 0 40px #fff;
  }
  100% {
    text-shadow: 0 0 4px #fff;
  }
}
@-moz-keyframes changeshadow {
  0% {
    text-shadow: 0 0 4px #fff;
  }
  50% {
    text-shadow: 0 0 40px #fff;
  }
  100% {
    text-shadow: 0 0 4px #fff;
  }
}
@-ms-keyframes changeshadow {
  0% {
    text-shadow: 0 0 4px #fff;
  }
  50% {
    text-shadow: 0 0 40px #fff;
  }
  100% {
    text-shadow: 0 0 4px #fff;
  }
}
@-o-keyframes changeshadow {
  0% {
    text-shadow: 0 0 4px #fff;
  }
  50% {
    text-shadow: 0 0 40px #fff;
  }
  100% {
    text-shadow: 0 0 4px #fff;
  }
}

.center-txt {
  font-size: 50px;
}

::v-deep .ant-tabs-tab {
  font-size: 24px;
  padding: 12px 16px 6px 16px;
}
</style>
