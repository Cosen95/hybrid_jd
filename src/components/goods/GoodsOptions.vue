<template>
  <div class="goods-options">
    <!-- 一级筛选选项 -->
    <ul class="goods-options-list">
      <li
        class="goods-options-list-item"
        v-for="(item, index) in optionsDatas"
        :key="index"
      >
        <a
          class="goods-options-list-item-content"
          @click="onOptionsItemClick(item, index)"
        >
          <span
            class="goods-options-list-item-content-name"
            :class="{
              'goods-options-list-item-content-name-active':
                selectOptions.id === item.id
            }"
            >{{ item.name }}</span
          >
          <span
            class="goods-options-list-item-content-caret caret"
            v-if="item.subs.length > 0"
            :class="[
              isShowSubContent && selectOptions.id === item.id
                ? 'goods-options-list-item-content-caret-open'
                : 'goods-options-list-item-content-caret-close'
            ]"
          ></span>
        </a>
      </li>
    </ul>
    <!-- 子选项内容 -->
    <transition name="fold-height">
      <div class="options-sub-content z-index-2" v-show="isShowSubContent">
        <ul class="options-sub-content-list">
          <li
            class="options-sub-content-list-item"
            v-for="(item, index) in selectOptions.subs"
            :key="index"
          >
            <a
              class="options-sub-content-list-item-content"
              @click="onSubOptionsItemClick(item, index)"
            >
              <span
                class="options-sub-content-list-item-content-name"
                :class="{
                  'options-sub-content-list-item-content-name-active':
                    selectOptions.id === item.id
                }"
                >{{ item.name }}</span
              >
              <img
                class="options-sub-content-list-item-content-select"
                src="@imgs/options-select.svg"
                v-show="selectOptions.id === item.id"
              />
            </a>
          </li>
        </ul>
      </div>
    </transition>
    <!-- 遮盖层 -->
    <div
      class="cover"
      v-show="isShowSubContent"
      @click="isShowSubContent = false"
    ></div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import { goodsOption } from "@/types/common.d.ts";

@Component({
  name: "GoodsOptions",
  components: {}
})
export default class extends Vue {
  // 筛选项数据源
  private optionsDatas = [
    {
      id: "1",
      name: "默认",
      subs: [
        {
          id: "1",
          name: "默认"
        },
        {
          id: "1-2",
          name: "价格由高到低"
        },
        {
          id: "1-3",
          name: "销量由高到低"
        }
      ]
    },
    {
      id: "2",
      name: "有货优先",
      subs: []
    },
    {
      id: "3",
      name: "直营优先",
      subs: []
    }
  ];
  // 选中的筛选项
  private selectOptions: goodsOption = {};
  // 标记子选项是否处于展开状态
  private isShowSubContent: boolean = false;

  @Watch("selectOptions", { deep: true })
  onSelectOptionsChange(val: goodsOption) {
    this.$emit("optionsChange", val.id);
  }

  // 一级选项点击事件
  private onOptionsItemClick(item: goodsOption, index: number) {
    // 如果子选项处于展开状态，则关闭子选项视图
    if (this.isShowSubContent) {
      this.isShowSubContent = false;
      return;
    }

    if (
      item.subs &&
      item.subs.length > 0 &&
      this.selectOptions.id === item.id
    ) {
      this.isShowSubContent = true;
    }

    this.selectOptions = item;
  }

  // 子选项点击事件
  private onSubOptionsItemClick(item: any, index: number) {
    this.selectOptions = item;
    this.optionsDatas.forEach(options => {
      options.subs.forEach(subOptions => {
        if (subOptions.id === this.selectOptions.id) {
          options.id = subOptions.id;
          options.name = subOptions.name;
        }
      });
    });
    this.isShowSubContent = false;
  }
  created() {
    this.selectOptions = this.optionsDatas[0];
  }
}
</script>

<style lang="scss" scoped>
.goods-options {
  width: 100%;
  border-bottom: 1px solid $lineColor;

  // 一级选项 css
  &-list {
    display: flex;
    width: 100%;
    height: px2rem(46);
    background-color: white;

    &-item {
      flex-grow: 1;

      &-content {
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;

        &-name {
          font-size: $infoSize;
          margin-right: $marginSize;

          &-active {
            color: $mainColor;
          }
        }

        // 三角形的动画
        &-caret {
          // 子选项展开时，三角形的动画
          &-open {
            transform: rotate(-180deg);
            transition: all 0.3s;
          }
          // 子选项关闭时，三角形的动画
          &-close {
            transform: rotate(0deg);
            transition: all 0.3s;
          }
        }
      }
    }
  }

  // 子选项 css
  .options-sub-content {
    position: absolute;
    width: 100%;
    max-height: px2rem(180);
    overflow: hidden;
    overflow-y: auto;
    background-color: white;

    &-list {
      &-item {
        &-content {
          display: flex;
          align-items: center;
          border-top: 1px solid $lineColor;
          padding: $marginSize;
          height: px2rem(44);
          box-sizing: border-box;

          &-name {
            font-size: $infoSize;
            display: inline-block;
            flex-grow: 1;

            &-active {
              color: $mainColor;
            }
          }

          &-select {
            width: px2rem(18);
            height: px2rem(18);
          }
        }
      }
    }
  }

  // 子选项内容展开动画，当  v-if/v-show="true" 时候 调用
  .fold-height-enter-active {
    animation-duration: 0.3s;
    animation-name: fold-height-open;
  }

  @keyframes fold-height-open {
    0% {
      max-height: 0;
    }
    100% {
      max-height: px2rem(180);
    }
  }

  // 子选项内容关闭的动画，当 v-if/v-show="false" 时候调用
  .fold-height-leave-active {
    animation-duration: 0.3s;
    animation-name: fold-height-close;
  }

  @keyframes fold-height-close {
    0% {
      max-height: px2rem(180);
    }
    100% {
      max-height: 0;
    }
  }
}
</style>
