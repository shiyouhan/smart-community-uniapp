<template>
	<view v-if="item.expiresDays >= 0"
		class="u-w-714 u-h-162 bg-white u-m-19 rounded flex justify-between align-center px-4">
		<view>
			<view class="flex">
				<view class="u-font-16 u-p-r-22">{{ item.section }}</view>
				<view class="u-font-14 text-hover-secondary">{{ item.name }}</view>
			</view>
			<view class="u-font-14 text-grey u-m-t-22">到期时间：{{ item.endTime }}</view>
		</view>
		<view>
			<view class="u-font-14 px-2 u-p-t-4 u-p-b-4 bg-theme text-white rounded-22">{{ item.carNumber }}</view>
			<view class="u-font-14 text-right u-m-t-22 text-theme">{{ item.expiresDays }}天到期</view>
		</view>
	</view>
	<view v-else class="u-w-714 u-h-162 bg-lightgrey u-m-19 rounded flex justify-between align-center px-4">
		<view>
			<view class="flex">
				<view class="u-font-16 u-p-r-22">{{ item.section }}</view>
				<view class="u-font-14 text-hover-secondary">{{ item.name }}</view>
			</view>
			<view class="u-font-14 text-grey u-m-t-22">到期时间：{{ item.endTime }}</view>
		</view>
		<view>
			<view class="u-font-14 px-2 u-p-t-4 u-p-b-4 bg-white text-hover-secondary rounded-22">{{ item.carNumber }}</view>
			<view class="u-font-14 text-right u-m-t-22 text-hover-secondary">已到期</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			item: Object
		},
		beforeMount() {
			this.item.expiresDays = this.moment(this.item.endTime).diff(this.moment(), 'days')
		},
		methods: {
		}
	}
</script>

<style>
</style>