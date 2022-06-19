const state = {
	communityInfo: uni.getStorageSync('communityInfo') ? uni.getStorageSync('communityInfo') : {},
	familyList: []
}
const getters = {
	['GET_COMMUNITIES'](state) {
		return state.communityList
	},
	['GET_FAMILIES'](state) {
		return state.familyList
	}
}
const mutations = {
	// 设置 communities
	['SET_COMMUNITIES'](state, payload) {
		state.communityInfo = payload.communityInfo
		uni.setStorageSync('communityInfo', state.communityInfo);
	},
	['SET_FAMILIES'](state, payload) {
		state.familyList = payload.familyList
	},
	// 退出登录
	['LOGOUT'](state, payload) {
		uni.removeStorageSync('communityInfo');
	}
}
const actions = {}

export default {
	namespaced: true,
	state,
	getters,
	mutations,
	actions
}
