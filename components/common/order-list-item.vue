<template>
	<view class="u-m-38 bg-white rounded u-p-38 u-h-308">
		<view class="flex justify-between">
			<view class="flex algin-center">
				<view class="iconfont icon-shangdian u-font-16 text-grey"></view>
				<text class="u-font-12 px-1">{{ shop.name}}</text>
				<view class="iconfont icon-youjiantou u-font-16 px-1"></view>
			</view>
			<view class="flex">
				<text class="u-font-12" v-if="item.status == 1">未处理</text>
				<text class="u-font-12 text-danger" v-else-if="item.status == 2">处理中</text>
				<text class="u-font-12 text-theme" v-else-if="item.status == 3">已完成</text>
				<text class="u-font-12 text-grey" v-else>已取消</text>
				<!-- <text class="u-font-12">{{ item.status}}</text> -->
			</view>
		</view>
		
		<view class="flex u-m-t-19">
			<image class="u-w-193 u-h-145 py-1 flex" :src="item.imgurl"/>
			<view class="flex-1 u-m-l-19 flex justify-between">
				<view class="">
					<text class="title  u-font-14">{{ item.name }}</text>
					<!-- <text class="specification float-l u-font-12 py-1">{{ item.specification }}</text> -->
				</view>
				<view class="u-font-12 flex flex-column align-end">
					<text class="u-m-b-19">¥{{ item.price }}</text>
					<!-- <text class="amount float-r text-grey">×{{ goodList.number }}</text> -->
					<text class="text-grey">×1</text>
					<text v-if="item.orderId == 0">{{ item.orderId }}</text>
				</view>
			</view>
		</view>
		<view class="flex float-r">
			<button class="u-h-48 u-font-14 line-26" @click="deleteOrder">删除订单</button>
			<button class="u-h-48 u-font-14 bg-theme text-white line-26 u-m-l-30" v-if="item.status == 2">确认收货</button>
			<button class="u-h-48 u-font-14 bg-white text-theme line-26 u-m-l-30" v-if="item.status == 3">已收货</button>
			<view v-else></view>
		</view>
	</view>
</template>

<script>
	import {
		orderDelete
	} from '@/api/shop'
	export default {
		props: {
			item: Object,
			listName: String,
			index: Number
		},
		data() {
			return {
				shop: {},
				goodList: []
			};
		},
		onLoad(e) {
			this.shop = JSON.parse(e.item);
		},
		methods: {
			deleteOrder() {
				const data = {
					id: this.item.id
				}
				orderDelete(data).then(res => {
					this.$emit('delete', this.item.id)
				})
			}
		}
	}
</script>

<style lang="scss">
	
</style>