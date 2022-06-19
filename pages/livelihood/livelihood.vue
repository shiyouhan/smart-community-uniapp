<template>
	<view class="flex-column flex m-3">
		<view v-for="(item1, index1) in newsList" :key="index1">
			<collect-list-item :item="item1" :index="index1" @open="goDetail(item1.id)"></collect-list-item>
		</view>
	</view>
</template>

<script>
import collectListItem from '@/components/common/collect-list-item.vue';
import { newsList } from '@/api/index/index.js';
export default {
	components: {
		collectListItem
	},
	data() {
		return {
			pageIndex: 1,
			pageSize: 10,
			newsList: [],
			more: true,
		};
	},
	onLoad() {
		this.getNewsList();
		uni.getSystemInfo({
			success: res => {
				this.scrollH = res.windowHeight - uni.upx2px(101);
			}
		});
		uni.startPullDownRefresh();
	},
	onReachBottom() {
		if (!this.more) {
			uni.showToast({
				title: '资讯加载完毕',
				duration: 1000
			});
			return false;
		}
		this.pageIndex = this.pageIndex + 1;
		uni.showLoading({
			title: '加载中'
		});
		let params = {
			page_number: this.pageIndex,
			size: this.pageSize
		};
		newsList(params).then(res => {
			setTimeout(() => {
				uni.hideLoading();
			}, 100);
			this.newsList = this.newsList.concat(res.data.records);
			if (res.data.records.length < this.pageSize && this.pageIndex > 0) {
				this.more = false;
			}
		});
	},
	onPullDownRefresh() {
		this.pageIndex = 1;
		this.more = true;
		this.getNewsList();
		setTimeout(function() {
			uni.stopPullDownRefresh();
		}, 1000);
	},
	methods: {
		// 资讯列表
		getNewsList() {
			let params = {
				page_number: this.pageIndex,
				size: this.pageSize
			};
			newsList(params).then(res => {
				this.newsList = res.data.records;
			});
		},
		// 资讯详情
		goDetail(id) {
			uni.navigateTo({
				url: '../livelihood-detail/livelihood-detail?id=' + id
			});
		}
	}
};
</script>

<style lang="scss"></style>
