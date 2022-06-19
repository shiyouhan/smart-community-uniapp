<template>
	<view>
		<view class="u-w-714 u-h-308 bg-white mx-2 rounded border-bottom u-m-t-38">
			<textarea v-model="complainContent" placeholder="请输入报修内容"
				class="u-w-642 u-h-232 u-p-t-38 u-p-l-38 u-p-r-38 bord"></textarea>
		</view>
		<upload-image class="u-m-t-38" @giveData="getData"></upload-image>

		<button class="btn_submit u-m-t-54" @click="submit">
			<text class="btn_content">提交</text>
		</button>
	</view>
</template>

<script>
	import uploadImage from "@/components/common/upload-image.vue";
	import axios from "axios";
	export default {
		components: {
			uploadImage
		},
		data() {
			return {
				imgs: [],
				complainContent: '',
				imgUrls: []
			};
		},
		onNavigationBarButtonTap(e) {
			uni.navigateTo({
				url: '../comment-record/comment-record'
			})
		},
		methods: {
			getData(temp) {
				this.imgs = temp.imgs
				this.complainContent = temp.content
				console.log(this.complainContent)
			},
			submit() {
				// 处理没有图片的情况
				if (this.imgs.length === 0) {
					uni.request({
						method: 'POST',
						url: 'http://106.14.169.149:8086/api/household/complain/push',
						header: {
							"token": this.$store.state.user.token,
						},
						data: {
							complainImg: [],
							complainContent: this.complainContent
						},
						success: res => {
							console.log(res.data)
							uni.navigateTo({
								url: '../comment-record/comment-record'
							})
						}
					})
				} else {
					let imgs = this.imgs.map((value, index) => {
						return {
							name: 'imgs' + index,
							uri: value
						}
					});
					uni.uploadFile({
						url: 'http://106.14.169.149:8086/api/household/complain/add',
						files: imgs,
						header: {
							"token": this.$store.state.user.token,
						},
						success: res => {
							let result = JSON.parse(res.data)
							this.imgUrls = result.data
							console.log(this.imgUrls)
							uni.request({
								method: 'POST',
								url: 'http://106.14.169.149:8086/api/household/complain/push',
								header: {
									"token": this.$store.state.user.token,
								},
								data: {
									complainImg: this.imgUrls,
									complainContent: this.complainContent
								},
								success: res => {
									console.log(res.data)
									uni.navigateTo({
										url: '../comment-record/comment-record'
									})
								}
							})
						},
						fail(err) {
							console.log(err);
						}
					});
				}
			}
		}
	}
</script>

<style lang="scss">

</style>
