<template>
	<view>
		<view class="u-m-38 bg-white rounded" v-for="item in data" :key="item.id">
			<view class="flex justify-between u-h-144">
				<view class="flex flex-column justify-center">
					<text class="px-3 py-2 u-font-16">{{ item.purpose }}</text>
					<text class="px-3 u-font-12 text-grey">{{ item.createTime }}</text>
				</view>
				
				<view class="u-p-r-44 my-4 flex align-center">
					<text class="u-font-40 text-green">{{ item.count }}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			list: {
				type: Array,
				default: () => []
			},
		},
		computed: {
			data() {
				return this.list.map(e => {
					e.createTime = this.moment(e.createTime).format("YYYY-MM-DD")
					return e
				})
			}
		},
		methods: {
			
		}
	}
</script>

<style>
</style>