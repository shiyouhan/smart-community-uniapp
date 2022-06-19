<template>
	<view class="flex u-m-19 bg-white rounded flex-column">
		<view class="flex u-m-b-22 mx-3 u-m-t-38">
			<view class="u-font-16 u-m-r-26">{{ item.username }}</view>
			<view class="u-font-14 line-38 border-theme u-p-l-22 u-p-r-22 rounded-22">{{ item.phone }}</view>
		</view>
		<view class="flex mx-3">
			<view class="iconfont icon-rili text-grey u-font-16 u-p-r-19"></view>
			<view class="u-font-14 text-grey">{{ item.createTime }}</view>
			<view>
				<view class="text-grey">～</view>
			</view>
			<view class="u-font-14 text-grey">{{ item.createTime }}</view>
		</view>
		
		<view class="flex u-m-t-12">
			<view v-for="(item, index) in list" :key="index">
				<guard-list-item :item="item" :index="index">
				</guard-list-item>
			</view>
		</view>
		
		<view class="flex u-m-b-12">
			<view v-for="(item1, index1) in list1" :key="index1">
				<guard-list-item :item="item1" :index="index1">
				</guard-list-item>
			</view>
		</view>
	</view>
</template>

<script>
	import guardListItem from "@/components/common/guard-list-item.vue";
	
	export default {
		components: {
			guardListItem
		},
		props: {
			item: Object,
			index: Number
		},
		data() {
			return {
				list: [
					{
						id: 1,
						guard: '东门'
					},
					{
						id: 2,
						guard: '南门'
					},
					{
						id: 3,
						guard: '北门'
					}
				],
				list1: [
					{
						id: 4,
						guard: '东门'
					},
					{
						id: 5,
						guard: '南门'
					},
					{
						id: 6,
						guard: '北门'
					}
				],
			}
		},
		methods: {
			
		}
	}
</script>

<style>
</style>