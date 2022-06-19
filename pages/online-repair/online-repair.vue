<template>
	<view>
		<divider></divider>

		<uni-list-item showBadge :badgeText="data.username" title="联系人">
		</uni-list-item>
		<uni-list-item showBadge :badgeText="data.phone" title="联系电话">
		</uni-list-item>

		<!-- 地址选择器 -->
		<picker @change="bindPickerChange" :range="array" mode="multiSelector">
			<view>
				<uni-list-item showBadge :badgeText="data.address" title="地址">
				</uni-list-item>
			</view>
		</picker>
		<!-- <uni-list-item showBadge :badgeText="data.address" title="地址">
		</uni-list-item> -->

		<!-- 时间选择器 -->
		<uni-datetime-picker v-model="data.orderTime" @change="change">
			<uni-list-item showBadge :badgeText="data.orderTime" title="预约时间">\
			</uni-list-item>
		</uni-datetime-picker>

		<divider></divider>
		<!-- 报修类型 -->
		<uni-list-item showBadge :badgeText="data.repairType" title="报修类型" @tap="showTypeSelect()">
		</uni-list-item>

		<divider></divider>
		<!-- 维修标题 -->
		<view class="u-w-714 bg-white mx-2 rounded mb-1">
			<input maxlength="10" placeholder="维修标题" v-model="data.repairTitle"
				class="u-w-642 u-p-t-38 u-p-l-38 u-p-r-38 bord" />
		</view>



		</uni-list-item>
		<view class="u-w-714 u-h-308 bg-white mx-2 rounded">
			<textarea v-model="data.repairContent" placeholder="请输入报修内容"
				class="u-w-642 u-h-232 u-p-t-38 u-p-l-38 u-p-r-38 bord"></textarea>
		</view>
		<view class="u-p-t-10 u-w-714 u-h-220 bg-white mx-2">
			<!-- 上传图片 -->
			<view class="u-h-200 flex align-center">
				<view class="w-120 u-rela mx-1" v-for="(item, index) in imgList" :key="index">
					<image class="w-16 u-abso z-999 top-0 right-0" @click="del(index)"
						src="../../static/images/other/delete_bg.png" mode=""></image>
					<image class="w-100 height-100 rounded" :src="item" mode=""></image>
				</view>
				<view class="w-120 u-rela" v-if="imgList.length < 3" @click="upload">
					<image class="w-120 rounded" src="../../static/images/other/btn_add_image.png" mode=""></image>
				</view>
			</view>
		</view>

		<button class="btn_submit u-m-t-54" @click="submit">
			<text class="btn_content">提交</text>
		</button>
	</view>
</template>

<script>
	import uniListItem from "@/components/common/uni-list-item.vue";
	// import axios from "axios"
	export default {
		components: {
			uniListItem
		},
		data() {
			return {
				data: {
					username: this.$store.state.user.userInfo.username,
					phone: this.$store.state.user.userInfo.phone,
					address: '',
					orderTime: '',
					repairType: '',
					repairContent: '',
					repairImg: [],
					repairTitle: '',
				},
				imgList: [],

				array: [
					["一单元", "二单元", "三单元", "四单元", "五单元", "六单元", "七单元"],
					["101", "102", "103", "104", "105", "106",
						"201", "202", "203", "204", "205", "206",
						"301", "302", "303", "304", "305", "306",
						"401", "402", "403", "404", "405", "406",
						"501", "502", "503", "504", "505", "506",
						"601", "602", "603", "604", "605", "606",
						"701", "702", "703", "704", "705", "706",
						"801", "802", "803", "804", "805", "806",
						"901", "902", "903", "904", "905", "906"
					]
				]
			};
		},
		onNavigationBarButtonTap(e) {
			uni.navigateTo({
				url: '../repair-record/repair-record'
			})
		},
		methods: {
			// 预约时间选择器
			change(e) {
				this.data.orderTime = e
			},
			bindPickerChange(e) {
				this.data.address = this.array[0][e.detail.value[0]] + '-' + this.array[1][e.detail.value[1]]
			},
			upload() {
				uni.chooseImage({
					count: 3, //默认3
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'], //从相册选择
					loop: true,
					success: res => {
						console.log(res.tempFiles);
						const tempFilePaths = res.tempFilePaths;
						if (res.tempFilePaths.length != 0) {
							let length = res.tempFilePaths.length
							while (length) {
								this.imgList.push(res.tempFilePaths[length - 1]);
								length = length - 1;
							}
						}
						console.log(this.imgList.length)
					}
				});
			},
			// 删除图片
			del(index) {
				this.imgList.splice(index, 1);
				console.log(this.imgList.length)
			},
			submit() {
				// 处理报修类型赋值
				this.data.repairType = this.data.repairType === '私有设备报修' ? 0 : 1
				// 没有图片的情况，直接上传数据
				if (this.imgList.length === 0) {
					uni.request({
						method: 'POST',
						url: 'http://106.14.169.149:8086/api/household/repair/push',
						header: {
							"token": this.$store.state.user.token,
						},
						data: this.data,
						success: res => {
							console.log(res.data)
							uni.navigateTo({
								url: '../repair-record/repair-record'
							})
						}
					})
				} else {
					let imgs = this.imgList.map((value, index) => {
						return {
							name: 'imgs' + index,
							uri: value
						}
					});
					console.log(imgs);
					uni.uploadFile({
						url: 'http://106.14.169.149:8086/api/household/pic/upload',
						files: imgs,
						header: {
							"token": this.$store.state.user.token,
						},
						success: res => {
							let result = JSON.parse(res.data)
							this.data.repairImg = result.data
							console.log(this.data.repairImg)
							uni.request({
								method: 'POST',
								url: 'http://106.14.169.149:8086/api/household/repair/push',
								header: {
									"token": this.$store.state.user.token,
								},
								data: this.data,
								success: res => {
									console.log(res.data)
									uni.navigateTo({
										url: '../repair-record/repair-record'
									})
								}
							})
						},
						fail(err) {
							console.log(err);
						}
					});
				}
				// const formData = new FormData();
				// formData.append('username', this.data.username)
				// formData.append('phone', this.data.phone)
				// // 地址选择器
				// formData.append('address', this.data.address)
				// // 时间选择器
				// formData.append('orderTime', this.data.orderTime)
				// formData.append('repairType', this.data.repairType === '私有设备报修' ? 0 : 1)
				// formData.append('repairContent', this.data.repairContent)
				// formData.append('repairTitle', this.data.repairTitle)
				// for (var i = 0; i < this.imgList.length; i++) {
				// 	formData.append('imgs', this.data.imgs[i])
				// }
				// axios({
				// 	method: "POST",
				// 	url: "http://106.14.169.149:8086/api/household/repair/add",
				// 	headers: {
				// 		"token": this.$store.state.user.token,
				// 		"Content-Type": "multipart/form-data"
				// 	},
				// 	data: formData
				// }).then((res) => {
				// 	console.log(res.data)
				// 	uni.navigateTo({
				// 		url: '../repair-record/repair-record'
				// 	})
				// })
			},
			showTypeSelect() {
				uni.showActionSheet({
					itemList: ['私有设备报修', '公共设备维修'],
					success: (res) => {
						this.data.repairType = res.tapIndex === 0 ? '私有设备报修' : '公共设备维修'
					},
					fail: (res) => {
						console.log(res.errMsg);
					}
				});
			}

		},
	}
</script>

<style lang="scss">
	.bord {
		padding-bottom: 38rpx;
		border-bottom: 1rpx solid #e6e6e6;
	}
</style>
