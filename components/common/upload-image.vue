<template>
	<view>
		<!-- <view class="u-w-714 u-h-308 bg-white mx-2 rounded">
			<textarea v-model="data.content" placeholder="请输入报修内容"
				class="u-w-642 u-h-232 u-p-t-38 u-p-l-38 u-p-r-38 bord"></textarea>
		</view> -->
		<view class="u-p-t-10  u-h-220 bg-white mx-2">
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
	</view>
</template>
<script>
	export default {
		data() {
			return {
				data: {
					imgs: [],
					// content: '',
				},
				imgList: [],
			};
		},
		methods: {
			upload() {
				uni.chooseImage({
					count: 3, //默认3
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'], //从相册选择
					loop: true,
					success: res => {
						console.log(res);
						this.data.imgs = res.tempFiles;
						if (res.tempFilePaths.length != 0) {
							let length = res.tempFilePaths.length
							while (length) {
								this.imgList.push(res.tempFilePaths[length - 1]);
								length = length - 1;
							}
						}
						this.$emit("giveData", this.data);
						// console.log(JSON.stringify(res.tempFilePaths));
						// var tempFilePaths = res.tempFilePaths;
						// console.log(tempFilePaths);
						// console.log(tempFilePaths[0]);
						// uni.uploadFile({
						// 	// url: 'http://douzhuoqianshouba.xieenguoji.com/api/ajax/upload',
						// 	filePath: tempFilePaths[0],
						// 	name: 'file',
						// 	success: uploadFileRes => {
						// 		console.log('上传图片', JSON.parse(uploadFileRes.data));
						// 	},
						// 	fail(err) {
						// 		console.log(err);
						// 	}
						// });
					}
				});
			},
			// 删除图片
			del(index) {
				this.imgList.splice(index, 1);
				console.log(this.imgList);
				this.$emit("giveData", this.data);
			},
		}
	}
</script>

<style>
	.bord {
		padding-bottom: 38rpx;
		border-bottom: 1rpx solid #e6e6e6;
	}
</style>