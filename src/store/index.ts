import Vue from "vue";
import Vuex from "vuex";
import { IShoppingState } from "./modules/shopping";

Vue.use(Vuex);

export interface IRootState {
  shopping: IShoppingState;
}

// Declare empty store first, dynamically register all modules later.
export default new Vuex.Store<IRootState>({});
