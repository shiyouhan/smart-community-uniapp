<template>
	<view>
		<view v-for="(item, index) in list" :key="index">
			<divider></divider>
			
			<view class="u-h-134 bg-white flex align-center u-p-38">
				<view class="flex">
					<image :src="item.avatar" class="w-42 rounded"></image>
				</view>
				<view class="flex u-p-l-19 justify-between flex-1 align-center">
					<view>
						<view class="flex u-p-b-12 align-baseline">
							<view class="u-font-14 u-p-r-26">{{ item.username }}</view>
							<view class="text-grey u-font-12">{{ item.phone }}</view>
						</view>
						<view class="text-grey u-font-12">{{ item.address }}</view>
					</view>
					<view class="iconfont icon-youjiantou u-font-12 text-grey"></view>
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
			return {}
		},
		computed: {
			data() {
				return this.list.map(e => {
					e.phone = e.phone.substr(0,3) + "****" + e.phone.substr(7)
					return e
				})
			}
		},
		methods: {

		}
	}
</script>

<style>
</style>
