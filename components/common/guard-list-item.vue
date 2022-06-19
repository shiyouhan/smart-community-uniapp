<template>
	<view class="flex card u-w-200 u-h-156  u-font-16 u-m-b-19 align-center justify-center flex-column border rounded">
		<view class="text-grey">{{ item.id }}</view>
		<view class="u-m-t-19">{{ item.guard }}门禁</view>
	</view>
</template>

<script>
	export default {
		props: {
			item: Object
		},
		methods: {
			
		}
	}
</script>

<style lag="scss" scoped>
	.card {
		background-image: url('../../static/images/other/suo.png');
		background-size: 50% 50%;
		background-repeat: no-repeat;
		background-position: center bottom;
		background-color: #f3f3fa;
		margin-left: 19rpx !important;
		margin-right: 19rpx !important;
	}
</style>