<template>
	<view>
		<view class="">
			<tabs :tabs='tablist' @tabActive='tabActive' />

			<view class="pt-10" v-if="contentIndex == 0">
				<view class="">
					<block v-for="(item,index) in list" :key="index">
						<guangchang :item="item" class="px-3"></guangchang>
					</block>
				</view>
			</view>

			<block class="pt-10" v-if="contentIndex == 1">
				<view class="pt-10">
					<block v-for="(item,index) in list1" :key="index">
						<huzhu :item="item" class="px-3 pt-2" :index="index"></huzhu>
					</block>
				</view>
			</block>

			<view class="pt-10" v-if="contentIndex==2">
				<view class="">
					<block v-for="(item1,index1) in newlist" :key="index1">
						<ershou :item="item1" class="px-3" :index="index1"></ershou>
					</block>
				</view>
			</view>

			<view class="pt-10" v-if="contentIndex==3">
				<view class="px-3">
					<block v-for="(item2,index2) in newlist1" :key="index2">
						<pingche :item="item2" :index="index2"></pingche>
					</block>
				</view>
			</view>
			</tabs>
		</view>
	</view>
</template>

<script>
	import {
		getGc,
		getEs,
		getPc,
		getHd
	} from '@/api/luntan'
	import { getCurrent } from '@/api/index'
	import {
		getDateDiff
	} from '@/lib/time.js'


	export default {
		data() {
			return {
				tablist: [{
						index: 0,
						value: '广场',
						isActive: true
					},
					{
						index: 1,
						value: '互助',
						isActive: false
					},
					{
						index: 2,
						value: '二手',
						isActive: false
					},
					{
						index: 3,
						value: '拼车',
						isAcitve: 'false'
					}
				],
				contentIndex: 0,
				list: [],
				list1: [],
				newlist: [],
				newlist1: [],
				page: 1,
				size: 10,
				more: true,
				commId: ''
			}
		},

		onNavigationBarButtonTap(e) {
			uni.navigateTo({
				url: '../fabu/fabu'
			})
		},
		onLoad() {
			getCurrent().then(res => {
				this.commId = res.data.communityId
				this.load();
			})
		},
		onReachBottom() {
			if (!this.more) {
				uni.showToast({
					title: '已加载完毕',
					duration: 1000
				});
				return false;
			}
			this.page = this.page + 1;
			uni.showLoading({
				title: '加载中'
			});
			this.load()
		},
		onPullDownRefresh() {
			this.page = 1;
			this.more = true;
			this.load();
			setTimeout(function() {
				uni.stopPullDownRefresh();
			}, 1000);
		},
		methods: {
			tabActive(tabIndex) {
				this.tablist.map((value, index) => {
					value.isActive = tabIndex == index ? true : false
				})
				this.more = true
				this.contentIndex = tabIndex
				this.load()
			},
			getGcList(data) {
				getGc(data).then(res => {
					console.log(res)
					uni.hideLoading()
					if (res.code === 200) {
						let data1 = res.data
						data1.forEach(item => {
							item.banner = item.banner.substring(1, item.banner.length - 1).split(',')
							item.createTime = getDateDiff(item.createTime)
						})
						this.list = this.list.concat(data1)
						if (res.data.length < this.page && this.size > 0) {
							this.more = false;
						}
					} else {
						this.$msg.toast(res.message)
						this.more = false;
						return false
					}
				})
			},
			getEsList(data) {
				getEs(data).then(res => {
					// console.log(res)
					if (res.code === 200) {
						let data1 = res.data
						uni.hideLoading()
						data1.forEach(item => {
							item.banner = item.banner.substring(1, item.banner.length - 1).split(',')
							item.createTime = getDateDiff(item.createTime)
						})
						this.newlist = this.newlist.concat(data1)
						if (res.data.length < this.page && this.size > 0) {
							this.more = false;
						}
					} else {
						this.$msg.toast(res.message)
						return false
					}
				})
			},
			getPcList(data) {
				getPc(data).then(res => {
					if (res.code === 200) {
						let data1 = res.data
						uni.hideLoading()
						data1.forEach(item => {
							item.banner = item.banner.substring(1, item.banner.length - 1).split(',')
							item.time = getDateDiff(item.time)
						})
						this.newlist1 = this.newlist1.concat(data1)
						if (res.data.length < this.page && this.size > 0) {
							this.more = false;
						}
					} else {
						this.$msg.toast(res.message)
						return false
					}
				})
			},
			getHdList(data) {
				getHd(data).then(res => {
					if (res.code === 200) {
						let data1 = res.data
						uni.hideLoading()
						data1.forEach(item => {
							item.banner = item.banner.substring(1, item.banner.length - 1).split(',')
							item.createTime = getDateDiff(item.createTime)
						})
						this.list1 = this.list1.concat(data1)
						if (res.data.length < this.page && this.size > 0) {
							this.more = false;
						}
					} else {
						this.$msg.toast(res.message)
						return false
					}
				})
			},
			load() {
				const data = {
					Index: this.page,
					size: this.size,
					id: this.commId
				}
				switch (this.contentIndex) {
					case 0:
					    this.getGcList(data)
						break;
					case 1:
					    this.getHdList(data)
						break;
					case 2:
					    this.getEsList(data)
						break;
					case 3:
					    this.getPcList(data)
						break;
				}
			}

		}
	}
</script>
<style lang="scss">
	.pt-10 {
		padding-top: 100rpx;
	}
</style>
