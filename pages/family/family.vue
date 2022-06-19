<template>
	<view>
		<divider></divider>
		
		<block v-for="item in list" :key="item.id">
			<family-list-item :item="item">
			</family-list-item>
			<divider></divider>
		</block>
	</view>
</template>

<script>
	import {
		getFamily
	} from '@/api/info'
	
	import familyListItem from '@/components/common/family-list-item.vue';
	export default {
		components: {
			familyListItem
		},
		data() {
			return {
				list: [],
				pageNum: 1,
				sizeNum: 10,
				more: true
			}
		},
		// 监听点击导航栏设置按钮
		onNavigationBarButtonTap(e) {
			uni.navigateTo({
				url: '../member-add/member-add'
			})
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
			getFamily(params).then(res => {
				setTimeout(() => {
					uni.hideLoading();
				}, 100);
				console.log(res.data)
				this.list = this.list.concat(res.data);
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
				getFamily().then(res => {
					if (res.code === 200) {
						this.list = res.data
					} else {
						this.$msg.toast(res.message)
						return false
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	
</style>
