<template>
	<view class="flex flex-column align-center">
		<image src="../../static/images/other/bg_qiandao.png" class="width-100 u-abso"></image>
		
		<view class="u-rela flex flex-column justify-center neirong">
			<text class="u-font-66 text-white flex justify-center u-p-t-38">{{ integration }}</text>
			<text class="u-font-16 text-white flex justify-center my-5">积分</text>
			<view class="flex justify-center">
				<view class="u-w-342 u-h-88 bg-warning u-line-48 text-center text-brown rounded-44 border-white" @click="change">立即签到</view>
			</view>
			<view class="u-font-16 u-m-t-60">
				已签到{{ day }}天，今天继续签到可获得{{ nextIntegration }}积分
			</view>
		</view>
		
		
		<super-steps :options="list" :active="day" class="u-m-t-180"/>
		
		<view class="flex algin-center justify-center u-m-t-72">
			<view class="border-y u-m-t-19"></view>
			<text class="text-secondary px-2">签到规则</text>
			<view class="border-y u-m-t-19"></view>
		</view>
		
		<view class="u-m-38 u-p-38 bg-white rounded u-font-14 u-line-24">
			<view class="u-p-b-38">1、连续签到七天可获得100积分。</view>
			<view class="u-p-b-38">2、签到所获积分可用于福来来商城购物抵现，每次抵现份额不超过商品金额的1%。</view>
			<view>3、积分每年12月31日清零，次年积分继续累积只能当年使用。</view>
		</view>
	</view>
</template>

<script>
	import superSteps from "@/components/common/super-steps.vue"
	import { 
		getSignList ,
		signIn
	} from "@/api/info"
	
	export default {
		components: {
			superSteps
		},
		data() {
			return {
				originList: [],
				day: null,
				activeColor: 'rgb(242, 127, 54)',
				integration: 0,
				nextIntegration: 0
			};
		},
		computed: {
			list() {
				let list = []
				for (let [index, item] of this.originList.entries()) {
					let tmp = {
						title: '+' + item.integration,
						subTitle: index === this.day ? '今天' : item.day,
						activeColor: index < this.day ? 'rgb(185, 185, 185)' : (index > this.day ? 'rgb(108, 108, 108)' : this.activeColor),
						titleColor: item.isSignIn ? 'white' : '',
						titleIcon: item.isSignIn ? 'checkmarkempty' : '',
						titleIconColor: index === this.day ? this.activeColor : (index < this.day ? 'rgb(183, 189, 198)' : 'rgb(252, 221, 190)'),
						titleBoxBorderColor: item.isSignIn ? 'rgb(249, 139, 10)' : '',
						titleBoxBgColor: item.isSignIn ? 'rgb(242, 121, 21)' : ''
					}
					list.push(tmp)
				}
				if(list.length > 0 && !this.originList[list.length - 1].isSignIn) {
					list[list.length - 1].titleBoxBorderColor = 'rgb(250, 155, 48)'
					list[list.length - 1].titleBoxBgColor = 'rgb(253, 219, 178)'
				}
				return list
			}
		},
		async onLoad() {
			let res = await getSignList()
			if (res.code === 200) {
				res = res.data
				this.integration = res.integration
				this.originList = res.dayList
				this.day = res.day
				this.nextIntegration = res.nextIntegration
			}
		},
		methods: {
			change() {
				if(this.day == this.originList.length - 1 && this.originList[this.day].isSignIn) return
				const data = {
					day: this.day,
					integration: this.nextIntegration
				}
				
				signIn(data).then((res) => {
					if (res.code === 200) {
						let tmp = this.originList[this.day]
						tmp.isSignIn = true
						this.originList.splice(this.day, 1, tmp)
						
						this.integration += this.nextIntegration
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
.neirong {
	top: 74px;
}
</style>
