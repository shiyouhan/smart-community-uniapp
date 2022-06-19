<template>
	<view>
		<swiper :indicator-dots="false" :autoplay="true" :interval="3000" :duration="1000" style="height: 400rpx;">
			<block v-for="(item, index) in swiper" :key="index">
				<swiper-item class=" flex algin-center justify-center">
					<image :src="item.imageUrl" class="w-100 u-h-432" mode="aspectFill" lazy-load />
				</swiper-item>
			</block>
		</swiper>
		<view class="top-0 u-absolute w-100 u-flex u-row-center " :style="{marginTop:systemBarHeight+'rpx'}" @click="getCommunityList()">
			{{ currentCommunity }}
			<view class="iconfont icon-xiajiantoushixinxiao"></view>
		</view>
		<view class="m-3 flex flex-column">
			<view class=" bg-white rounded-22">
				<uni-notice-bar show-icon scrollable text="通知公告的内容放在这里" class="border-b-2" />
				<view class="flex flex-wrap justify-around">
					<view v-for="(item, index) in list" :key="index">
						<function-list-item :item="item" :index="index"></function-list-item>
					</view>
				</view>
			</view>

			<view class="flex algin-center justify-between mb-2 mt-2">
				<text class="font-weight-bold">民生资讯</text>
				<text class="text-grey font-sm" @click="open">查看全部</text>
			</view>

			<view v-for="(item, index) in newsList" :key="index">
				<collect-list-item :item="item" :index="index" @open="goDetail(item.id)"></collect-list-item>
			</view>
		</view>
	</view>
</template>

<script>
import { advertisingList, newsList } from '@/api/index/index.js';
import { getCommunity } from '@/api/info/index.js';
import uniDataSelect from '@/components/uni/uni-data-select/uni-data-select.vue';
import uniNoticeBar from '@/components/uni/uni-notice-bar/uni-notice-bar.vue';
import functionListItem from '@/components/common/function-list-item.vue';
import collectListItem from '@/components/common/collect-list-item.vue';
export default {
	components: {
		uniDataSelect,
		uniNoticeBar,
		functionListItem,
		collectListItem
	},
	data() {
		return {
			currentCommunity: '',
			showType: 0,
			// 小区名
			communityList: [],
			// 轮播图列表
			swiper: [],
			// 小区列表
			communities: [],
			// 小区id
			communityId: 0,
			pageIndex: 1,
			pageSize: 10,
			list: [
				{
					id: 1,
					src: '../../static/images/other/icon_zhkm.png',
					title: '智慧开门',
					text: '手机控制门锁',
					page: '/pages/open-door/open-door'
				},
				{
					id: 2,
					src: '../../static/images/other/icon_zhaf.png',
					title: '智慧安防',
					text: '实时监控保卫',
					page: '/pages/security/security'
				},
				{
					id: 3,
					src: '../../static/images/other/icon_sqtc.png',
					title: '社区停车',
					text: '快速寻找车位',
					page: '/pages/parking/parking'
				},
				{
					id: 4,
					src: '../../static/images/other/icon_wyfw.png',
					title: '物业服务',
					text: '物业报修缴费',
					page: '/pages/property-service/property-service'
				}
			],
			// 资讯列表
			newsList: [],
			systemBarHeight:0
		};
	},
	onLoad() {
		this.getAdvertise();
		this.getCurrentCommunity();
		this.getNewsList();
	},
	created() {
		this.getStatusBar()
		console.log(this.systemBarHeight)
	},
	methods: {
		open() {
			uni.navigateTo({
				url: '../livelihood/livelihood'
			});
		},
		// 当前小区
		getCurrentCommunity() {
			getCommunity().then(res => {
				console.log(res)
				this.communities = res.data.communityList;
				this.currentCommunity = res.data.currentCommunity.name;
				for (let i = 0; i < this.communities.length; i++) {
					this.communityList.push(this.communities[i].name);
				}
			});
		},
		// 广告列表
		getAdvertise() {
			advertisingList(this.showType).then(res => {
				this.swiper = res.data;
			});
		},
		// 小区列表
		getCommunityList() {
			let that = this;
			uni.showActionSheet({
				title: '小区列表',
				itemList: that.communityList,
				success: function(res) {
					that.currentCommunity = that.communityList[res.tapIndex];
					that.communityId = that.communities[res.tapIndex].id;
				}
			});
		},
		// 资讯列表
		async getNewsList() {
			let params = {
				page_number: this.pageIndex,
				size: this.pageSize
			};
			await newsList(params).then(res => {
				this.newsList = res.data.records;
			});
		},
		// 资讯详情
		goDetail(id) {
			uni.navigateTo({
				url: '../livelihood-detail/livelihood-detail?id=' + id
			});
		},
		getStatusBar() {
			uni.getSystemInfo({
				success: res => {
					this.systemBarHeight = res.statusBarHeight+30;
				}
			});
		}
	}
};
</script>

<style lang="scss" scoped>
/deep/ .uni-select__input-text {
	width: fit-content !important;
	color: #fff;
}

/deep/ .uni-select__selector {
	width: unset !important;
}

/deep/ .uni-select__selector-scroll {
	width: max-content !important;
}

.status_height {
	margin-top: var(--status-bar-height);
}
</style>
