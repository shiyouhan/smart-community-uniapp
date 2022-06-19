<template>
	<view>
		<view v-for="(item, index) in list" :key="index">

			<divider></divider>

			<view class="mx-2 u-m-b-0 bg-white flex flex-column u-p-38 rounded" @click="open(item.id)">
				<view class="flex justify-between">
					<view class="u-font-18">{{ item.repairTitle }}</view>
					<view class="text-theme u-font-14" v-if="item.status == 0">未处理</view>
					<view class="text-theme u-font-14" v-else-if="item.status == 1">已维修</view>
					<view class="text-theme u-font-14" v-else-if="item.status == 2">维修中</view>
				</view>
				<view class="u-font-14 text-grey my-2">{{ item.createTime }}</view>
				<view class="u-font-16">{{ item.repairContent }}</view>
				<view class="flex justify-around u-m-t-19" v-if="item.repairImg">
					<image :src="item.repairImg[0]" class="w-110"></image>
					<image :src="item.repairImg[1]" class="w-110"></image>
					<image :src="item.repairImg[2]" class="w-110"></image>
				</view>
				<view v-else></view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			list: Array,
			default: []
		},
		data() {
			return {

			}
		},
		methods: {
			open(id) {
				uni.navigateTo({
					url: `../repair-detail/repair-detail?id=${id}`
				})
			}
		}
	}
</script>

<style>
</style>
