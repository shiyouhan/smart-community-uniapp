<template>
	<view>
		<view class="mx-4 u-m-t-19">
			<view class="u-w-679 u-h-186 bg-100 flex" :style="{'backgroundImage' : 'url(' + coverImgUrl(item) + ')'}">
				<view class="u-w-228 flex flex-column align-center justify-center text-white">
					<view class="flex align-baseline">
						<text class="u-font-18 u-p-r-16">¥</text>
						<text class="u-font-58 fw-900">{{ data.money }}</text>
					</view>
					<view class="u-font-14 u-m-t-26">{{ data.purpose }}</view>
				</view>
				<view class="flex-1 flex justify-center flex-column u-m-l-54 u-m-r-38">
					<view class="flex justify-between">
						<view class="u-font-44" :class="item.isExpired == false ? 'text-theme' : 'text-grey'">{{ data.name }}</view>
						<view class="u-font-10 text-theme" v-if="item.isExpired == false">{{ data.expiresDays }}天到期</view>
					</view>
					<view class="u-font-10 flex u-m-t-38">
						<view>{{ data.startTime }}</view>
						<view>至</view>
						<view>{{ data.endTime }}</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	const normalImage = require('../../static/images/other/bg_coupons_item_normal.png')
	const expiredImage = require('../../static/images/other/bg_coupons_item_selected.png')
	
	export default {
		props: {
			item: Object
		},
		data() {
			return {
			}
		},
		computed: {
			data() {
				let e = this.item
				e.startTime = this.moment(e.startTime).format("YYYY-MM-DD")
				e.endTime = this.moment(e.endTime).format("YYYY-MM-DD")
				return e
			}
		},
		beforeMount() {
			this.item.expiresDays = this.moment(this.item.endTime).diff(this.moment(this.item.startTime), 'days')
		},
		methods: {
			coverImgUrl(item){
				if (this.item.isExpired)
					return expiredImage
				return normalImage
			}
		}
	}
</script>

<style>
</style>