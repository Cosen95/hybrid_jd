import {
  VuexModule,
  Module,
  Action,
  Mutation,
  getModule
} from "vuex-module-decorators";
import store from "@/store";
import { goodsItemType } from "@/types/common.d.ts";

export interface IShoppingState {
  shoppingDatas: goodsItemType[];
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
  private addShoppingData(goods: goodsItemType) {
    // 设置token
    this.shoppingDatas.push(goods);
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
