import http from "@/lib/http";

const port = "8083/api"

// 获取我所提交的跳蚤商品订单记录
export function getOrder(data) {
	return http.get(port + "/fleaMarket/myOrder", data);
}

//获取跳蚤商品信息
export function getDetail(id){
	return http.get(port + "/fleaMarket/"+id );
}

//查询某类型商品
export function getTypegood(typeId,price,last,page,size){
	return http.get(port + "/fleaMarket/filter?typeId="+typeId+"&price="+price+"&last="+last+"&page="+page+"&size="+size);
}

// 新增跳蚤市场商品
export function goodsAdd(data) {
	return http.post(port + "/fleaMarketUni", data);
}

// 获取我的跳蚤商品收藏
export function getMaCollect(data) {
	return http.get(port + "/fleaMarket/mark", data);
}

// 添加跳蚤商品收藏
export function addMaCollect(id) {
    return http.post(port + "/fleaMarket/mark/" + id)
}

// 删除跳蚤商品收藏
export function delMaCollect(id) {
    return http.delete(port + "/fleaMarket/mark/" + id)
}

// 获取跳蚤商品的类型
export function goodsType() {
    return http.get(port + "/fleaGoodsType")
}

// 获取所有社区列表
export function getAllCommunity() {
    return http.get(port + "/allCommunity")
}