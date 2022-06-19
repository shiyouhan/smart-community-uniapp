<template>
	<view>
		<view v-for="(item, index) in data" :key="index" class="u-h-168 bg-white flex justify-between u-m-38">
			<view class="flex justify-center flex-column u-p-l-44">
				<view class="u-font-16 u-p-b-30">{{ item.month + 1 }}月物业费</view>
				<view class="u-font-18 text-theme">¥{{ item.billAccount }}</view>
			</view>
			<view class="flex flex-column justify-end align-end">
				<view class="u-h-54 text-center u-font-12 u-line-29 px-4 bg">
					订单编号:{{ item.id }}
				</view>
				<view class="h-100 flex justify-end u-col-center">
					<view v-if="!item.status" @click="change(index)"
						class="u-font-16 px-2 u-line-35 text-center bg-grey border rounded u-m-r-34">立即支付</view>
					<view v-else class="u-font-16 u-p-r-54 text-theme">已支付</view>
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
					e.month = this.moment(e.createTime).month()
					return e
				})
			}
		},
		methods: {
			change(index) {
				let id = []
				id.push(this.list[index].id)
				uni.request({
					method: 'POST',
					url: 'http://106.14.169.149:8086/api/household/bill/payment',
					header: {
						"token": this.$store.state.user.token
					},
					data: id,
					success: (res) => {
						// if(res.data)
						this.$set(this.list[index], 'status', true)
					}
				})

			}
		}
	}
</script>

<style lang="scss" scoped>
	.bg::before {
		position: absolute;
		content: '';
		display: block;
		left: calc(-25rpx);
		width: 26rpx;
		height: -webkit-fill-available;
		background: linear-gradient(245deg, rgb(231, 231, 231) 50%, transparent 50%, transparent 100%);
	}

	.bg {
		position: relative;
		width: fit-content;
		background-color: rgb(231, 231, 231);
		// background:linear-gradient(60deg, transparent 0%, #9ea3a7 100%, #9ea3a7 100%, transparent 100%);
	}
</style>
