<template>
	<view>
		<view v-for="(item, index) in list" :key="index">
			<view class="flex bg-white rounded mx-2 u-m-t-19 align-center" @click="getData(item)">
				<image :src="item.imgurl" class="w-92 border-x"></image>
				<view class="flex flex-column flex-1 justify-center u-p-38">
					<view class="flex justify-between">
						<view class="u-font-16">{{ item.name }}</view>
						<view v-if="item.status == 0">
							<view class="u-font-12 px-2 py-04 border rounded-22 text-grey">已打烊</view>
						</view>
						<view v-else>
							<view class="u-font-12 px-2 py-04 border-theme rounded-22 text-theme">营业中</view>
						</view>
					</view>
					<view class="flex justify-between u-font-12 text-grey py-2">
						<view>月销售{{ item.sales }}单</view>
						<view>2.1KM 15分钟</view>
					</view>
					<view class="flex u-font-12 text-grey">
						<view>起送 ¥20</view>
						<view class="u-p-l-19">配送 ¥ 4</view>
					</view>
					<view v-if="item.intro.length < 0">{{ item.intro }}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			list: {
				type: Array,
				default: () => []
			},
		},
		methods: {
			getData(item) {
				// let { status } = item
				// if(status == 0) return
				// let aa = {
				// 	...item,
				// 	aasd: 1
				// }
				if(item.status == 0) return
				uni.navigateTo({
					url: '../shop-detail/shop-detail?item=' + JSON.stringify(item)
				})
			}
		}
	}
</script>

<style>
</style>