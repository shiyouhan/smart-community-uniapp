import http from "@/lib/http";
const port = "8082/api"



//获取二手交流列表
export function getEs(data) {
	return http.get(port + "/community/sechand/Es", data);
}
//获取广场交流列表
export function getGc(data) {
	return http.get(port + "/community/Gc", data);
}

//获取拼车交流列表
export function getPc(data) {
	return http.get(port + "/community/car/Pc", data);
}
//获取互助交流列表
export function getHd(data) {
	return http.get(port + "/community/interact/Hd", data);
}
//获取广场交流详情
export function getcommunity(id) {
	return http.get(port + "/community/" + id);
}
//获取互助交流详情
export function getinteract(id) {
	return http.get(port + "/community/interact/" + id);
}
//获取二手交流详情
export function getsechand(id) {
	return http.get(port + "/community/sechand/" + id);
}
//获取拼车交流详情
export function getcar(id) {
	return http.get(port + "/community/car/" + id);
}

//获取评论
export function getComment(type, id, param) {
	return http.get(port + "/community/comment/" + type + '/' + id, param);
}
//发布评论
export function putComment(param) {
	return http.post(port + "/community/comment/add", param, 'json');
}

//收藏数
export function starCount(param) {
	return http.get(port + "/collection/count", param);
}

//点赞数
export function dzCount(param) {
	return http.get(port + "/praise/count", param);
}

//点赞
export function dzAdd(id, type) {
	return http.post(port + "/praise/add?article_id=" + id + "&type_id=" + type);
}

//收藏
export function starAdd(id, type) {
	return http.post(port + "/collection/add?article_id=" + id + "&type_id=" + type);
}

//发布广场帖子
export function postGc(param) {
	return http.post(port + "/community/insert", param);
}

// 发布互动帖子
export function postHz(param) {
	return http.post(port + "/community/interact/insert", param);
}

// 发布二手帖子
export function postEs(param) {
	return http.post(port + "/community/sechand/insert", param);
}

// 发布拼车帖子
export function postPc(param) {
	return http.post(port + "/community/car/insert", param);
}