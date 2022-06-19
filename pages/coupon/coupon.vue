<template>
	<view>
		<view class="w-100 flex align-center">
			<view v-for="(item, index) in tabBars" 
				class="py-2 width-50 flex align-center justify-center u-rela mx-8"
				:key="index"
				:class="tabIndex === index ? 'text-theme line' : ''"
				@tap="changeTab(index)">
				{{item.name}}
			</view>
		</view>
		
		<swiper class="swiper" :current="tabIndex" :disable-touch='true'>
			<swiper-item>
				<view v-for="(item, index) in list.filter(e => !e.isExpired)" :key="index">
					<coupon-list-item :item="item" :index="index">
					</coupon-list-item>
				</view>
				<view v-if="!list.filter(e => !e.isExpired).length" class="flex justify-center u-m-t-104">
					<image src="../../static/images/other/null.png" class="w-166"></image>
				</view>
			</swiper-item>
			<swiper-item>
				<view v-for="(item, index) in list.filter(e => e.isExpired)" :key="index">
					<coupon-list-item :item="item" :index="index">
					</coupon-list-item>
				</view>
				<view v-if="!list.filter(e => e.isExpired).length" class="flex justify-center u-m-t-104">
					<image src="../../static/images/other/null.png" class="w-166"></image>
				</view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	import {
		getCoupon
	} from '@/api/info'
	
	import couponListItem from "@/components/common/coupon-list-item.vue"
	export default {
		components: {
			couponListItem
		},
		data() {
			return {
				tabIndex: 0,
				// 顶部选项卡
				tabBars: [
					{
						name: "可用",
					},
					{
						name: "过期",
					}
				],
				list: []
			}
		},
		onLoad() {
			this.load()
		},
		methods: {
			// 切换选项卡
			changeTab(index) {
				if (this.tabIndex === index) {
					return;
				}
				this.tabIndex = index
				this.load()
			},
			load() {
				const data = {
					isExpired: this.tabIndex ? true : false
				}
				getCoupon(data).then(res => {
					if (res.code === 200) {
						this.list = res.data
					} else {
						this.$msg.toast(res.message)
						return false
					}
				})
			}
		}
	}
</script>

<style>
	.tabbar {
		width: 100%;
		display: flex;
		align-items: center;
	}
	
	.tabbar-item {
		padding: 20rpx 0rpx;
		width: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		position: relative;
		margin: 0rpx 60rpx;
	}
	
	.line {
		border-bottom: 4rpx solid $primary;
	}
	.swiper {   
		height: calc(100vh - 106rpx - 80rpx);
	}
</style>
