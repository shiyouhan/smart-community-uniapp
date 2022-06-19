<template>
	<view>
		<events-list :list="list">
		</events-list>
	</view>
</template>

<script>
	import axios from "axios"
	import eventsList from "@/components/common/events-list.vue";
	export default {
		components: {
			eventsList
		},
		data() {
			return {
				list: []
			};
		},
		methods: {
			getActives() {
				axios({
					method: "GET",
					url: "http://106.14.169.149:8086/api/household/active/list",
					headers: {
						"token": this.$store.state.user.token
					},
					params: {
						page: 1,
						size: 999
					}
				}).then((res) => {
					console.log(res.data)
					this.list = res.data.data
				})
			}
		},
		mounted() {
			this.getActives();
		}
	}
</script>

<style lang="scss">

</style>
