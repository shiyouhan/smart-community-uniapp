<template>
	<view>
		<view class="tabbar">
			<view v-for="(item, index) in tabBars" class="tabbar-item"
				:key="index"
				:class="tabIndex === index ? 'text-theme line' : ''"
				@tap="changeTab(index)">
				{{item.name}}
			</view>
		</view>
		
		<swiper class="swiper" :current="tabIndex" :disable-touch='true'>
			<swiper-item>
				<scroll-view class="swiper" :scroll-y="true">
					<view v-if="orderList.length > 0">
						<view v-for="(item1, index1) in orderList" :key="index1">
							<order-list-item :item="item1" @delete="onDelete">
							</order-list-item>
						</view>
					</view>
					<view v-if="orderList.length == 0" class="flex justify-center u-m-t-104">
						<image src="../../static/images/other/null.png" class="w-166"></image>
					</view>
				</scroll-view>
			</swiper-item>
			<swiper-item>
				<scroll-view class="swiper" :scroll-y="true">
					<view v-if="orderList1.length > 0">
						<view v-for="(item1, index1) in orderList1" :key="index1">
							<order-list-item :item="item1" @delete="onDelete">
							</order-list-item>
						</view>
					</view>
					<view v-if="orderList1.length == 0" class="flex justify-center u-m-t-104">
						<image src="../../static/images/other/null.png" class="w-166"></image>
					</view>
				</scroll-view>
			</swiper-item>
			<swiper-item>
				<scroll-view class="swiper" :scroll-y="true">
					<view v-if="orderList1.length > 0">
						<view v-for="(item1, index1) in orderList1" :key="index1">
							<order-list-item :item="item1" @delete="onDelete">
							</order-list-item>
						</view>
					</view>
					<view v-if="orderList1.length == 0" class="flex justify-center u-m-t-104">
						<image src="../../static/images/other/null.png" class="w-166"></image>
					</view>
				</scroll-view>
			</swiper-item>
			<swiper-item>
				<scroll-view class="swiper" :scroll-y="true">
					<view v-if="orderList1.length > 0">
						<view v-for="(item1, index1) in orderList1" :key="index1">
							<order-list-item :item="item1" @delete="onDelete">
							</order-list-item>
						</view>
					</view>
					<view v-if="orderList1.length == 0" class="flex justify-center u-m-t-104">
						<image src="../../static/images/other/null.png" class="w-166"></image>
					</view>
				</scroll-view>
			</swiper-item>
			<swiper-item>
				<scroll-view class="swiper" :scroll-y="true">
					<view v-if="orderList1.length > 0">
						<view v-for="(item1, index1) in orderList1" :key="index1">
							<order-list-item :item="item1" @delete="onDelete">
							</order-list-item>
						</view>
					</view>
					<view v-if="orderList1.length == 0" class="flex justify-center u-m-t-104">
						<image src="../../static/images/other/null.png" class="w-166"></image>
					</view>
				</scroll-view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	import {
		getOrder,
		getOrderStatus
	} from '@/api/shop'
	import orderListItem from  "@/components/common/order-list-item.vue"
	export default {
		components: {
			orderListItem
		},
		data() {
			return {
				tabIndex: 0,
				// 顶部选项卡
				tabBars: [
					{
						name: "全部",
					},
					{
						name: "未处理",
					},
					{
						name: "处理中",
					},
					{
						name: "已完成",
					},
					{
						name: "已取消"
					}
				],
				orderList1: [],
				shopId: 1
				//status: 1
			};
		},
		asyncComputed: {
			orderList: {
				get() {
					return this.load(this.shopId)
				},
				default: []
			},
			orderList1: {
				get() {
					return this.load1(this.status)
				},
				default: []
			}
		},
		methods: {
			// 切换选项卡
			changeTab(index) {
				if (this.tabIndex === index) {
					return;
				}
				console.log(index)
				this.tabIndex = index
				console.log(this.tabIndex)
			},
			async load(e) {
				let res = await getOrder({
					shopId: e
				})
				if(!res && res.code !== 200) {
					this.$msg.toast(res.message)
					return []
				}
				return res.data
			},
			async load1() {
				let res = await getOrderStatus({
					status: this.tabIndex
				})
				if(!res && res.code !== 200) {
					this.$msg.toast(res.message)
					return []
				}
				return res.data
			},
			onDelete(id) {
				for (let i in this.orderList) {
					if(this.orderList[i].id == id) {
						this.$delete(this.orderList, i);
						break
					}
				}
				for (let i in this.orderList1) {
					if(this.orderList1[i].id == id) {
						this.$delete(this.orderList1, i);
						break
					}
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.tabbar {
		width: 100%;
		display: flex;
		align-items: center;
	}
	
	.tabbar-item {
		padding: 16rpx 0rpx;
		width: 20%;
		display: flex;
		align-items: center;
		justify-content: center;
		position: relative;
		margin: 0rpx 14rpx;
	}
	
	.line {
		border-bottom: 4rpx solid $primary;
	}
	.swiper {   
		height: calc(100vh - 106rpx - 80rpx);
	}
</style>
