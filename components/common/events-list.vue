<template>
	<view>
		<view v-for="(item, index) in data" :key="index"
		class="mx-2 u-m-t-19">
			<view class="bg-white u-w-714">
				<image :src="item.activeImg" class="u-w-714 u-h-284 border-txy"></image>
				<view class="u-p-19 border-b">
					<view class="u-font-16 u-p-b-19 content-one" v-if="item.activeTitle.length > 0">{{ item.activeTitle }}</view>
					<view v-else></view>
					<view class="flex justify-between u-font-12 text-grey">
						<view>活动时间</view>
						<view>
							{{ item.startTime }}~{{ item.endTime }}
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			list: Array,
			default: []
		},
		data() {
			return {
			}
		},
		computed: {
			data() {
				return this.list.map(e => {
					e.startTime = this.moment(e.startTime).format("YYYY-MM-DD")
					e.endTime = this.moment(e.endTime).format("YYYY-MM-DD")
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