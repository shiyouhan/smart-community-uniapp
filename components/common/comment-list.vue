<template>
	<view>
		<view v-for="(item, index) in list" :key="index">
			<view class="u-w-714 bg-white mx-2 u-m-t-19 u-p-38 rounded" @click="open(item.id)">
				<view class="flex justify-between">
					<view class="text-grey u-font-12 u-p-b-30">{{ item.createTime }}</view>
					<view class="text-danger u-font-14" v-if="item.status == 0">未回复</view>
					<view class="text-success u-font-14" v-if="item.status == 1">已回复</view>
				</view>
				<view class="u-font-16">{{ item.complainContent }}</view>
				<view class="flex justify-around u-m-t-19" v-if="item.complainImg">
					<image :src="item.complainImg[0]" class="w-110"></image>
					<image :src="item.complainImg[1]" class="w-110"></image>
					<image :src="item.complainImg[2]" class="w-110"></image>
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
					url: `../comment-detail/comment-detail?id=${id}`
				})
			}
		}
	}
</script>

<style>
</style>
