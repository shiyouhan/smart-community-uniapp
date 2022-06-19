<template>
	<view class="flex">
		<view>
			<image class="avatar rounded-circle" :src="item.avatar"></image>
		</view>
		<view class="flex-1 ml-2">
			<view class="font-sm">{{item.username}}</view>
			<text class="font-small text-light-muted">{{item.createTime}}</text>	
			<view class="font mt-1">{{item.content}}</view>
		</view>
		<!-- <view class="iconfont icon-31dianzan"></view> -->
	</view>
</template>

<script>
	export default {
		name:"comment",
		data() {
			return {
				
			};
		},
		props: {
			item: {
				type: Object
			},
		},
	}
</script>

<style lang="scss" scopend>
.avatar {
	width: 100rpx;
	height: 100rpx;
}
.iconfont {
	color: $uni-text-color-grey;
	margin-top: 20rpx;
}
</style>