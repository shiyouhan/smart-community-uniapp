<template>
	<view class="u-m-t-92">				
		<view class="flex algin-center justify-center">
			<image src="../../static/images/other/icon.png"  
				class="w-66 border-half u-m-t-84 u-m-b-84">
		</view>
		
		<view class="tabbar">
			<view v-for="(item, index) in tabBars" class="tabbar-item"
				:key="index"
				:class="tabIndex === index ? 'text-theme line' : ''"
				@tap="changeTab(index)">
				{{item.name}}
			</view>
		</view>
		
		<template v-if="tabIndex === 0">
			<view class="rounded bg-white u-h-244 m-16-20-12">
				<view class="pass flex align-center u-h-120 border-b-4">
					<view class="iconfont icon-renyuan text-hover-light u-p-l-24 u-p-r-19"></view>
					<input type="text" v-model="account" placeholder="请输入账号" class="w-100"/>
				</view>
				<view class="pass flex align-center u-h-120">
					<view class="iconfont icon-suo text-hover-light u-p-l-24 u-p-r-19"></view>
					<input type="password" v-model="password" placeholder="请输入密码" class="w-100"/>
				</view>
			</view>
		</template>
		<template v-else-if="tabIndex === 1">
			<view class="rounded bg-white u-h-244 m-16-20-12">
				<view class="pass flex align-center u-h-120 border-b-4">
					<view class="iconfont icon-shouji text-hover-light u-p-l-24 u-p-r-19"></view>
					<input type="text" v-model="phone" placeholder="请输入手机号" class="w-100"/>
				</view>
				<view class="pass flex align-center u-h-120">
					<view class="iconfont icon-xinfeng text-hover-light u-p-l-24 u-p-r-19"></view>
					<input type="text" v-model="verifyCode" class="u-m-r-4 w-100" placeholder="请输入验证码"/>
					<text class="text-theme px-4 u-w-328" :class="limitTime>0?'disabled':''" @click="getCode()">
						{{limitTime > 0 ? limitTime + 's后可重发' : '发送验证码'}}
					</text>
				</view>
			</view>
		</template>
		
		<view class="u-p-l-38 u-p-r-38">
			<text class="text-grey" @tap="open('password-reset')">忘记密码？</text>
			<text class="text-grey float-r" @tap="open('regist')">注册账号</text>
		</view>
		
		<button class="btn_submit u-m-t-54" @click="login">
			<text class="btn_content">登录</text>
		</button>
		
		<view class="flex algin-center justify-center u-m-t-114">
			<view class="border-y u-m-t-19"></view>
			<text class="text-secondary px-2">第三方登录</text>
			<view class="border-y u-m-t-19"></view>
		</view>
		
		<view class="flex algin-center justify-center u-m-t-44">
			<image src="../../static/images/other/wechat.png" class="w-60 u-p-r-126"/>
			<image src="../../static/images/other/qq.png" class="w-60"/>
		</view>
	</view>
</template>

<script>
	import {
		passwordLogin,
		codeSend,
		codeLogin
	} from '@/api/user'
	
	export default {
		data() {
			return {
				account: '',
				password: '',
				phone: '',
				verifyCode: '',
				tabIndex: 0,
				limitTime: 0,
				// 顶部选项卡
				tabBars: [
					{
						name: "账号密码登录",
					},
					{
						name: "短信验证码登录",
					}
				],
			}
		},
		methods: {
			back() {
				uni.navigateTo({
					url: '/pages/my/my'
				})
			},
			changeTab(index) {
				if (this.tabIndex === index) {
					return;
				}
				console.log(index)
				this.tabIndex = index
				console.log(this.tabIndex)
			},
			open(path) {
				uni.navigateTo({
					url: `../${path}/${path}`
				})
			},
			validate() {
				var mPattern = /^1[345789]\d{9}$/;
				if (!mPattern.test(this.phone)) {
					this.$msg.toast('请输入正确的手机号', 'err')
					return false;
				}
				return true;
			},
			getCode() {
				// 防止重复获取
				if (this.limitTime > 0) {
					return;
				}
				// 验证手机号没通过
				if (!this.validate()) {
					return;
				}
				const data = {
					phone: this.phone
				}
				// 请求验证码接口
				codeSend(data).then((res) => {
					this.$msg.toast('验证码已发送', 'suc');
					console.log(res)
					this.limitTime = 60;
					let timer = setInterval(() => {
						if (this.limitTime >= 1) {
							this.limitTime--;
						} else {
							this.limitTime = 0;
							clearInterval(timer);
						}
					}, 1000);
				})
			},
			login() {
				const data = {
					account: this.account,
					password: this.password,
					phone: this.phone,
					verifyCode: this.verifyCode
				}
				if(this.tabIndex == 0) {
					passwordLogin(data).then((res) => {
						if (res.code === 200) {
							this.$msg.toast('登录成功', 'suc');
							this.$store.commit('user/SET_TOKEN', {
								token: res.data.token
							})
							this.$store.commit('user/SET_USER_INFO', {
								userInfo: res.data.info
							})
							uni.switchTab({
								url: '/pages/index/index'
							})
						} else {
							this.$msg.toast(res.message)
							return false
						}
					})
				} else {
					codeLogin(data).then((res) => {
						if (res.code === 200) {
							this.$msg.toast('登录成功', 'suc');
							this.$store.commit('user/SET_TOKEN', {
								token: res.data.token
							})
							this.$store.commit('user/SET_USER_INFO', {
								userInfo: res.data.info
							})
							uni.navigateTo({
								url: '/pages/password-reset/password-reset'
								// url: '/pages/index/index'
							})
						} else {
							this.$msg.toast(res.message)
							return false
						}
					})
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
.tabbar {
		width: 100%;
		display: flex;
		align-items: center;
	}
	
	.tabbar-item {
		padding: 20rpx 0rpx;
		width: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		position: relative;
		margin: 0rpx 60rpx;
	}
	.line {
		border-bottom: 4rpx solid $primary;
	}

</style>
