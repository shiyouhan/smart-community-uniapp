<template>
	<view style="height: calc(100vh - 95rpx);" class="flex flex-column">
		<view class="flex bg-white rounded mx-2 my-2">
			<image :src="shop.imgurl" class="w-92 border-x"></image>
			<view class="flex flex-column flex-1 justify-center u-p-38">
				<view class="flex justify-between">
					<view class="u-font-16">{{ shop.name }}</view>
					<view class="u-font-12 px-2 py-04 border-theme rounded-22 text-theme">营业中</view>
				</view>
				<view class="flex u-font-12 text-grey">
					<view>起送 ¥20</view>
					<view class="u-p-l-19">配送 ¥ 4</view>
				</view>
				<view class="u-font-12 text-grey">{{ shop.intro }}</view>
			</view>
		</view>
		
		<view class=" bg-white border-top flex-1">
			<view class="choose-tab">
				<view class="choose-item" v-for="(item,index) in list" :key="index"
				:class="chooseTab == index ? 'active' : ''" :data-choose="index" @click="clickTab">
					{{item.name}}
				</view>
			</view>
			
			<view class="neirong">
				<scroll-view class="lunbo" scroll-y="true" :style="{height: height + 'px'}">
					<goods-list :list="goodsList" :tab="chooseTab">
					</goods-list>
				</scroll-view>
			</view>
		</view>
		
		<view class="bar flex align-center justify-between u-h-90 bg-white fixed-bottom">
			<view class="u-m-l-38 flex align-center">
				<view class="iconfont icon-gouwuche-tianchong u-p-r-19 text-theme u-font-50"></view>
				<view>
					<view class="u-font-14 text-danger">¥{{ sum }}.00</view>
					<view class="u-font-12 text-grey">配送费4元</view>
				</view>
			</view>
			<view class="u-w-154 u-h-64 u-line-35 text-white bg-theme text-center rounded u-m-r-22"
				@click="getData(shop)">选好了</view>
		</view>
	</view>
</template>

<script>
	import {
		getGoodsList
	} from '@/api/shop'
	
	import goodsList from "@/components/common/goods-list.vue";
	export default {
		components: {
			goodsList
		},
		data() {
			return {
				shop: {},
				goodsList: [],
				Shop_Id: 1,
				chooseTab: 0, //当前选中的选项卡：默认选中第一个~
				list: [
					{"id":1,"name":"全部"},
					{"id":2,"name":"零食"},
					{"id":3,"name":"水果"},
					{"id":4,"name":"蔬菜"},
				],
				height: 0
			};
		},
		mounted() {
			let _that = this

			uni.getSystemInfo({
				success(res) {
					let winHeight = res.windowHeight
					let viewSelector = uni.createSelectorQuery().select('.uni-scroll-view')
					let barSelector = uni.createSelectorQuery().select('.bar')
					viewSelector.boundingClientRect(view => {
						barSelector.boundingClientRect(e => {
							_that.height = winHeight - view.top - e.height
						}).exec()
					}).exec()
				}
			})
		},
		onLoad(e) {
			this.shop = JSON.parse(e.item);
		},
		asyncComputed: {
			goodsList: {
				get() {
					return this.load(this.Shop_Id)
				}
			},
			sum: {
				get() {
					let sum = 0
					if(this.goodsList) {
						for(let i of this.goodsList) {
							if(i.number && i.number > 0)
								sum += (i.number * i.price)
						}
					}
					return sum
				}
			}
		},
		methods: {
			clickTab(e) { //点击切换
				this.chooseTab = e.target.dataset.choose;
			},
			getData(shop) {
				let goods = this.goodsList.filter(e => e.number > 0)
				uni.navigateTo({
					url: '../payment-detail/payment-detail?shop=' + JSON.stringify(shop) + '&goods=' + JSON.stringify(goods)
				})
			},
			async load(e) {
				let res = await getGoodsList({
					Index: 1,
					size: 10,
					Shop_Id: e
				})
				if(!res && res.code !== 200) {
					this.$msg.toast(res.message)
					return []
				}
				return res.data
			}
		}
	}
</script>

<style lang="scss">
	.choose-tab {
		position: absolute;
		width: 154rpx;
		height: 76rpx;
		line-height: 76rpx;
		text-align: center;	
	}
	.choose-item {
		background-color: #F7F7F7;
	}
	.active {
		background-color: white;
		border-left: 4rpx solid #f5820f;
	}
	.neirong {
		margin-left: 154rpx;
		padding: 15rpx;
		background-color: #ffffff;
	}
</style>
