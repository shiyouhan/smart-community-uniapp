<template>
	<view>
		<image src="../../static/images/other/bg_wuye.png" class="width-100 u-absolute" />

		<view class="u-relative flex flex-column justify-center u-p-t-108">
			<!-- <text class="u-font-66 text-white flex justify-center u-p-t-38">{{ totalMoney }}</text> -->
			<text class="u-font-66 text-white flex justify-center u-p-t-38">{{total}}</text>
			<text class="u-font-16 text-white flex justify-center u-p-t-19">代缴余额（元）</text>
			<view class="flex justify-center u-m-t-72">
				<view class="u-w-342 u-h-88 bg-theme u-line-48 text-center text-white rounded-44 border-white"
					@click="pay">一键缴费</view>
			</view>
		</view>

		<view class="u-p-t-36">
			<property-list :list="list">
			</property-list>
		</view>
	</view>
</template>

<script>
	import propertyList from "@/components/common/property-list.vue";
	export default {
		components: {
			propertyList
		},
		data() {
			return {
				list: [],
				communityId: '',
				waitIds: [],
				total: 0,
			};
		},
		methods: {
			getData() {
				uni.request({
					method: "GET",
					url: 'http://106.14.169.149:8084/api/index/community',
					header: {
						"token": this.$store.state.user.token
					},
					success: (res) => {
						console.log(res.data)
						this.communityId = res.data.data.communityId
						console.log(this.communityId)
						// 查询账单信息
						uni.request({
							method: 'GET',
							url: 'http://106.14.169.149:8086/api/household/bill/list',
							header: {
								"token": this.$store.state.user.token
							},
							data: {
								page: 1,
								size: 999,
								communityId: this.communityId
							},
							success: (res) => {
								console.log(res.data)
								this.list = res.data.data.records
								// 计算全部待缴金额
								for (let item in this.list) {
									if (this.list[item].status === 0) {
										console.log('未支付')
										this.total = this.total + parseFloat(this.list[item]
											.billAccount)
										this.waitIds.push(this.list[item].id)
									}
								}
								this.total = this.total.toFixed(2)
								console.log(this.total)
								console.log(this.waitIds)
							}
						})
					}
				})
			},
			pay() {
				uni.request({
					method: 'POST',
					url: 'http://106.14.169.149:8086/api/household/bill/payment',
					header: {
						"token": this.$store.state.user.token
					},
					data: this.waitIds,
					success: (res) => {
						if (res.data.code == 200) {
							this.total = parseFloat(0).toFixed(2)
							this.list = this.list.map(e => {
								e.status = 1
								return e
							})
						}
					}
				})

			}
		},
		onLoad() {
			this.getData()
		},
		// computed:{
		// 	totalAccount(){
		// 		return this.
		// 	}
		// }
	}
</script>

<style lang="scss">
	// .navbar {
	// 	background: transparent !important;
	// }
</style>
