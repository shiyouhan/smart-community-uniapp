<template>
	<view class="u-w-345 u-h-345 rounded bg-white flex align-center flex-column u-m-11">
		<view class="align-center">
			<image :src="item.img" class="border-txy u-w-345 u-h-267"></image>
		</view>
		<view class="align-center line-66">{{ item.way }}</view>
	</view>
</template>

<script>
	export default {
		props: {
			item: Object,
			index: Number
		},
		methods: {
			
		}
	}
</script>

<style>
</style>