<template>
	<view>
		<repair-list :list="list">
		</repair-list>
	</view>
</template>

<script>
	// import axios from "axios"
	import repairList from "@/components/common/repair-list.vue"
	export default {
		components: {
			repairList
		},
		data() {
			return {
				list: []
			};
		},
		methods: {
			getRepairList() {
				uni.request({
					method: 'GET',
					url: 'http://106.14.169.149:8086/api/household/repair/list',
					header: {
						"token": this.$store.state.user.token
					},
					params: {
						page: 1,
						size: 999,
					},
					success: (res) => {
						this.list = res.data.data.records;
					}
				})
				// axios({
				// 	method: "GET",
				// 	url: "/repair/list",
				// 	headers: {
				// 		"token": this.$store.state.user.token
				// 	},
				// 	params: {
				// 		page: 1,
				// 		size: 999
				// 	}
				// }).then((res)=>{
				// 	console.log(res.data)
				// 	this.list = res.data.data.records
				// 	console.log(res.data.data.records)
				// })
			}
		},
		onLoad() {
			this.getRepairList();
		}
	}
</script>

<style lang="scss">

</style>
