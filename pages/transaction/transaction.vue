<template>
	<view>
		<estate-list :list="estateTransaction"></estate-list>
	</view>
</template>

<script>
	import {
		getEstate
	} from '@/api/service'
	import estateList from "@/components/common/estate-list.vue";
	export default {
		components: {
			estateList
		},
		data() {
			return {
				estateTransaction: [],
				pageNum: 1,
				sizeNum: 7,
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
			this.load();
		},
		onReachBottom() {
			if (!this.more) {
				uni.showToast({
					title: '已经是底部了',
					duration: 1000
				});
				return false;
			}
			this.pageNum = this.pageNum + 1;
			uni.showLoading({
				title: '加载中'
			});
			let params = {
				page: this.pageNum,
				size: this.sizeNum
			};
			getEstate(params).then(res => {
				setTimeout(() => {
					uni.hideLoading();
				}, 100);
				console.log(res.data)
				this.estateTransaction = this.estateTransaction.concat(res.data);
				if (res.data.length < this.sizeNum && this.pageNum > 0) {
					this.more = false;
				}
			});
		},
		// 下拉刷新，要将当前页码重置为1，more属性回归撑true
		onPullDownRefresh() {
			this.pageNum = 1;
			this.more = true;
			this.load()
			// 1秒没下拉复原
			setTimeout(function() {
				uni.stopPullDownRefresh();
			}, 1000);
		},
		methods: {
			load() {
				const data = {
					page: this.pageNum,
					size: this.sizeNum
				}
				getEstate(data).then(res => {
					if (res.code === 200) {
						this.estateTransaction = res.data
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
