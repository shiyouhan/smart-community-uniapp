<template>
	<view>
		<divider></divider>
		<vip-list :list="list"></vip-list>
	</view>
</template>

<script>
	import vipList from "@/components/common/vip-list.vue"
	import {
		invitationRecord
	} from "@/api/parking/index.js"
	export default {
		components: {
			vipList
		},
		data() {
			return {
				list: [{
					"communityName": "万达金街",
					"invitationRecord": {
						"id": 1,
						"userId": 1,
						"communityId": 1,
						"parkingId": 1,
						"contact": "张三",
						"phone": "13651589590",
						"carNumber": "苏H2598",
						"remark": "",
						"state": 0,
						"startTime": "2022-05-17 19:50:27",
						"endTime": "2022-05-18 19:50:27",
						"createTime": "2022-06-02 18:36:33",
						"updateTime": "2022-06-02 18:36:33"
					}
				}]
			};
		},
		onLoad() {
			invitationRecord().then((res) => {
				this.list = JSON.parse(JSON.stringify(res.data))
			})
		}
	}
</script>

<style lang="scss">

</style>
