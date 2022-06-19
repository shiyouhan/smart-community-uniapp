import http from "@/lib/http";

const port = "8088/api"

// 获取商店列表
export function getShop(data) {
	return http.get(port + "/shop/list/" + data.type_id, data);
}

// 获取商店所有商品
export function getGoodsList(data) {
	return http.get(port + "/shop/goodsList/" + data.Shop_Id, data);
}

// 查询全部订单
export function getOrder() {
	return http.get(port + "/order/list");
}

// 根据状态查询订单
export function getOrderStatus(data) {
	return http.get(port + "/order/status", data);
}

// 根据状态查询订单
export function orderDelete(data) {
	return http.post(port + "/order/update", data);
}

// 获取收货地址列表
export function getAddress(data) {
	return http.get(port + "/address/list", data);
}