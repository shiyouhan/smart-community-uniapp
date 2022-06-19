<template>
	<view>
		<divider></divider>
		
		<view class="u-h-134 bg-white flex align-center u-p-38" @click="open">
			<view class="flex">
				<image :src="user.avatar" class="w-42 rounded"></image>
			</view>
			<view class="flex u-p-l-19 justify-between flex-1 align-center">
				<view>
					<view class="flex u-p-b-12 align-baseline">
						<view class="u-font-14 u-p-r-26">{{ user.username }}</view>
						<view class="text-grey u-font-12">{{ formatPhone }}</view>
					</view>
					<view class="text-grey u-font-12">{{ user.area }}</view>
				</view>
				<view class="iconfont icon-youjiantou u-font-12 text-grey"></view>
			</view>
		</view>
		
		<view class="u-m-19 bg-white u-p-38 rounded">
			<view class="flex">
				<view class="iconfont icon-shangdian text-grey u-p-r-19"></view>
				<view>{{ shop.name }}</view>
			</view>
			<!-- <view class="u-m-t-26">
				<newgoods-list :list="goodList"></newgoods-list>
			</view> -->
			<scroll-view class="u-m-t-26 u-h-400" scroll-y="true">
				<newgoods-list :list="goodList"></newgoods-list>
			</scroll-view>
			<view class="flex u-font-12 justify-end u-m-t-19">
				<view class="text-grey u-p-r-22">小计</view>
				<view class="text-danger">¥{{ sum }}.00</view>
			</view>
		</view>
		
		<view class="bar flex flex-column fixed-bottom">
			<view class="">
				<view class="u-m-19 u-m-t-38">请选择支付方式</view>
				
				<view class="u-m-b-64">
					<view class="flex align-center mx-2 px-5 bg-white u-h-116 border-bottom border-txy">
						<image src="../../static/images/other/zhifubao.png" 
							class="w-32 u-p-r-34"></image>
						<view class="flex-1 flex justify-between">
							<view class="u-font-16">支付宝充值</view>
							<view :class="!isChoice ?
								'iconfont icon-wancheng text-theme u-font-38' : 
								'border rounded-22 w-21'" 
								@click="isChoice=!isChoice">
							</view>
						</view>
					</view>
					<view class="flex align-center mx-2 px-5 bg-white u-h-116 border-bxy">
						<image src="../../static/images/other/weixin.png" 
							class="w-32 u-p-r-34"></image>
						<view class="flex-1 flex justify-between">
							<view class="u-font-16">微信充值</view>
							<view :class="isChoice ? 
								'iconfont icon-wancheng text-theme u-font-38' : 
								'border rounded-22 w-21'" 
								@click="isChoice=!isChoice">
							</view>
						</view>
					</view>
				</view>
			</view>	
			<view class="flex align-center justify-between u-h-90 bg-white">
				<view class="u-font-14 text-danger u-p-l-44">¥{{ sum }}.00</view>
				<view class="u-w-154 u-h-64 u-line-35 text-white bg-theme text-center rounded u-m-r-22"
					@click="getData(shop)">选好了</view>
			</view>
		</view>
	</view>
</template>

<script>
	import { 
		getUserInfo ,
	} from '@/api/user'
	import { mapState } from 'vuex'
	import uniListItem from "@/components/common/uni-list-item.vue"
	import newgoodsList from "@/components/common/newgoods-list.vue"
	export default {
		components: {
			uniListItem,
			newgoodsList
		},
		data() {
			return {
				shop: {},
				goodList: [],
				isChoice: false
			};
		},
		mounted() {
			let _that = this
		
			uni.getSystemInfo({
				success(res) {
					let winHeight = res.windowHeight
					let viewSelector = uni.createSelectorQuery().select('.uni-scroll-view')
					let barSelector = uni.createSelectorQuery().select('.bar')
					viewSelector.boundingClientRect(view => {
						barSelector.boundingClientRect(e => {
							_that.height = winHeight - view.top - e.height
						}).exec()
					}).exec()
				}
			})
		},
		computed: {
			...mapState({
				user: state => state.user.userInfo
			}),
			formatPhone() {
				if(this.user && this.user.phone)
					return this.user.phone.substr(0,3) + "****" + this.user.phone.substr(7)
				return ''
			},
			sum: {
				get() {
					let sum = 0
					if(this.goodList) {
						for(let i of this.goodList) {
							if(i.number && i.number > 0)
								sum += (i.number * i.price)
						}
					}
					return sum
				}
			}
		},
		onLoad(e) {
			this.shop = JSON.parse(e.shop);
			this.goodList = JSON.parse(e.goods);
			this.load();
		},
		methods: {
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
			},
			open() {
				uni.navigateTo({
					url: '../address/address'
				})
			}
		}
	}
</script>

<style lang="scss">

</style>
