<template>
	<view>
		<view v-for="(item, index) in data" :key="index">
			<view class="bg-white mx-2 rounded u-p-19 u-m-b-19">
				<view class="flex justify-between align-baseline">
					<view class="flex align-baseline">
						<view class="u-font-14 u-p-r-10">{{ item.invitationRecord.contact }}</view>
						<view class="u-font-12 text-grey">({{ item.invitationRecord.phone }})</view>
					</view>
					<view class="u-font-12 text-grey">{{ item.communityName }}</view>
				</view>
				<view class="flex justify-between align-baseline py-3">
					<view class="u-font-12 text-grey">{{ item.startTime }}~{{ item.endTime }}</view>
					<view>{{ item.carNumber }}</view>
				</view>
				<view class="flex u-font-14 text-grey">
					备注：
					<view v-if="item.remark == ''">无</view>
					<view v-if="item.remark != ''">{{ item.invitationRecord.remark }}</view>
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
			}
		},
		data() {
			return {}
		},
		computed: {
			data() {
				return this.list.map(e => {
					e.startTime = this.moment(e.startTime).format("MM-DD hh:mm")
					e.endTime = this.moment(e.endTime).format("MM-DD hh:mm")
					// e.phone = e.phone.substr(0,3) + "****" + e.phone.substr(7)
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
