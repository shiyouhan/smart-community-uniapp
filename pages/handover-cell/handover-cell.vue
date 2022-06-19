<template>
	<view>
		<divider></divider>
		
		<view class="village">
			<uni-list-item :title="currentCommunity.name || '请选择'">
				<view class="flex align-center" slot="right">
					<text class="iconfont icon-wancheng ml-2 text-green u-p-r-19"></text>
				</view>
			</uni-list-item>
		</view>
		
		<divider></divider>
		
		<view v-for="item in communityList" :key="item.id">
			<uni-list-item showBadge badgeText="点击切换" :title="item.name"
			@click="onChange(item)"/>
			</uni-list-item>
		</view>
	</view>
</template>

<script>
	import {
		getCommunity,
		changeCommunity
	} from '@/api/info'
	
	import uniListItem from '@/components/common/uni-list-item.vue';
	export default {
		components: {
			uniListItem
		},
		data() {
			return {
				communityList: [],
				currentCommunity: [],
				pageNum: 1,
				sizeNum: 11,
				more: true
			}
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
			this.pageNum = this.pageNum + 1;
			uni.showLoading({
				title: '加载中'
			});
			let params = {
				page: this.pageNum,
				size: this.sizeNum
			};
			getCommunity(params).then(res => {
				setTimeout(() => {
					uni.hideLoading();
				}, 100);
				console.log(res.data.communityList)
				this.communityList = this.communityList.concat(res.data.communityList);
				if (res.data.communityList.length < this.sizeNum && this.pageNum > 0) {
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
				let params = {
					page: this.pageNum,
					size: this.sizeNum
				};
				getCommunity(params).then(res => {
					if (res.code === 200) {
						this.communityList = res.data.communityList
						for(let i of this.communityList) {
							if(res.data.currentCommunity == i.name) {
								this.currentCommunity = i
								console.log(i)
							}
						}
					} else {
						this.$msg.toast(res.message)
						return false
					}
				})
			},
			onChange(e) {
				this.currentCommunity = e
				const data = {
					communityId: this.currentCommunity.id,
					name: this.currentCommunity.name
					// page: this.page,
					// size: this.size
				}
				// console.log(res.data)
				changeCommunity(data).then((res) => {
					if (res.code === 200) {
						// this.$msg.toast('切换成功', 'suc');
						this.$store.commit('info/SET_COMMUNITIES', {
							communityInfo: data
						})
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
