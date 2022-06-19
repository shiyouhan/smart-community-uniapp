<template>
	<view>
		<view class="u-w-345 u-h-160 flex align-center rounded bg-white" @click="open">
			<view class="u-w-12 u-h-160 u-m-r-26 border-x" :style="{'background-color':item.color}"></view>
			<image :src="item.src" class="w-34 u-m-r-30"></image>
			<view class="">
				<view class="u-font-18 u-p-b-6">{{ item.title }}</view>
				<view class="u-font-14 text-grey">{{ item.content }}</view>
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
			open() {
				uni.navigateTo({
					url: this.item.page
				})
			}
		}
	}
</script>

<style>
</style>