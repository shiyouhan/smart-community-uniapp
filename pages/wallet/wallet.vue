<template>
	<view class="wallet">
		<image src="../../static/images/other/bg_qiandao.png" class="width-100 u-absolute top-0" />
		
		<view class="u-rela flex flex-column justify-center u-p-t-92">
			<text class="u-font-66 text-white flex justify-center u-p-t-38">{{ totalMoney }}</text>
			<text class="u-font-16 text-white flex justify-center u-p-t-19">账户余额(元)</text>
			<view class="u-p-t-82">
				<bill-list :list="purseList" class="u-relative">
				</bill-list>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		getWallet
	} from '@/api/info'
	
	import billList from "@/components/common/bill-list.vue";
	export default {
		components: {
			billList
		},
		data() {
			return {
				totalMoney: 0,
				purseList: []
			};
		},
		onLoad() {
			this.load()
		},
		methods: {
			load() {
				getWallet().then(res => {
					if (res.code === 200) {
						this.totalMoney = res.data.totalMoney
						this.purseList = res.data.purseList
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
	.wallet {
		padding-top: var(--status-bar-height);
	}
</style>
