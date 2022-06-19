<template>
	<view>
		<view v-for="(item, index) in list" :key="index">
			<parkspace-list-item :item="item" :index="index">
			</parkspace-list-item>
		</view>
	</view>
</template>

<script>
	import parkspaceListItem from "@/components/common/parkspace-list-item.vue"
	import {
		manageCarport
	} from "@/api/parking/index.js"
	export default {
		components: {
			parkspaceListItem
		},
		data() {
			return {
				list: []
			};
		},
		// 监听点击导航栏设置按钮
		onNavigationBarButtonTap(e) {
			uni.navigateTo({
				url: '../rental-parkspace/rental-parkspace'
			})
		},
		onLoad() {
			this.init()
		},
		methods: {
			init() {
				manageCarport().then((res) => {
					this.list = res.data
				})
			}
		}
	}
</script>

<style lang="scss">

</style>
