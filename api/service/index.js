import http from "@/lib/http";

const port = "8087/api"

// 获取房产信息
export function getEstate(params) {
	return http.get(port + "/estate", params);
}

// 获取房产信息详情
export function getEstateDetail(id) {
	return http.get(port + "/estate/" + id);
}

// 获取我的房产收藏
export function getEsCollect(data) {
	return http.get(port + "/estate/marks/", data);
}

// 添加房产收藏
export function addEsCollect(id) {
	return http.post(port + "/estate/mark/"+id);
}

// 删除房产收藏
export function deleteEsCollect(id) {
	return http.delete(port + "/estate/mark/"+id);
}