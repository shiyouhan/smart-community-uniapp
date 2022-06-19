<template>
	<view class="u-w-679 u-h-146 rounded bg-white u-m-38 u-p-l-44">
		<view class="flex algin-center justify-between u-p-t-30">
			<view class="u-p-b-22 u-font-16">{{ item.name }}</view>
			<view class="u-p-r-40 u-font-16 text-danger">{{ item.way || '' }}</view>
		</view>
		<view class="u-font-14 text-grey">{{ item.createTime }}</view>
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

<style lang="scss" scoped>

</style>