<template>
	<view class="u-m-t-19">
		<view v-for="item in list" :key="item.id">
			<view class="flex bg-white rounded mx-2" @click="getData(item)">
				<image :src="item.imageUrl" class="u-w-186 u-h-174 border-x flex"></image>
				<view class="flex flex-1">
					<view class="flex flex-column u-h-174 justify-center px-4 flex-1 u-w-10">
						<view class="content-one">{{ item.title }}</view>
						<view class="iconfont icon-dingwei flex u-font-12 text-grey my-2">
							<view>{{ item.address }}</view>
						</view>
						<view class="text-grey u-font-12">普通住宅</view>
					</view>
					<view class="flex align-center u-w-195 u-h-174 justify-center flex-column">
						<view class="text-danger">{{ item.price }}</view>
						<view class="u-font-12 text-grey">元/m²</view>
					</view>
				</view>
			</view>
			<divider></divider>
		</view>
	</view>
</template>

<script>
	// import {
	// 	getEstateDetail
	// } from '@/api/service'
	export default {
		props: {
			list: {
				type: Array,
				default: () => []
			},
		},
		data() {
			return {
				
			}
		},
		onLoad() {
			this.load();
		},
		methods: {
			getData(item) {
				uni.navigateTo({
					url: '../estate-detail/estate-detail?id=' + item.id
				})
			}
		}
	}
</script>

<style>
</style>