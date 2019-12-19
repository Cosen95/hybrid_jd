<template>
  <!-- 瀑布流布局
1、创建商品列表的基本html和css，让item相对于goods(div)进行排列(相对布局)
2、生成不同高度的图片，撑起不同高度的item
3、计算item的位置，来达到从上到下、从左到右依次排列的目的 -->
  <div
    class="goods"
    :class="[layoutClass, { 'goods-scroll': isScroll }]"
    ref="goods"
    :style="{ height: goodsViewHeight }"
  >
    <div
      class="goods-item"
      :class="layoutItemClass"
      v-for="(item, index) in sortGoodsData"
      :key="index"
      ref="goodsItem"
      :style="goodsItemStyles[index]"
      @click="onItemClick(item)"
    >
      <!-- 图片 -->
      <img
        class="goods-item-img"
        :src="item.img"
        alt=""
        :style="imgStyles[index]"
      />
      <!-- description 描述 -->
      <div class="goods-item-desc">
        <p class="goods-item-desc-name text-line-2">
          <!-- 是否为直营 -->
          <direct v-if="item.isDirect"></direct>
          <!-- 是否有库存 -->
          <no-have v-if="!item.isHave"></no-have>
          {{ item.name }}
        </p>
        <div class="goods-item-desc-data">
          <p class="goods-item-desc-data-price">
            ￥{{ item.price | priceValue }}
          </p>
          <p class="goods-item-desc-data-volume">销量：{{ item.volume }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import { getGoods } from "@/services/goods";
import Direct from "@c/goods/Direct.vue";
import NoHave from "@c/goods/NoHave.vue";
import { goodsItemType } from "@/types/common.d.ts";

@Component({
  name: "Goods",
  components: {
    Direct,
    NoHave
  }
})
export default class extends Vue {
  /**
   * 在父元素中指定的展示形式
   * 1：垂直列表
   * 2：网格布局
   * 3：瀑布流布局
   */
  @Prop({ default: "1" }) private layoutType!: string;
  /**
   * 是否允许 goods 单独滑动
   * 默认允许 goods 单独滑动
   */
  @Prop({ default: true }) private isScroll!: boolean;
  @Prop({ default: "1" }) private sort!: string;

  private dataSource = []; // 数据源
  private sortGoodsData = []; // 排序数据
  private imgStyles = []; // 图片样式集合
  private MAX_IMG_HEIGHT = 230; // 最大高度
  private MIN_IMG_HEIGHT = 178; // 最小高度
  private ITEM_MARGIN_SIZE = 8; // item margin
  private goodsItemStyles = []; // item 样式集合
  private goodsViewHeight = "100%"; // goods 组件的高度
  // 不同展示形式下的类名
  // 1、垂直列表的展示形式（默认） -> goods-list & goods-list-item.
  // 2、网格布局的展示形式 -> goods-grid & goods-grid-item
  private layoutClass = "goods-list";
  private layoutItemClass = "goods-list-item";

  async created() {
    await getGoods({}).then(res => {
      console.log("商品详情", res);
      this.dataSource = res.data.list;
      // 数据排序
      this.setSortGoodsData();
      // 设置布局
      this.initLayout();
    });
  }
  @Watch("layoutType")
  private onLayoutTypeChange(value: string) {
    this.initLayout();
  }

  @Watch("sort")
  private onSortChange() {
    this.setSortGoodsData();
  }

  private onItemClick(item: goodsItemType) {
    //  商品无库存不允许跳转
    if (!item.isHave) {
      alert("该商品无库存");
      return;
    }
    this.$router.push({
      name: "goodsDetail",
      params: {
        goods: item
      }
    });
  }
  private getSortGoodsDataFromKey(key: string) {
    this.sortGoodsData.sort((goods1, goods2) => {
      let v1 = goods1[key];
      let v2 = goods2[key];
      // 对 value 进行对比，
      // boolean 类型的值（有货优先和直营优先）
      if (typeof v1 === "boolean") {
        if (v1) {
          return -1;
        }
        if (v2) {
          return 1;
        }
        return 0;
      }
      // float 类型值的处理（价格、销量）
      if (parseFloat(v1) >= parseFloat(v2)) {
        return -1;
      }
      return 1;
    });
  }
  private setSortGoodsData() {
    switch (this.sort) {
      // 默认
      case "1":
        // 深拷贝，不改变原数组
        this.sortGoodsData = this.dataSource.slice(0);
        break;
      // 价格由高到低
      case "1-2":
        this.getSortGoodsDataFromKey("price");
        break;
      // 销量由高到低
      case "1-3":
        this.getSortGoodsDataFromKey("volume");
        break;
      // 有货优先
      case "2":
        this.getSortGoodsDataFromKey("isHave");
        break;
      // 直营优先
      case "3":
        this.getSortGoodsDataFromKey("isDirect");
        break;
    }
  }
  private initLayout() {
    // 初始化数据
    this.goodsViewHeight = "100%";
    this.goodsItemStyles = [];
    this.imgStyles = [];
    switch (this.layoutType) {
      case "1": // 垂直列表
        this.layoutClass = "goods-list";
        this.layoutItemClass = "goods-list-item";
        break;
      case "2": // 网格布局
        this.layoutClass = "goods-grid";
        this.layoutItemClass = "goods-grid-item";
        break;
      case "3": // 瀑布流布局
        this.layoutClass = "goods-waterfall";
        this.layoutItemClass = "goods-waterfall-item";
        this.initImgStyles();
        this.$nextTick(() => {
          this.initWaterfall();
        });
        break;
    }
  }
  // 返回图片的随机高度
  private imgHeight(): number {
    // Math.random() -> 0 - 1 随机数 * (高度区间) + 最低的图片高度
    let result = Math.floor(
      Math.random() * (this.MAX_IMG_HEIGHT - this.MIN_IMG_HEIGHT) +
        this.MIN_IMG_HEIGHT
    );
    return result;
  }
  // 根据随机的图片高度，生成对应的图片样式数据
  private initImgStyles() {
    this.dataSource.forEach(item => {
      let imgHeight = this.imgHeight() + "px";
      this.imgStyles.push({
        height: imgHeight
      });
    });
  }
  // 瀑布流布局
  // 1、获取到所有的item元素
  // 2、遍历item元素，得到每一个item的高度，加上一个margin的高度
  // 3、创建两个变量：leftHeightTotal、rightHeightTotal，分别表示左右两侧目前距离顶部的距离。分别对比左右两侧距离顶部的距离，来确定item的放置位置
  // 如果左侧小于等于右侧高度的话（leftHeightTotal <= rightHeightTotal）,那么 item 就应该放置到左侧。此时 item 距离左侧为0，距离顶部为当前的 leftHeightTotal。否则 ，item 放置到右侧，此时 item 距离右侧为 0， 距离顶部为当前的 rightHeightTotal。
  // 4、保存计算出的 item 的所有样式，配置到 item 上。
  // 5、item 配置完成之后，对比左右两侧最大的高度，最大的高度为 goods 组件的高度
  private initWaterfall() {
    // 获取到所有的item元素
    let $goodsItems = this.$refs.goodsItem;
    if (!$goodsItems) return;
    // 左右两侧距离顶部的距离
    let leftHeightTotal = 0;
    let rightHeightTotal = 0;
    $goodsItems.forEach(($el, index) => {
      // item样式
      let goodsItemStyle = {};
      // 遍历 item 元素，得到每一个 item 的高度，加上一个 margin 的高度
      let elHeight = $el.clientHeight + this.ITEM_MARGIN_SIZE;
      // 对比 左右两侧距离顶部的高度
      if (leftHeightTotal <= rightHeightTotal) {
        // item 就应该放置到左侧。此时 item 距离左侧为0，距离顶部为当前的 leftHeightTotal
        goodsItemStyle = {
          left: "0px",
          top: leftHeightTotal + "px"
        };
        // 更新左侧距离顶部的高度
        leftHeightTotal += elHeight;
      } else {
        // item 距离右侧为 0， 距离顶部为当前的 rightHeightTotal。
        goodsItemStyle = {
          right: "0px",
          top: rightHeightTotal + "px"
        };
        // 更新右侧距离顶部的高度
        rightHeightTotal += elHeight;
      }

      // 保存计算出的 item 的所有样式，配置到 item 上。
      this.goodsItemStyles.push(goodsItemStyle);
    });

    // 在不允许 Goods 单独滑动的时候
    if (!this.isScroll) {
      // 对比左右两侧最大的高度，最大的高度为 goods 组件的高度
      this.goodsViewHeight =
        (leftHeightTotal > rightHeightTotal
          ? leftHeightTotal
          : rightHeightTotal) + "px";
    }
  }
}
</script>

<style lang="scss" scoped>
.goods {
  background-color: $bgColor;
  &-scroll {
    overflow: hidden;
    overflow-y: auto;
  }
  &-item {
    background-color: white;
    padding: $marginSize;
    box-sizing: border-box;
    &-desc {
      width: 100%;
      &-name {
        font-size: $infoSize;
        line-height: px2rem(18);
      }
      &-data {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-top: $marginSize;

        &-price {
          font-size: $titleSize;
          color: $mainColor;
          font-weight: 500;
        }

        &-volume {
          font-size: $infoSize;
          color: $hintColor;
        }
      }
    }
  }
}
// 垂直列表
.goods-list {
  &-item {
    display: flex;
    border-bottom: 1px solid $lineColor;

    .goods-item-img {
      width: px2rem(120);
      height: px2rem(120);
    }

    .goods-item-desc {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding: $marginSize;
    }
  }
}
// 网格布局
.goods-grid {
  padding: $marginSize;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  &-item {
    width: 49%;
    border-radius: $radiusSize;
    margin-bottom: $marginSize;

    .goods-item-img {
      width: 100%;
    }
  }
}
// 瀑布流
.goods-waterfall {
  position: relative;
  margin: $marginSize;

  &-item {
    position: absolute;
    width: 49%;
    border-radius: $radiusSize;

    .goods-item-img {
      width: 100%;
    }
  }
}
</style>
