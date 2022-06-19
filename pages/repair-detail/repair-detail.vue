<template>
	<view>
		<view>
			<view class="mx-2 u-m-b-0 bg-white flex flex-column u-p-38 rounded">
				<view class="flex justify-between">
					<view class="u-font-18">{{ repair.repairTitle }}</view>
					<view class="text-theme u-font-14" v-if="repair.status == 0">未处理</view>
					<view class="text-theme u-font-14" v-else-if="repair.status == 1">已维修</view>
					<view class="text-theme u-font-14" v-else-if="repair.status == 2">维修中</view>
				</view>
				<view class="u-font-14 text-grey my-2">{{ repair.createTime }}</view>
				<view class="u-font-16">{{ repair.repairContent }}</view>
				<view class="flex justify-around u-m-t-19" v-if="repair.repairImg">
					<image :src="repair.repairImg[0]" class="w-110"></image>
					<image :src="repair.repairImg[1]" class="w-110"></image>
					<image :src="repair.repairImg[2]" class="w-110"></image>
				</view>
				<view v-else></view>
				<view v-if="repair.status != 0">
					<view class="u-m-19 u-p-19 bg-hover-light rounded">
						<view class="u-font-14 text-grey flex justify-between u-p-b-19">
							<view>物业回复:</view>
							<view class="u-font-12">{{ repair.repairRecord.resultTime }}</view>
						</view>
						<view class="u-font-14 content-two u-line-18">{{ repair.repairRecord.repairResult }}</view>
					</view>
					<view class="flex u-m-b-38">
						<view class="u-font-12 u-line-24 u-p-r-22">星级评价：</view>
						<uni-rate :touchable="false" :value="rateValue" @change="onChange" />
					</view>
					<view class="flex">
						<view class="u-font-12 u-line-24 u-p-r-22">文字评价：</view>
						<textarea placeholder="请输入你的评价" class="u-w-504 u-h-210 bg-white rounded border"
							v-model="assessContent"></textarea>
					</view>
					<view class="flex justify-end u-m-t-19" v-if="repair.repairRecord.repairAssess == undefined">
						<!-- <view class="flex justify-end u-m-t-19" v-if=""> -->
						<view class="u-w-154 u-h-64 bg-theme text-white u-line-35 text-center rounded" @tap="submit()">
							发表评论</view>
					</view>
				</view>

			</view>
		</view>
	</view>
</template>

<script>
	import axios from "axios"
	import uniRate from "@/components/uni/uni-rate/uni-rate.vue"
	export default {
		components: {
			uniRate
		},
		data() {
			return {
				rateValue: 0,
				repair: {
					repairRecord: {
						resultTime: '',
						repairResult: '',
						status: '',
					}
				},
				assessContent: '',
			};
		},
		onLoad(option) {
			console.log("拿到的id", option.id)
			uni.request({
				method: 'GET',
				url: `http://106.14.169.149:8086/api/household/repair/${option.id}`,
				header: {
					"token": this.$store.state.user.token
				},
				success: (res) => {
					console.log(res.data.data)
					this.repair = res.data.data
					if (this.repair.repairRecord.status != 0) {
						this.rateValue = this.repair.repairRecord.satisfaction
						this.assessContent = this.repair.repairRecord.repairAssess
					}
				}
			})
			// axios({
			// 	method: "GET",
			// 	url: `http://106.14.169.149:8086/api/household/repair/${option.id}`,
			// 	headers: {
			// 		"token": this.$store.state.user.token
			// 	},
			// }).then((res) => {
			// 	this.repair = res.data.data
			// 	if (this.repair.repairRecord.status != 0) {
			// 		this.rateValue = this.repair.repairRecord.satisfaction
			// 		this.assessContent = this.repair.repairRecord.repairAssess
			// 	}
			// })
		},
		methods: {
			onChange(e) {
				this.rateValue = e.value;
				console.log('rate发生改变:', this.rateValue);
			},
			submit() {
				axios({
					method: 'POST',
					url: 'http://106.14.169.149:8086/api/household/repair/assess',
					data: {
						repairId: this.repair.id,
						satisfaction: this.rateValue,
						repairAssess: this.assessContent
					},
					headers: {
						"token": this.$store.state.user.token
					}
				}).then(res => {
					if (res.data.code === 200) {
						console.log(res.data)
						this.$msg.toast('发布成功', 'suc');
						uni.navigateTo({
							url: '../repair-record/repair-record'
						})
					} else {
						this.$msg.toast(res.data.message, 'err');
					}
				})
			}
		}
	}
</script>

<style lang="scss">

</style>