<template>
	<view>
		<view class="flex align-center justify-center flex-column u-p-b-76">
			<image class="py-20 w-70" src="/static/images/other/icon.png">
			<text class="version font-sm">Version 1.0.0</text>
		</view>
		
		<view>
			<uni-list-item title="用户协议" @tap="open('user-agreement')"></uni-list-item>
			<uni-list-item title="用户隐私" @tap="open('user-privacy')"></uni-list-item>
		</view>
	</view>
</template>

<script>
	import uniListItem from '@/components/common/uni-list-item.vue';
	export default {
		components: {
			uniListItem
		},
		data() {
			return {
				
			}
		},
		methods: {
			open(path) {
				uni.navigateTo({
					url: `../${path}/${path}`
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	
</style>
