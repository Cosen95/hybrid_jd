<template>
  <div class="shopping">
    <navigation-bar :pageName="'购物车'" :isShowBack="false"></navigation-bar>
    <div class="shopping-content">
      <div class="shopping-content-list">
        <!-- 商品 -->
        <div
          class="shopping-content-list-item"
          v-for="(item, index) in shoppingDatas"
          :key="index"
        >
          <!-- check -->
          <img
            class="shopping-content-list-item-check"
            :src="checkImg(item.isCheck)"
            @click="onGoodsCheckClick(item)"
            alt=""
          />
          <!-- 图片 -->
          <img class="shopping-content-list-item-img" :src="item.img" alt="" />

          <!-- 描述 -->
          <div class="shopping-content-list-item-desc">
            <!-- 名称 -->
            <p class="shopping-content-list-item-desc-name text-line-2">
              <!-- 直营 -->
              <direct v-if="item.isDirect"></direct>
              {{ item.name }}
            </p>

            <div class="shopping-content-list-item-desc-data">
              <!-- 价格 -->
              <p class="shopping-content-list-item-desc-data-price">
                ￥{{ item.price | priceValue }}
              </p>
              <!-- 商品数量的控制组件 -->
              <number-manage
                :defaultNumber="item.number"
                @onChangeNumber="onNumberChange(arguments, item, index)"
              ></number-manage>
            </div>
          </div>
        </div>
      </div>
      <!-- 统计 -->
      <div class="shopping-content-total">
        <!-- 全选的 check -->
        <div class="shopping-content-total-check">
          <img
            :src="checkImg(totalData.isAll)"
            alt=""
            @click="onAllCheckClick"
          />
          <p>全选</p>
        </div>

        <!-- 总价格 -->
        <div class="shopping-content-total-price">
          <p class="shopping-content-total-price-total">
            合计：<span>￥{{ totalData.totalPrice | priceValue }}</span>
          </p>
          <p class="shopping-content-total-price-all">
            总额：
            <span>￥{{ totalData.totalPrice | priceValue }}</span>
            &nbsp;&nbsp; 立减<span>￥0.00</span>
          </p>
        </div>

        <!-- 结算 -->
        <div class="shopping-content-total-commit">
          去结算({{ totalData.goodsNumber }})
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { ShoppingModule } from "@/store/modules/shopping";
import NavigationBar from "@c/currency/NavigationBar.vue";
import Direct from "@c/goods/Direct.vue";
import NumberManage from "@c/goods/NumberManage.vue";
import { goodsItemType } from "@/types/common.d.ts";

@Component({
  name: "Shopping",
  components: {
    NavigationBar,
    Direct,
    NumberManage
  }
})
export default class extends Vue {
  get shoppingDatas() {
    return ShoppingModule.shoppingDatas;
  }
  private totalData = {
    // 是否全选
    isAll: false,
    // 总价格
    totalPrice: 0,
    // 总数量
    goodsNumber: 0
  };
  created() {
    console.log("购物车数据", this.shoppingDatas);
  }
  private onNumberChange($arguments: any, item: goodsItemType, index: number) {
    let number = $arguments[0];
    ShoppingModule.changeShoppingDataNumber({
      index,
      number
    });
    // 在商品数量发生变化时，并且 该商品处于选中状态下
    if (item.isCheck) {
      this.computeGoodsTotal();
    }
  }
  private onGoodsCheckClick(item: goodsItemType) {
    // 商品按钮点击事件
    item.isCheck = !item.isCheck;
    this.computeGoodsTotal();
  }
  private onAllCheckClick() {
    // 全选按钮点击事件
    this.totalData.isAll = !this.totalData.isAll;

    // 为每个商品设置选中标记 为当前是否全选标记
    this.shoppingDatas.forEach(item => (item.isCheck = this.totalData.isAll));
    this.computeGoodsTotal();
  }
  private checkImg(isCheck: boolean) {
    // check按钮点击图标
    return isCheck ? require("@imgs/check.svg") : require("@imgs/no-check.svg");
  }
  private computeGoodsTotal() {
    // 计算总价格
    // 先去初始化 totalData 的数据,让是否全选默认为 true，当存在商品没有被选中的时候，则把 isAll 变为 false。
    this.totalData = {
      // 是否全选
      isAll: true,
      // 总价格
      totalPrice: 0,
      // 总数量
      goodsNumber: 0
    };
    this.shoppingDatas.forEach(item => {
      // 如果商品处于选中状态下，则计算该商品总价格和数量
      if (item.isCheck) {
        this.totalData.totalPrice += Number(item.price) * Number(item.number);
        this.totalData.goodsNumber += Number(item.number);
      }
      // 如果有商品处于未选中状态下，那么则把 isAll 变为 false
      else {
        this.totalData.isAll = false;
      }
    });
  }
}
</script>

<style lang="scss" scoped>
.shopping {
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-flow: column;

  &-content {
    background-color: $bgColor;
    border-top: px2rem(1) solid $lineColor;
    height: 100%;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;

    // 商品列表
    &-list {
      height: 100%;
      overflow: hidden;
      overflow-y: auto;

      &-item {
        background-color: white;
        padding: $marginSize;
        display: flex;
        border-bottom: px2rem(1) solid $lineColor;

        &-check {
          width: $checkSize;
          align-self: center;
          padding: px2rem(6);
        }

        &-img {
          width: $listGoodsImgSize;
          height: $listGoodsImgSize;
        }

        &-desc {
          width: 100%;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 0 $marginSize;

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
          }
        }
      }
    }

    // 总计
    &-total {
      height: px2rem(56);
      box-sizing: border-box;
      display: flex;
      align-items: center;
      background-color: white;
      border-top: px2rem(1) solid $lineColor;

      &-check {
        display: flex;
        align-items: center;
        margin: 0 $marginSize;

        img {
          width: $checkSize;
          height: $checkSize;
          padding: px2rem(6);
        }

        p {
          font-size: $infoSize;
        }
      }

      &-price {
        flex-grow: 2;
        display: flex;
        flex-direction: column;

        &-total {
          font-size: $titleSize;
          margin-bottom: px2rem(6);

          span {
            font-weight: bold;
          }
        }

        &-all {
          font-size: $minInfoSize;
          span {
            font-weight: bold;
          }
        }
      }

      &-commit {
        width: px2rem(120);
        height: 100%;
        font-size: $titleSize;
        background-color: $mainColor;
        color: white;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
  }
}
</style>
