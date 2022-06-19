<template>
	<view>
		<divider></divider>
		
		<uni-list-item title="修改密码" @click="open('password-edit')">
		</uni-list-item>
		
		<divider></divider>
		
		<view>
			<uni-list-item title="个人资料" @click="open('user-edit')">
			</uni-list-item>
			<uni-list-item title="意见反馈" @click="open('feedback')">
			</uni-list-item>
			<uni-list-item title="关于我们" @click="open('about')">
			</uni-list-item>
		</view>
		
		
		<button class="btn_submit u-m-t-152" @tap="logout">
			<text class="btn_content">退出登录</text>
		</button>
	</view>
</template>

<script>
	import uniListItem from '@/components/common/uni-list-item.vue';
	export default {
		components: {
			uniListItem
		},
		data() {
			return {
				
			}
		},
		// 监听点击导航栏设置按钮
		onNavigationBarButtonTap(e) {
			uni.navigateTo({
				url: '../my/my'
			})
		},
		methods: {
			open(path) {
				uni.navigateTo({
					url:`../${path}/${path}`,
				})
			},
			// 退出登录
			logout() {
				uni.showModal({
					content: '是否要退出登录',
					success: res => {
						if (res.confirm) {
							uni.clearStorageSync();
							// 返回上一级页面
							// uni.navigateBack({
							// 	delta: 1
							// });
							uni.navigateTo({
								url:`../login/login`,
							})
							uni.showToast({
								title: '退出登录成功',
								icon: 'none'
							});
						}
					}
				});
			}
		}
	}
</script>

<style lang="scss" scoped>

</style>
