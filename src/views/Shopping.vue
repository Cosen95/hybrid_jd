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
  created() {
    console.log("购物车数据", this.shoppingDatas);
  }
  private onNumberChange($arguments: any, item: goodsItemType, index: number) {
    let number = $arguments[0];
    ShoppingModule.changeShoppingDataNumber({
      index,
      number
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
