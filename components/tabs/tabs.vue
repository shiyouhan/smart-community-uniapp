<template>
	<view>
		<view class="content_items">
			<view class="content_item" v-for="(item,index) in tabs" :key="item.index"
				:class="item.isActive ? 'active' : ''" :style="item.isActive ? 'color: #f5820f;': ''"
				@tap="handlerActive(item.index)">
				{{item.value}}
			</view>
		</view>

	</view>
</template>
<script>
	export default {
		data() {
			return {

			};
		},
		props: {
			tabs: {
				type: Array,
				default: []
			}
		},
		methods: {
			handlerActive(index) {
				this.$emit('tabActive', index)
			}
		}
	}
</script>

<style lang="scss">
	.content_items {
		position: fixed;
		left: 0;
		z-index: 999;
		background-color: #FFFFFF;

		.content_item {
			width: 25vw;
			height: 90rpx;
			text-align: center;
			float: left;
			padding: 20rpx 0;
			color: #aaaaaa;
		}
	}

	.active {
		border-bottom: 5rpx solid #f5820f;
	}
</style>
