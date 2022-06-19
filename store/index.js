import Vue from 'vue'
import Vuex from 'vuex'

// 导入模块
import user from '@/store/modules/user'
import info from '@/store/modules/info'

Vue.use(Vuex)

export default new Vuex.Store({
	modules: {
		user,
		info
	}
})
