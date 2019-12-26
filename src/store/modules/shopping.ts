import {
  VuexModule,
  Module,
  Action,
  Mutation,
  getModule
} from "vuex-module-decorators";
import Vue from "vue";

import store from "@/store";
import { goodsItemType } from "@/types/common.d.ts";

export interface IShoppingState {
  shoppingDatas: goodsItemType[];
}

export interface shoppingDataNumber {
  index: number;
  number: number;
}

// @Module 标记当前为module
// module本身有几种可以配置的属性
// 1、namespaced:boolean 启/停用 分模块
// 2、stateFactory:boolean 状态工厂
// 3、dynamic:boolean 在store创建之后，再添加到store中。 开启dynamic之后必须提供下面的属性
// 4、name:string 指定模块名称
// 5、store:Vuex.Store实体 提供初始的store
@Module({ dynamic: true, store, name: "shopping" })
class Shopping extends VuexModule implements IShoppingState {
  // 在需要引用的地方单独引用该store文件即可注入。
  // 好处：灵活使用，仅仅在需要引入的地方才注入到store中去
  // 缺点：需要单独引入文件

  /* 这里代表的就是state里面的状态 */

  public shoppingDatas: goodsItemType[] = [];
  // @Mutation 标注为mutation
  @Mutation
  public addShoppingData(goods: goodsItemType) {
    /// 判断购物车中是否已经包含该商品，如果购物车已经包含了该商品，那么应该让商品的数量 + 1
    const isExist = this.shoppingDatas.some(item => {
      // 该商品已经存在于 购物车中
      if (item.id === goods.id) {
        item.number += 1;
        return true;
      }
    });
    // 只有当购物车中不包含该商品的时候，才让 商品 push 到 shoppingDatas
    if (!isExist) {
      // 为商品新增属性
      // isCheck: 表示商品是否选中
      // number：表示商品的数量
      // 通过 Vue.set 的方法可以把新添加的属性变为响应式的数据。
      // 如果直接通过 goods.isCheck = false;，那么 isCheck 就不是响应式的数据。
      Vue.set(goods, "isCheck", false);
      Vue.set(goods, "number", 1);
      this.shoppingDatas.push(goods);
    }
  }

  @Mutation
  public changeShoppingDataNumber(data: shoppingDataNumber) {
    /**
     * data: {
     * index: 指定的商品下标,
     * number : 商品数量
     * }
     */
    this.shoppingDatas[data.index].number = data.number;
  }

  // @Action
  // public async LogOut() {
  //   // 注销
  //   if (this.token === "") {
  //     throw Error("LogOut: token is undefined!");
  //   }
  //   await logout();
  //   removeToken();
  //   this.SET_TOKEN("");
  //   this.SET_ROLES([]);
  // }
}

// getModule 得到一个类型安全的store，module必须提供name属性
export const ShoppingModule = getModule(Shopping);
