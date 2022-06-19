<template>
	<view class="contents">
		<view class="caidans">
			<view class="listT" :class="indexs==i?'chooses':''" @click="chooses(i)" v-for="(v,i) in listT" :key='i'>
				<text>{{v.title}}</text>
				<view v-if="indexs==i" class="biaozhi">
					<image src="../../static/images/other/selected.png" color="#fff" style="width: 15px; height:15px;">
					</image>
				</view>
			</view>
		</view>
		<!-- 二手 -->
		<view class="ershou m-2 p-2" v-if="indexs==2">
			<view :model="form" ref="view">
				<view class="flex uni-input pt-1 pb-3" style="border-bottom:1px solid #eaeaeb">
					原价<text class="text-grey ml-2">￥</text>
					<input class="ml-2" type="text" placeholder="请输入原价" placeholder-style="color: #cfd0cf;"
						v-model="form.yj" />
				</view>
				<view class="flex uni-input pt-3 pb-1">
					现价<text class="text-danger ml-2">￥</text>
					<input class="ml-2" type="text" placeholder="请输入现价" placeholder-style="color: #cfd0cf;"
						v-model="form.xj" />
				</view>
			</view>
		</view>
		<!-- 拼车 -->
		<view class="ershou m-2" v-if="indexs==3">
			<view class="bot">
				<uni-list-item title="是否有车">
					<view class="flex align-center" slot="right">
						<switch @change="changeIsHave" :checked="isHave" color="#f5820f" />
					</view>
				</uni-list-item>

				<picker mode="time" :value="time" start="00:00" end="23:59" @change="xuanxiang">
					<uni-list-item title="出发时间">
						<view class="flex align-center" slot="right">
							<text>{{time}}</text>
							<image class="size-20 ml-2" src="../../static/images/other/ic_arrow_right.png" mode="">
							</image>
						</view>
					</uni-list-item>
				</picker>

				<uni-list-item title="起点" @click="showCityPicker">
					<view class="flex align-center" slot="right">
						<text>{{region}}</text>
						<image class="size-20 ml-2" src="../../static/images/other/ic_arrow_right.png" mode=""></image>
					</view>
				</uni-list-item>

				<uni-list-item title="终点" @click="showCityPicker1">
					<view class="flex align-center" slot="right">
						<text>{{region1}}</text>
						<image class="size-20 ml-2" src="../../static/images/other/ic_arrow_right.png" mode=""></image>
					</view>
				</uni-list-item>
			</view>
		</view>
		<!-- 广场 -->
		<view class="guangchang m-2">
			<!-- 文本域 -->
			<textarea v-model="content" placeholder="说一句话吧" class="input-area" />
			<view class="uPImg">
				<!-- 上传图片 -->
				<view class="shangchuan">
					<view class="sc2" v-for="(item, index) in imgList" :key="index">
						<image class="del" @click="del(index)" src="../../static/images/other/delete_bg.png" mode="">
						</image>
						<image class="Img3" :src="item" mode="" @click="ViewImage"></image>
					</view>
					<view class="sc2" v-if="imgList.length < 9" @click="upload">
						<image class="sc3" src="../../static/images/other/btn_add_image.png" mode=""></image>
					</view>
				</view>
			</view>
		</view>

		<view class="pd_tb20 mt-5">
			<button style="background-color: #FB8C00; color: #FFFFFF;width: 95%;" @click="submit">发布</button>
		</view>

		<mpvue-city-picker :themeColor="themeColor" ref="mpvueCityPicker" :pickerValueDefault="cityPickerValueDefault"
			@onConfirm="onConfirm"></mpvue-city-picker>
		<mpvue-city-picker :themeColor="themeColor" ref="mpvueCityPicker1" :pickerValueDefault="cityPickerValueDefault"
			@onConfirm="onConfirm1"></mpvue-city-picker>
	</view>
</template>

<script>
	const config = require('@/lib/config.js')
	import uniListItem from '@/components/uni/uni-list-item/uni-list-item.vue';
	import mpvueCityPicker from '@/components/uni/mpvue-citypicker/mpvueCityPicker.vue';
	import {
		getYearYueDay
	} from '@/lib/time.js'
	import {
		postGc,
		postHz,
		postEs,
		postPc
	} from '@/api/luntan'
	export default {
		components: {
			uniListItem,
			mpvueCityPicker
		},
		data() {
			return {
				themeColor: '#f5820f',
				cityPickerValueDefault: [0, 0, 1],
				time: '请选择',
				region: '请选择',
				region1: '请选择',
				content: '',
				imgList: [],
				dd1: false,
				dd2: false,
				switchVal: false,
				form: {
					yj: '',
					xj: '',
				},
				form2: {
					cfsj: '',
					qd: '',
					zd: ''
				},
				value1: '',
				indexs: 0,
				listT: [{
						title: "广场"
					},
					{
						title: "互助"
					},
					{
						title: "二手"
					},
					{
						title: "拼车"
					}
				],
				content: '',
				isHave: false,
				showBack: false //是否以及弹出提示框
			}
		},
		computed: {
			show() {
				return this.imgList.length > 0;
			}
		},
		methods: {
			changeIsHave() {
				this.isHave = !this.isHave
			},
			upload() {
				let that = this
				var num = 9 - that.imgList.length
				if (num == 0) {
					wx.showToast({
						title: '最多能上传9张图片',
						duration: 1500
					});
					return
				}
				uni.showActionSheet({
					itemList: ['从相册获取', '拍照'],
					success(res1) {
						if (res1.tapIndex == 0) {
							wx.chooseImage({
								count: 9, //默认9
								sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
								sourceType: ['album'], //从相册选择
								success: (res) => {
									res.tempFilePaths.forEach(item => {
										uni.uploadFile({
											url: config.baseUrl +
												'8083/api/goodsImage/upload',
											filePath: item,
											name: 'uploadFiles',
											header: {
												'token': uni.getStorageSync('token'),
												"Content-Type": "multipart/form-data;boundary='asdadadada'",
											},
											success: (res1) => {
												let param = JSON.parse(res1.data)
													.data
												console.log(param)
												if (that.imgList.length != 0) {
													that.imgList = that.imgList
														.concat(param)
												} else {
													that.imgList = param
												}
											}
										})
									})

								}
							});
						} else if (res1.tapIndex == 1) {
							wx.chooseImage({
								count: 1,
								sizeType: ['original', 'compressed'],
								sourceType: ['camera'],
								success: function(res) {
									wx.saveImageToPhotosAlbum({
										filePath: res.tempFilePaths[0],
										success: function() {
											res.tempFilePaths.forEach(item => {
												uni.uploadFile({
													url: config.baseUrl +
														'8083/api/goodsImage/upload',
													filePath: item,
													name: 'uploadFiles',
													header: {
														'token': uni
															.getStorageSync(
																'token'),
														"Content-Type": "multipart/form-data;boundary='asdadadada'",
													},
													success: (res1) => {
														let param =
															JSON.parse(
																res1
																.data)
															.data
														console.log(
															param)
														if (that
															.imgList
															.length !=
															0) {
															that.imgList =
																that
																.imgList
																.concat(
																	param
																	)
														} else {
															that.imgList =
																param
														}
													}
												})
											})
										}
									})
								}
							})
						}
					},
					fail(e) {
						console.log(e)
					}
				})
			},
			ViewImage(e) {
				uni.previewImage({
					urls: this.imgList,
					current: e.currentTarget.dataset.url
				});
			},

			// 删除图片
			del(index) {
				this.imgList.splice(index, 1);
				console.log(this.imgList);
			},
			//下拉框
			xuanxiang: function(e) {
				this.time = e.target.value
			},
			//显示三级联动城市选择组件
			showCityPicker() {
				this.$refs.mpvueCityPicker.show();
			},
			//显示三级联动城市选择组件
			showCityPicker1() {
				this.$refs.mpvueCityPicker1.show();
			},
			// 三级联动选择组件提交事件，监听相应的值并显示
			onConfirm(e) {
				this.region = e.label;
			},
			onConfirm1(e) {
				this.region1 = e.label;
			},

			chooses(i) {
				this.indexs = i
			},
			//选中的图片
			changeImage(e) {
				console.log(e)
				this.imageList = e
			},
			back() {
				uni.navigateBack({
					delta: 1
				})
			},
			iconClickEvent(e) {
				switch (e) {
					case "uploadImage":
						this.$refs.uploadImage.chooseImage();
						break;
				}
			},
			submit() {
				let param = {}
				console.log('sadada')
				switch (this.indexs) {
					case 0:
						param = {
							content: this.content,
							title: this.content,
							img: this.imgList
						}
						postGc(param).then(res => {
							console.log(res)
							uni.showToast({
								title: '发布成功',
								icon: 'none',
								duration: 2000
							});
							uni.navigateBack({
								delta: 1
							})
						})
						console.log('sadada')
						break;
					case 1:
						param = {
							content: this.content,
							title: this.content,
							img: this.imgList
						}
						postHz(param).then(res => {
							uni.showToast({
								title: '发布成功',
								icon: 'none',
								duration: 2000
							});
							uni.navigateBack({
								delta: 1
							})
						})
						break;
					case 2:
						param = {
							content: this.content,
							title: this.content,
							ori_price: this.form.yj,
							now_price: this.form.xj,
							img: this.imgList
						}
						postEs(param).then(res => {
							uni.showToast({
								title: '发布成功',
								icon: 'none',
								duration: 2000
							});
							uni.navigateBack({
								delta: 1
							})
						})
						break;
					case 3:
						param = {
							content: this.content,
							title: this.content,
							status: this.isHave,
							origin: this.origin,
							destination: this.origin1,
							time: getYearYueDay() + ' ' + this.time + ':00',
							img: this.imgList
						}
						postPc(param).then(res => {
							uni.showToast({
								title: '发布成功',
								icon: 'none',
								duration: 2000
							});
							uni.navigateBack({
								delta: 1
							})
						})
						break;
				}


			}
		},
	}
</script>

<style lang="scss" scoped>
	page {
		background: #f1f1f1;
	}

	.size-20 {
		width: 18rpx;
		height: 30rpx;
	}

	.shangchuan {
		margin: 0 auto;
		display: flex;
		align-items: center;
		flex-wrap: wrap;

		.sc2 {
			width: 220rpx;
			height: 220rpx;
			text-align: center;
			position: relative;
		}

		.Img3 {
			width: 200rpx;
			height: 200rpx;
			border-radius: 10rpx;
		}

		.del {
			width: 30rpx;
			height: 30rpx;
			position: absolute;
			z-index: 1000;
			top: 0rpx;
			right: 10rpx;
		}

		.sc3 {
			width: 200rpx;
			height: 200rpx;
			border-radius: 10rpx;
		}
	}

	.tupian {
		width: 110px;
		height: 106px;

		image {
			width: 110px;
			height: 106px;
		}

	}

	.contents {
		width: 100%;
		background: #f1f1f1;
	}

	.rongqi {
		padding: 20rpx;
	}

	.caidans {
		display: flex;
		justify-content: space-between;
		padding: 20rpx;
	}

	.biaozhi {
		border-radius: 50%;
		width: 40rpx;
		height: 40rpx;
		line-height: 40rpx;
		text-align: center;
		background: #FB8C00;
		position: absolute;
		bottom: -6rpx;
		right: -6rpx;
	}

	.listT {
		width: 22%;
		padding: 22rpx 0;
		border-radius: 10rpx;
		background: #fff;
		font-size: 30rpx;
		font-weight: bold;
		display: flex;
		align-items: center;
		justify-content: center;
		color: #333;
		position: relative;
	}

	.chooses {
		color: #FB8C00;
		border: 1rpx solid #FB8C00;
	}

	.guangchang {
		background: #fff;
		padding: 20rpx;
		border-radius: 10rpx;
		box-shadow: 4rpx 4rpx 8rpx 2px rgba(208, 208, 208, 0.25);
		margin-top: 10rpx;
	}

	.ershou {
		margin-top: 10rpx;
		background: #fff;

		.bot {
			width: 100%;
			background-color: white;
		}
	}

	.pinche {
		margin-top: 10rpx;
		padding: 0rpx 40rpx;
		background: #fff;
	}
</style>
