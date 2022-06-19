<template>
	<view>
		<view v-for="(item, index) in list" :key="index">
			<view class="flex u-p-30 bg-white u-m-19">
				<view class="w-92">
					<image :src="item.src" class="w-92"></image>
				</view>
				<view class="u-p-l-19 flex-1">
					<view class="flex justify-between">
						<view class="flex flex-column justify-center">
							<view class="u-font-16 u-p-b-19">{{ item.name }}</view>
							<view class="flex u-font-12 text-grey">
								<view>起送 ¥20</view>
								<view class="u-p-l-19">配送 ¥ 4</view>
							</view>
						</view>
						<image :src="item.status" class="w-60"></image>
					</view>
					<view class="u-font-12 u-line-14 text-grey u-p-t-10">{{ item.content }}</view>
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
			
		}
	}
</script>

<style>
</style>