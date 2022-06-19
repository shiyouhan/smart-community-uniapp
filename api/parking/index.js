import http from "@/lib/http";
const port = "8085/api/"



// 查看附近停车场
export function parkList(data) {
	return http.post(port + "park/parkingList", data);
}

// 查看车位管理
export function manageCarport(data) {
	return http.get(port + "park/manageCarport", data);
}

// 查看停车卡信息
export function parkCard(data) {
	return http.get(port + "park/card", data);
}

// 查看可租赁车位
export function carRental(data) {
	return http.get(port + "park/selectCarRental", data);
}

// 租赁车位
export function rental(data) {
	return http.post(port + "park/carRental", data);
}

// 贵宾邀请
export function invitationAdd(data) {
	return http.post(port + "invitation/add", data);
}

// 贵宾邀请小区名称
export function parkName(data) {
	return http.get(port + "park/parkName", data);
}


// 贵宾邀请记录
export function invitationRecord(data) {
	return http.get(port + "invitation/record", data);
}

