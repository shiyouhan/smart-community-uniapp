import http from "@/lib/http";

const port = "8081/api"

// 上传头像
// export function uploadAvatar() {
// 	return http.post(port + "/avatar/upload");
// }

// 修改个人信息
export function personEdit(data) {
	return http.put(port + "/personal", data, 'json');
}

// 小区列表
export function getCommunity(params) {
	return http.get(port + "/personal/community", params);
}

// 切换小区
export function changeCommunity(data) {
	return http.put(port + "/personal/community", data, 'json');
}

// 家庭成员列表
export function getFamily(data) {
	return http.get(port + "/personal/family", data);
}

// 修改家庭成员
export function memberEdit(data) {
	return http.put(port + "/personal/family", data, 'json');
}

// 新增家庭成员
export function memberAdd(data) {
	return http.post(port + "/personal/family", data, 'json');
}

// 收藏列表
export function getCollection(data) {
	return http.get(port + "/personal/collection", data);
}

// 我的钱包
export function getWallet() {
	return http.get(port + "/personal/purse");
}

// 优惠券
export function getIntegration(data) {
	return http.get(port + "/personal/integration", data);
}

// 积分
export function getCoupon(data) {
	return http.get(port + "/personal/coupon", data);
}

// 签到记录
export function getSignList() {
	return http.get(port + "/personal/sign/in")
}

// 签到
export function signIn(data) {
	return http.post(port + "/personal/sign/in", data)
}

// 意见反馈
export function feedBack(data) {
	return http.post(port + "/personal/feedback", data)
}