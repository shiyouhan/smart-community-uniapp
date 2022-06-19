<template>
	<view>
		<myshop-list :list="list"></myshop-list>
	</view>
</template>

<script>
	import myshopList from "@/components/common/myshop-list.vue"
	export default {
		components: {
			myshopList
		},
		data() {
			return {
				list: [
					{
						id: 1,
						src: '../../static/images/other/myshop.png',
						name: '双龙超市',
						status: '../../static/images/other/status_1.png',
						content: '公告简介公告简介公告简介公告简介公告简介公告简介公告简介公告简介'
					},
					{
						id: 2,
						src: '../../static/images/other/myshop.png',
						name: '双龙超市',
						status: '../../static/images/other/status_2.png',
						content: '公告简介公告简介公告简介公告简介公告简介公告简介公告简介公告简介'
					},
					{
						id: 3,
						src: '../../static/images/other/myshop.png',
						name: '双龙超市',
						status: '../../static/images/other/status_3.png',
						content: '公告简介公告简介公告简介公告简介公告简介公告简介公告简介公告简介'
					}
				]
			};
		}
	}
</script>

<style lang="scss">

</style>
