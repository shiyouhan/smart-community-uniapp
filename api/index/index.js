import http from "@/lib/http";

const port = "8084/api"


// 广告列表
export function advertisingList(params) {
	return http.get(port + "/index/advertising/" + params);
}

// 资讯列表
export function newsList(params) {
	return http.get(port + "/index/news", params)
}

// 资讯详情
export function newsDetail(params) {
	return http.get(port + '/index/news/detail', params)
}

// 资讯评论
export function newsComments(params) {
	return http.get(port + "/index/news/comment/" + params)
}

//发表评论
export function addComments(data) {
	return http.post(port + '/index/news/comment', data, 'json')
}

// 评论点赞
export function addThump(data) {
	return http.post(port + '/index/news/comment/thumpUp', data, 'json')
}

// 取消点赞
export function cancelThump(data) {
	return http.post(port + '/index/news/comment/cancelThumpUp', data, 'json')
}

//获取当前用户的小区
export function getCurrent() {
	return http.get(port + '/index/community')
}