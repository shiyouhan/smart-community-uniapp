<template>
	<view>
		<view v-for="(item, index) in list" :key="index" class="">
			<guard-list-item :item="item" :index="index">
			</guard-list-item>
		</view>
	</view>
</template>

<script>
	import guardListItem from "@/components/common/record-list-item.vue";
	export default {
		components: {
			guardListItem
		},
		data() {
			return {
				list: [
					{
						id: 1,
						username: '张先生',
						phone: '13802562585',
						createTime: '2018-12-31 08:30',
						endTime: '2018-12-31 21:30'
					},
					{
						id: 2,
						username: '刘先生',
						phone: '13426859856',
						createTime: '2018-12-31 08:30',
						endTime: '2018-12-31 21:30'
					}
				]
			};
		}
	}
</script>

<style lang="scss">

</style>
