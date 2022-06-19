<template>
	<view>
		<view class="flex justify-around u-m-19">
			<view v-for="(item, index) in wayList" :key="index">
				<service-list-item :item="item" :index="index">
				</service-list-item>
			</view>
		</view>
		
		<view class="flex justify-around u-m-19">
			<view v-for="(item, index) in wayList1" :key="index">
				<service-list-item :item="item" :index="index">
				</service-list-item>
			</view>
		</view>
	</view>
</template>

<script>
	import serviceListItem from "@/components/common/service-list-item.vue";
	export default {
		components: {
			serviceListItem
		},
		data() {
			return {
				wayList: [
					{
						id: 1,
						src: '../../static/images/other/wuye.png',
						title: '物业缴费',
						content: '在线缴费',
						page: '/pages/property-payment/property-payment',
						color: '#6579f8'
					},
					{
						id: 2,
						src: '../../static/images/other/baoxiu.png',
						title: '在线报修',
						content: '快速报修',
						page: '/pages/online-repair/online-repair',
						color: '#f7695f'
					}
				],
				wayList1: [
					{
						id: 1,
						src: '../../static/images/other/shequ.png',
						title: '社区活动',
						content: '活动投票',
						page: '/pages/community-events/community-events',
						color: '#7ed86e'
					},
					{
						id: 2,
						src: '../../static/images/other/tousu.png',
						title: '投诉建议',
						content: '意见反馈',
						page: '/pages/comment/comment',
						color: '#6297f8'
					}
				]
			};
		},
		methods: {
		}
	}
</script>

<style lang="scss">
	.card {
		margin-right: 19rpx;
	}
	
	.card:nth-child(n+1) {
		margin-right: 0rpx;
	}
</style>
