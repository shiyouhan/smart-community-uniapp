<template>
	<view>
		<view class="w-100 flex align-center">
			<view v-for="(item, index) in tabBars" 
				class="py-2 width-25 flex align-center justify-center u-rela mx-2"
                style="box-sizing: border-box;"
				:key="index"
				:class="tabIndex === index ? 'text-theme line' : ''"
				@tap="changeTab(index)">
				{{item.name}}
			</view>
		</view>
		
		<swiper class="swiper" :current="tabIndex" :disable-touch='true' @scrolltolower='listScrollToLower'>
			<swiper-item>
				<scroll-view class="swiper" :scroll-y="true">
					<divider></divider>
					<collect-list :list="list"></collect-list>
				</scroll-view>
			</swiper-item>
			<swiper-item>
				<scroll-view class="swiper" :scroll-y="true" @scrolltolower='listScrollToLower'>
					<divider></divider>
					<collect-list :list="list"></collect-list>
				</scroll-view>
			</swiper-item>
			<swiper-item>
				<scroll-view class="swiper" :scroll-y="true" @scrolltolower='estateScrollToLower'>
					<estate-list :list="estateList"></estate-list>
				</scroll-view>
			</swiper-item>
			<swiper-item>
				<scroll-view class="swiper" :scroll-y="true" @scrolltolower='marketScrollToLower'>
					<divider></divider>
					<block v-for="(item, index) in marketList" :key="index">
						<fleacollect-list-item :item="item" :index="index">
						</fleacollect-list-item>
					</block>
				</scroll-view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	import { getCollection } from '@/api/info'
	import { getEsCollect } from '@/api/service'
	import { getMaCollect } from '@/api/market'
	
	import estateList from '@/components/common/estate-list.vue'
	import fleacollectListItem from '@/components/common/fleacollect-list-item.vue'
	import collectList from '@/components/common/collect-list.vue'
	export default {
		components: {
			collectList,
			estateList,
			fleacollectListItem
		},
		data() {
			return {
				tabIndex: 0,
				// 顶部选项卡
				tabBars: [
					{
						name: "资讯"
					},
					{
						name: "社区交流"
					},
					{
						name: "房产"
					},
					{
						name: "跳蚤商品"
					},
				],
				list: [],
				estateList: [],
				marketList: [],
				pageNum: 1,
				sizeNum: 6,
				more: true
			}
		},
		async onLoad() {
			uni.getSystemInfo({
				success: res => {
					this.scrollH = res.windowHeight - uni.upx2px(101);
				}
			});
			setTimeout(function() {
				console.log('开启下拉刷新');
			}, 1000);
			uni.startPullDownRefresh();
			this.list = await this.load(this.tab)
			this.estateList = await this.load1()
			this.marketList = await this.load2()
		},
		// 下拉刷新，要将当前页码重置为1，more属性回归撑true
		onPullDownRefresh() {
			this.pageNum = 1;
			this.more = true;
			// 1秒没下拉复原
			setTimeout(function() {
				uni.stopPullDownRefresh();
			}, 1000);
		},
		methods: {
			// 切换选项卡
			async changeTab(index) {
				if (this.tabIndex === index) {
					return;
				}
				this.tabIndex = index
				if(this.tabIndex < 2) {
					this.list = await this.load(this.tab)
				}
			},
			async load(e) {
				let res = await getCollection({
					page: this.pageNum,
					size: this.sizeNum,
					tab: this.tabIndex
				})
				if(!res && res.code !== 200) {
					this.$msg.toast(res.message)
					return []
				}
				return res.data
			},
			async load1(e) {
				let res = await getEsCollect({
					page: this.pageNum,
					size: this.sizeNum
				})
				if(!res && res.code !== 200) {
					this.$msg.toast(res.message)
					return []
				}
				return res.data
			},
			async load2(e) {
				let res = await getMaCollect({
					page: this.pageNum,
					size: this.sizeNum
				})
				if(!res && res.code !== 200) {
					this.$msg.toast(res.message)
					return []
				}
				return res.data
			},
			listScrollToLower() {
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
					size: this.sizeNum,
					tab: this.tabIndex
				};
				getCollection(params).then(res => {
					setTimeout(() => {
						uni.hideLoading();
					}, 100);
					this.list = this.listlist.concat(res.data);
					if (res.data.length < this.sizeNum && this.pageNum > 0) {
						this.more = false;
					}
				});
			},
			estateScrollToLower() {
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
				getEsCollect(params).then(res => {
					setTimeout(() => {
						uni.hideLoading();
					}, 100);
					this.estateList = this.estateList.concat(res.data);
					if (res.data.length < this.sizeNum && this.pageNum > 0) {
						this.more = false;
					}
				});
			},
			marketScrollToLower() {
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
				getMaCollect(params).then(res => {
					setTimeout(() => {
						uni.hideLoading();
					}, 100);
					this.marketList = this.marketList.concat(res.data);
					if (res.data.length < this.sizeNum && this.pageNum > 0) {
						this.more = false;
					}
				});
			},
		}
	}
</script>

<style lang="scss" scoped>
	
</style>