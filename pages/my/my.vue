<template>
	<view class="my">
		<template v-if="!loginStatus">
			<view class="flex align-center justify-center flex-column u-h-318 bg-grey" @tap="open('login')">
				<image src="/static/images/other/weidenglu.png" class="w-66 rounded">
				<view class="u-font-14 u-p-t-32">请点击登录</view>
			</view>
		</template>
		
		<template v-else>
			<view class="flex align-center justify-center flex-column u-h-318 bg-grey">
				<image :src="user.avatar || ''" class="w-66 rounded">
				<view class="u-font-14 u-p-t-32">{{ user.username || '' }}</view>
			</view>
		</template>
		
		<view class="bg-theme u-font-34 py-1 u-p-l-30 u-p-r-10 u-abso qiandao" @tap="open('signin')">
			<text class="text-white">签到</text>
		</view>
		
		<uni-list-item showExtraIcon title="切换小区" @tap="open('handover-cell')">
			<text slot="icon" class="iconfont icon-xiaoqu text-orange font-20" />
		</uni-list-item>
		<uni-list-item showExtraIcon title="家庭成员" @tap="open('family')">
			<text slot="icon" class="iconfont icon-jiatingguanli text-danger font-20" />
		</uni-list-item>
		<uni-list-item showExtraIcon title="我的收藏" @tap="open('collect')">
			<text slot="icon" class="iconfont icon-shoucang text-dark-orange font-20" />
		</uni-list-item>
		
		<divider></divider>
		
		<uni-list-item showExtraIcon title="我的钱包" @tap="open('wallet')">
			<text slot="icon" class="iconfont icon-licai text-blue font-20" />
		</uni-list-item>
		<uni-list-item showExtraIcon title="优惠券" @tap="open('coupon')">
			<text slot="icon" class="iconfont icon-youhuiquan text-success font-20" />
		</uni-list-item>
		<uni-list-item showExtraIcon title="积分" @tap="open('integral')">
			<text slot="icon" class="iconfont icon-jifen text-dark-orange font-20" />
		</uni-list-item>
		<uni-list-item showExtraIcon title="我的订单" @tap="open('order')">
			<text slot="icon" class="iconfont icon-dingdan text-danger font-20" />
		</uni-list-item>
	</view>
</template>

<script>
	import {
		getUserInfo
	} from '@/api/user'
	import { mapState } from 'vuex'
	
	import uniListItem from '@/components/common/uni-list-item.vue';
	export default {
		components: {
			uniListItem
		},
		data() {
			return {
				loginStatus: false,
			}
		},
		onShow() {
			// 从本地缓存读取user,如果为空，loginStatus为false,否则为true，将其信息渲染在页面
			this.token = uni.getStorageSync('token');
			if (Object.keys(this.token).length === 0) {
				this.loginStatus = false;
			} else {
				this.loginStatus = true;
			}
			// console.log(this.token);
			console.log(this.loginStatus);
		},
		computed: {
			...mapState({
				user: state => state.user.userInfo
			})
		},
		// 监听点击导航栏设置按钮
		onNavigationBarButtonTap(e) {
			uni.navigateTo({
				url: '../setting/setting'
			})
		},
		onLoad() {
			this.load()
		},
		methods: {
			open(path) {
				uni.navigateTo({
					url: `../${path}/${path}`
				})
			},
			load() {
				getUserInfo().then((res) => {
					if (res.code === 200) {
						this.$store.commit('user/SET_USER_INFO', {
							userInfo: res.data
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
	.qiandao {
		top: 50rpx;
		right: 0rpx;
		border-radius: 30rpx 0rpx 0rpx 30rpx;
	}
</style>
