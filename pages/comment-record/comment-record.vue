<template>
	<view>
		<comment-list :list="list">
		</comment-list>
	</view>
</template>

<script>
	// import axios from "axios";
	import commentList from "@/components/common/comment-list.vue";
	export default {
		components: {
			commentList
		},
		data() {
			return {
				list: []
			};
		},
		methods: {
			
			getComplainData() {
				uni.request({
					method:'GET',
					url:'http://106.14.169.149:8086/api/household/complain/list',
					header:{
						"token": this.$store.state.user.token
					},
					data: {
						page: 1,
						size: 999,
					},
					success: (res) => {
						this.list = res.data.data.records;
					}
				})
				// axios({
				// 	method: "GET",
				// 	url: "http://106.14.169.149:8086/api/household/complain/list",
				// 	headers: {
				// 		"token": this.$store.state.user.token
				// 	},
				// 	params: {
				// 		page: 1,
				// 		size: 999
				// 	}
				// }).then((res) => {
				// 	// console.log(res.data)
				// 	this.list = res.data.data.records
				// })
			}
		},
		mounted() {
			this.getComplainData()
		}
	}
</script>

<style lang="scss">

</style>
