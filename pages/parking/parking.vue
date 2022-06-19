<template>
	<view>
		<view class="flex justify-around u-m-19">
			<view v-for="(item, index) in wayList" :key="index">
				<service-list-item :item="item" :index="index">
				</service-list-item>
			</view>
		</view>

		<view class="flex justify-start mx-2 my-4">附近停车场</view>

		<view>
			<view v-for="(item, index) in list" :key="index">
				<park-list-item :item="item" :index="index">
				</park-list-item>
			</view>
		</view>
	</view>
</template>

<script>
	import serviceListItem from "@/components/common/service-list-item.vue";
	import parkListItem from "@/components/common/park-list-item.vue";
	import {
		parkList
	} from "@/api/parking/index.js"
	export default {
		components: {
			parkListItem,
			serviceListItem
		},
		data() {
			return {
				list: [],
				wayList: [{
						id: 1,
						src: '../../static/images/other/parking.png',
						title: '车位管理',
						content: '管理自己的车位',
						page: '/pages/park-manage/park-manage',
						color: '#f5820f'
					},
					{
						id: 2,
						src: '../../static/images/other/invitation.png',
						title: '贵宾邀请',
						content: '邀请朋友来访',
						page: '/pages/vip-invitation/vip-invitation',
						color: '#6297f8'
					}
				],
				coord: {
					"longitude": 0,
					"latitude": 0
				}
			};
		},
		onLoad() {
			this.init()
		},
		methods: {
			init() {
				parkList(this.coord).then((res) => {
					this.list = res.data
					this.list.map(i => {
						if (i.distant > 1000) {
							i.distant = (i.distant / 1000).toFixed(2) + '千米'
						} else {
							i.distant = i.distant.toFixed(2) + '米'
						}
					})
				})
			}
		}
	}
</script>

<style lang="scss">

</style>
