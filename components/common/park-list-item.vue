<template>
	<view class="u-w-714 u-h-168 bg-white flex mx-2 rounded align-center u-m-b-19">
		<view class="u-w-184 u-h-168 bg-green text-white border-x flex align-center justify-center flex-column">
			<view class="u-font-52 text-center line-28 font-400 ">{{ item.carports }}</view>
			<view class="u-font-14 text-center line-14 u-p-t-19">剩余车位</view>
		</view>
		<view class="flex flex-1">
			<view class="flex-1 flex justify-center flex-column px-4">
				<view class="flex">
					<view class="u-font-18  u-m-r-10">{{ item.communityName }}</view>
					<view class="u-w-84 u-h-30 border line-10 rounded-22 u-m-t-8 distant">
						<text class="u-font-10 text-grey px-1 ">{{ item.distant }}</text>
					</view>

				</view>
				<view class="flex u-p-t-10 align-center">
					<view class="text-grey u-m-r-26">总车位数</view>
					<view class="u-font-10 text-grey u-m-t-8">{{ item.totalCarports }}</view>
				</view>
			</view>
			<view class="u-w-138 u-h-168 flex align-center justify-center cursor" @click="to">
				<image src="../../static/images/other/parking-daohang.png" class="w-36"></image>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			item: Object,
			index: Number
		},
		methods: {
			to() {
				uni.navigateTo({
					url: '/pages/park-map/park-map'
				})
			}
		}
	}
</script>

<style>
	.meter {
		padding: 0rpx 26rpx;
		line-height: 36rpx;
	}

	.distant {
		text-overflow: ellipsis;
		white-space: nowrap;
		width: 120rpx;
	}

	.cursor {
		cursor: pointer;
	}
</style>
