<template>
	<view>
		<divider></divider>

		<uni-list-item title="联系人">
			<view class="flex align-center" slot="right">
				<input class="text-grey text-right u-font-12 u-p-r-19" v-model="contact" placeholder="请输入姓名" />
			</view>
		</uni-list-item>
		<uni-list-item title="联系电话">
			<view class="flex align-center" slot="right">
				<input class="text-grey text-right u-font-12 u-p-r-19" v-model="phone" placeholder="请输入手机号" />
			</view>
		</uni-list-item>
		<uni-list-item title="车牌">
			<view class="flex align-center" slot="right">
				<input class="text-grey text-right u-font-12 u-p-r-19" v-model="carNumber" placeholder="请输入车牌号" />
			</view>
		</uni-list-item>

		<divider></divider>

		<picker :value="index" :range="(communityList || []).map(i => i['text'])" :range-key="'communityIndex'"
			@change="change">
			<uni-list-item title="选择小区" class="border-b-1">
				<view class="flex align-center u-font-12 text-grey" slot="right">
					<view class="u-p-r-6">{{ communityList[communityIndex].text }}</view>
					<view class="iconfont icon-youjiantou u-font-12"></view>
				</view>
			</uni-list-item>
		</picker>
		<uni-list-item title="开始时间">
			<view class="flex align-center u-font-12 text-grey" slot="right">
				<view>
					<uni-datetime-picker v-model="startTime" v-if="startTime != ''">{{startTime}}</uni-datetime-picker>
					<uni-datetime-picker v-model="startTime" v-else-if="startTime == ''">请选择时间</uni-datetime-picker>
				</view>
				<view class="iconfont icon-youjiantou u-font-12"></view>
			</view>
		</uni-list-item>
		<uni-list-item title="结束时间">
			<view class="flex align-center u-font-12 text-grey" slot="right">
				<view>
					<uni-datetime-picker v-model="endTime" v-if="endTime != ''">{{endTime}}</uni-datetime-picker>
					<uni-datetime-picker v-model="endTime" v-else-if="endTime == ''">请选择时间</uni-datetime-picker>
				</view>
				<view class="iconfont icon-youjiantou u-font-12"></view>
			</view>
		</uni-list-item>

		<divider></divider>

		<view class="bg-white u-font-12">
			<input class="px-2 py-3" v-model="remark" placeholder="备注(选填)" />
		</view>

		<button class="btn_submit u-m-t-56" @tap="submit">
			<text class="btn_content">提交</text>
		</button>
	</view>
</template>

<script>
	import uniListItem from "@/components/common/uni-list-item.vue"
	import uniDatetimePicker from "@/components/uni/uni-datetime-picker/uni-datetime-picker.vue"
	import {
		invitationAdd,
		parkName
	} from "@/api/parking/index.js"
	export default {
		components: {
			uniListItem,
			uniDatetimePicker
		},
		data() {
			return {
				contact: '',
				phone: '',
				carNumber: '',
				startTime: '',
				endTime: '',
				remark: '',
				communityList: [{
					"text": "",
					"parkingId": 0,
					"communityId": 0
				}, ],
				communityIndex: 0,
				index: 0
			};
		},
		onNavigationBarButtonTap(e) {
			uni.navigateTo({
				url: '/pages/vip-record/vip-record'
			})
		},
		onLoad() {
			parkName().then(res => {
				this.communityList = res.data
			})
		},
		methods: {
			change(e) {
				this.communityIndex = e.detail.value
			},
			submit() {
				let data = {
					"contact": this.contact,
					"phone": this.phone,
					"carNumber": this.carNumber,
					"communityId": this.communityList[this.communityIndex].communityId,
					"startTime": this.startTime.trim() + " 00:00:00",
					"endTime": this.endTime.trim() + " 00:00:00",
					"remark": this.remark
				}
				invitationAdd(data).then(res => {
					if (res.code === 200) {
						uni.showToast({
							title: '发出邀请'
						});
					} else {
						uni.showToast({
							title: res.message
						});
					}
				})
				// uni.navigateTo({
				// 	url: '../parking/parking'
				// })
			}
		}
	}
</script>

<style lang="scss">

</style>
