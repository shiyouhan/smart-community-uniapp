<template>
	<view class="member bg-white">
		<view class="left">
			<view class="name">{{ item.name }}</view>
			<view class="phone">{{ item.phone }}</view>
		</view>
		
		<view class="right">
			<view class="iconfont icon-bianjisekuai" @click="getData(item)"></view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			item: Object,
			index: Number
		},
		data() {
			return {

			}
		},
		methods: {
			getData(item) {
				const data = {
					id: this.item.id,
					name: this.item.name,
					phone: this.item.phone
				};
				uni.navigateTo({
					url: '../member-edit/member-edit?item=' + JSON.stringify(data)
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.member {
		height: 138rpx;
		margin: 0rpx 22rpx;
		border: 2rpx solid #b9bcb2;
		border-radius: 10rpx;
		position: relative;
		
		.left {
			position: absolute;
			padding-left: 44rpx;
			
			.name {
				font-size: 28rpx;
				padding-top: 24rpx;
			}
			
			.phone {
				padding-top: 24rpx;
				font-size: 22rpx;
			}
		}
		
		.right {
			float: right;
			.iconfont {
				padding: 48rpx 0;
				padding-right: 40rpx;	
			}
		}
	}
	
	.member:last-child {
		margin-bottom: 0rpx;
	}
</style>