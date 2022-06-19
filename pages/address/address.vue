<template>
	<view>
		<view v-if="addressInfo.status == 1" class="bg-danger">
			<view class="flex">
				<image :src="addressInfo.avatar" class="w-42 rounded"></image>
			</view>
			<view class="flex u-p-l-19 justify-between flex-1 align-center">
				<view>
					<view class="flex u-p-b-12 align-baseline">
						<view class="u-font-14 u-p-r-26">{{ addressInfo.username }}</view>
						<view class="text-grey u-font-12">{{ addressInfo.phone }}</view>
					</view>
					<view class="text-grey u-font-12">{{ addressInfo.address }}</view>
				</view>
				<view class="iconfont icon-youjiantou u-font-12 text-grey"></view>
			</view>
		</view>
		
		<address-list :list="addressList"></address-list>
	</view>
</template>

<script>
	import {
		getAddress
	} from '@/api/shop'
	import addressList from "@/components/common/address-list.vue"
	export default {
		components: {
			addressList
		},
		data() {
			return {
				addressList: [],
				addressInfo: [],
				list: [],
				IndexNum: 1,
				sizeNum: 9,
				more: true
			};
		},
		onLoad() {
			uni.getSystemInfo({
				success: res => {
					this.scrollH = res.windowHeight - uni.upx2px(101);
				}
			});
			setTimeout(function() {
				console.log('开启下拉刷新');
			}, 1000);
			uni.startPullDownRefresh();
			this.load()
		},
		onReachBottom() {
			if (!this.more) {
				uni.showToast({
					title: '已经是底部了',
					duration: 1000
				});
				return false;
			}
			this.IndexNum = this.IndexNum + 1;
			uni.showLoading({
				title: '加载中'
			});
			let params = {
				Index: this.IndexNum,
				size: this.sizeNum
			};
			getAddress(params).then(res => {
				setTimeout(() => {
					uni.hideLoading();
				}, 100);
				console.log(res.data)
				this.addressList = this.addressList.concat(res.data);
				if (res.data.length < this.sizeNum && this.IndexNum > 0) {
					this.more = false;
				}
			});
		},
		// 下拉刷新，要将当前页码重置为1，more属性回归撑true
		onPullDownRefresh() {
			this.IndexNum = 1;
			this.more = true;
			this.load()
			// 1秒没下拉复原
			setTimeout(function() {
				uni.stopPullDownRefresh();
			}, 1000);
		},
		methods: {
			load() {
				let params = {
					Index: this.IndexNum,
					size: this.sizeNum
				};
				getAddress(params).then(res => {
					if (res.code === 200) {
						this.addressList = res.data
					} else {
						this.$msg.toast(res.message)
						return false
					}
				})
			}
		}
	}
</script>

<style lang="scss">

</style>
