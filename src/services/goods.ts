import { getData, postData } from "@/utils/request";

export const getGoods = (params: any) => getData("/api/goods.json", params);
