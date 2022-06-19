<template>
	<view>
		<view class="tabbar">
			<view v-for="(item, index) in tabBars" class="tabbar-item"
				:key="index"
				:class="tabIndex === index ? 'text-theme line' : ''"
				@tap="changeTab(index)">
				{{item.name}}
			</view>
		</view>
		
		<swiper class="swiper" :current="tabIndex" :disable-touch='true'>
			<swiper-item>
				<scroll-view class="swiper" :scroll-y="true">
					<view v-for="(item1, index1) in list" :key="index1" class="float-l u-m-5">
						<secure-list-item :item="item1" :index="index1">
						</secure-list-item>
					</view>
				</scroll-view>
			</swiper-item>
			<swiper-item>
				<scroll-view class="swiper" :scroll-y="true">
					<view v-for="(item1, index1) in list" :key="index1" class="float-l u-m-5">
						<secure-list-item :item="item1" :index="index1">
						</secure-list-item>
					</view>
				</scroll-view>
			</swiper-item>
			<swiper-item>
				<scroll-view class="swiper" :scroll-y="true">
					<view v-for="(item1, index1) in list" :key="index1" class="float-l u-m-5">
						<secure-list-item :item="item1" :index="index1">
						</secure-list-item>
					</view>
				</scroll-view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	import secureListItem from "@/components/common/secure-list-item.vue"
	export default {
		components: {
			secureListItem
		},
		data() {
			return {
				tabIndex: 0,
				// 顶部选项卡
				tabBars: [
					{
						name: "可视对讲",
					},
					{
						name: "私人监控",
					},
					{
						name: "公共监控",
					}
				],
				list: [
					{
						id: 1,
						img: '../../static/images/other/zhoujielun1.png',
						way: '监控1'
					},
					{
						id: 2,
						img: '../../static/images/other/zhoujielun1.png',
						way: '监控2'
					},
					{
						id: 3,
						img: '../../static/images/other/zhoujielun1.png',
						way: '监控3'
					},
					{
						id: 4,
						img: '../../static/images/other/zhoujielun1.png',
						way: '监控4'
					}
				]
			};
		},
		methods: {
			// 切换选项卡
			changeTab(index) {
				if (this.tabIndex === index) {
					return;
				}
				console.log(index)
				this.tabIndex = index
				console.log(this.tabIndex)
			}
		}
	}
</script>

<style lang="scss">
.tabbar {
		width: 100%;
		display: flex;
		align-items: center;
	}
	
	.tabbar-item {
		padding: 16rpx 0rpx;
		width: 33%;
		display: flex;
		align-items: center;
		justify-content: center;
		position: relative;
		//margin: 0rpx 14rpx;
	}
	
	.line {
		border-bottom: 4rpx solid $primary;
	}
	.swiper {   
		height: calc(100vh - 106rpx - 80rpx);
	}
</style>
