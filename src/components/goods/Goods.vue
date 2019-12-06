<template>
  <!-- 瀑布流布局
1、创建商品列表的基本html和css，让item相对于goods(div)进行排列(相对布局)
2、生成不同高度的图片，撑起不同高度的item
3、计算item的位置，来达到从上到下、从左到右依次排列的目的 -->
  <div class="goods goods-waterfall">
    <div
      class="goods-item goods-waterfall-item"
      v-for="(item, index) in dataSource"
      :key="index"
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
          <!-- 是否有库存 -->
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
import { Component, Prop, Vue } from "vue-property-decorator";
import { getGoods } from "@/services/goods";

@Component({
  name: "Goods",
  components: {}
})
export default class extends Vue {
  private dataSource = [];
  private imgStyles = [];
  private MAX_IMG_HEIGHT = 230;
  private MIN_IMG_HEIGHT = 178;
  async created() {
    await getGoods({}).then(res => {
      console.log("商品详情", res);
      this.dataSource = res.data.list;
    });
    await this.initImgStyles();
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
}
</script>

<style lang="scss" scoped>
.goods {
  background-color: $bgColor;

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
