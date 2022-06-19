<template>
	<view>
		<image src="../../static/images/other/bank.png" class="w-100 u-h-260"></image>
		
		<view class="flex justify-around u-font-14">
			<view class="flex align-center flex-column" @click="type_id = 1">
				<image src="../../static/images/other/phone.png" class="w-56 my-18"></image>
				<view>手机</view>
			</view>
			<view class="flex align-center flex-column" @click="type_id = 2">
				<image src="../../static/images/other/computer.png" class="w-56 my-18"></image>
				<view>电脑</view>
			</view>
			<view class="flex align-center flex-column" @click="type_id = 3">
				<image src="../../static/images/other/game.png" class="w-56 my-18"></image>
				<view>游戏</view>
			</view>
			<view class="flex align-center flex-column" @click="type_id = 4">
				<image src="../../static/images/other/digital.png" class="w-56 my-18"></image>
				<view>数码</view>
			</view>
			<view class="flex align-center flex-column" @click="type_id = 5">
				<image src="../../static/images/other/tool.png" class="w-56 my-18"></image>
				<view>工具</view>
			</view>
		</view>
		
		<show-list :list="list"></show-list>
	</view>
</template>

<script>
	import {
		getShop
	} from '@/api/shop'
	
	import showList from '@/components/common/shop-list.vue'
	
	export default {
		components: {
			showList
		},
		data() {
			return {
				type_id: 1
			};
		},
		asyncComputed: {
			list: {
				get() {
					return this.load(this.type_id)
				}
			}
		},
		onNavigationBarButtonTap(e) {
			uni.navigateTo({
				url: '../myshop/myshop'
			})
		},
		methods: {
			async load(e) {
				let res = await getShop({
					Index: 1,
					size: 2,
					type_id: e
				})
				if(!res && res.code !== 200) {
					this.$msg.toast(res.message)
					return []
				}
				return res.data
			}
		}
	}
</script>

<style lang="scss">

</style>
