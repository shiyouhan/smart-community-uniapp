<template>
	<view>
		<view>
			<divider></divider>
			<view class="mx-2 u-m-b-0 bg-white flex flex-column u-p-38 rounded">
				<view class="flex justify-between">
					<view class="u-font-18">{{ records.username }}</view>
					<view class="text-theme u-font-14" v-if="records.status == 0">未回复</view>
					<view class="text-success u-font-14" v-if="records.status == 1">已回复</view>
				</view>
				<view class="u-font-14 text-grey my-2">{{ records.createTime }}</view>
				<view class="u-font-16">{{ records.complainContent }}</view>
				<view class="flex justify-around u-m-t-19" v-if="records.complainImg">
					<image :src="records.complainImg[0]" class="w-110"></image>
					<image :src="records.complainImg[1]" class="w-110"></image>
					<image :src="records.complainImg[2]" class="w-110"></image>
				</view>
				<view v-else></view>

				<view class="u-m-19 u-p-19 bg-hover-light rounded" v-if="records.status == 1">
					<view class="u-font-14 text-grey flex justify-between u-p-b-19">
						<view>物业回复:</view>
						<view class="u-font-12">{{ comment.resultTime }}</view>
					</view>
					<view class="u-font-14 content-two u-line-18">{{ comment.complainResult }}</view>
				</view>

				<!-- <view class="flex u-m-b-38">
          <view class="u-font-12 u-line-24 u-p-r-22">星级评价：</view>
          <uni-rate :touchable="false" :value="0" @change="onChange" />
        </view>
        <view class="flex">
          <view class="u-font-12 u-line-24 u-p-r-22">文字评价：</view>
          <textarea placeholder="请输入你的评价" class="u-w-504 u-h-210 bg-white rounded border"></textarea>
        </view>
        <view class="flex justify-end u-m-t-19">
          <view class="u-w-154 u-h-64 bg-theme text-white u-line-35 text-center rounded" @click="submit">发表评论</view>
        </view> -->

			</view>
		</view>
	</view>
</template>

<script>
	// import axios from "axios"
	import uniRate from "@/components/uni/uni-rate/uni-rate.vue"
	export default {
		components: {
			uniRate
		},
		data() {
			return {
				rateValue: 0,
				records: {
					username: '',
					status: '',
					createTime: '',
					complainImg: [],
					complainContent: '',
				},
				comment: {
					resultTime: '',
					complainResult: ''
				},
			};
		},
		onLoad(option) {
			// console.log("拿到的id", option.id)
			uni.request({
				method: "GET",
				url: `http://106.14.169.149:8086/api/household/complain/${option.id}`,
				header: {
					"token": this.$store.state.user.token
				},
				success: (res) => {
					this.records = res.data.data
					if (this.records.complainResult.complainResult != undefined) {
						this.comment = this.records.complainResult
					}
				}
			})
			// axios({
			// 	method: "GET",
			// 	url: `http://106.14.169.149:8086/api/household/complain/${option.id}`,
			// 	headers: {
			// 		"token": this.$store.state.user.token
			// 	},
			// }).then((res) => {
			// 	console.log(res.data.data)
			// 	this.records = res.data.data
			// 	if (this.records.complainResult.complainResult != undefined) {
			// 		this.comment = this.records.complainResult
			// 		console.log(this.comment)
			// 	}
			// })
		},
		methods: {
			onChange(e) {
				console.log('rate发生改变:' + JSON.stringify(e))
			},
			submit() {
				uni.navigateTo({
					url: '../comment-record/comment-record'
				})
			}
		}
	}
</script>

<style lang="scss">

</style>