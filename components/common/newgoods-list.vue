<template>
	<view>
		<view>
			<view v-for="goods in list" :key="goods.id">
				<view class="flex border-bottom u-m-b-14">
					<view>
						<image :src="goods.imgurl" class="w-62 rounded"></image>
					</view>
					<view class="flex flex-column justify-center u-p-l-14 flex-1">
						<view class="u-font-16">{{ goods.name }}</view>
						<view class="flex justify-between  u-p-t-22 align-baseline">
							<view class="flex u-font-14">
								<view class="text-danger">¥{{ goods.price }}.00</view>
								<view class="text-grey">/包</view>
							</view>
							<view class="flex">
								<view class="text-grey u-font-12 u-p-r-26">×{{ goods.number }}</view>
								<view class="text-grey u-font-12">¥{{ goods.price }}.00</view>
							</view>
						</view>
					</view>
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
			}
		},
		data() {
			return {
				
			}
		},
		onLoad(e) {
			this.goods = JSON.parse(e.shop1);
		},
		methods: {
			
		}
	}
</script>

<style>
</style>