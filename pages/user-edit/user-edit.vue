<template>
	<view>		
		<uni-list-item title="头像" @click="changeAvatar">
			<view class="flex align-center text-grey" slot="right">
				<image class="w-36 rounded-circle" :src="(user && user.avatar) || ''" />
			</view>
		</uni-list-item>
		<uni-list-item title="账号">
			<view class="flex align-center" slot="right">
				<input class="text-grey text-right u-font-12 u-p-r-19" v-model="user.account"/>
			</view>
		</uni-list-item>
		<uni-list-item title="名字">
			<view class="flex align-center" slot="right">
				<input class="text-grey text-right u-font-12 u-p-r-19" v-model="user.username"/>
			</view>
		</uni-list-item>
		<uni-list-item title="性别" @click="changeGender()">
			<view class="flex align-center" slot="right">
				<text class="text-grey text-right u-font-12 u-p-r-19">{{ user.gender }}</text>
			</view>
		</uni-list-item>
		<uni-list-item title="地区" class="disapper" @click="showCityPicker()">
			<view class="flex align-center" slot="right">
				<text class="text-grey text-right u-font-12 u-p-r-19">{{ user.area }}</text>
			</view>
		</uni-list-item>

        <divider></divider>

		<uni-list-item showBadge :badgeText="formatPhone" title="手机号">
		</uni-list-item>
		<uni-list-item showBadge badgeText="已绑定" title="微信">
		</uni-list-item>
		<uni-list-item showBadge badgeText="未绑定" title="QQ">
		</uni-list-item>
		
		<button class="btn_submit u-m-t-54" @click="submit">
			<text class="btn_content">提交</text>
		</button>
		
		<mpvue-city-picker :themeColor="themeColor" ref="mpvueCityPicker" :pickerValueDefault="cityPickerValueDefault"
			@onConfirm="onConfirm"></mpvue-city-picker>
	</view>
</template>

<script>
	import {
		uploadAvatar,
		personEdit
	} from '@/api/info'
	import {
		getUserInfo
	} from '@/api/user'
	
	import uniListItem from '@/components/common/uni-list-item.vue';
	import mpvueCityPicker from '@/components/uni/mpvue-citypicker/mpvueCityPicker.vue';
	import config from '@/lib/config.js';
	const genderArray = ['保密', '男', '女'];
	import { mapState } from 'vuex'
	
	export default {
		components: {
			uniListItem,
			mpvueCityPicker
		},
		data() {
			return {
				themeColor: '#FC5C82',
				cityPickerValueDefault: [0, 0, 1]
			}
		},
		// 监听返回
		onBackPress() {
			if (this.$refs.mpvueCityPicker.showPicker) {
				this.$refs.mpvueCityPicker.pickerCancel();
				return true;
			}
		},
		// 监听页面卸载
		onUnload() {
			if (this.$refs.mpvueCityPicker.showPicker) {
				this.$refs.mpvueCityPicker.pickerCancel();
			}
		},
		computed: {
			...mapState({
				user: state => state.user.userInfo
			}),
			formatPhone() {
				if(this.user && this.user.phone)
					return this.user.phone.substr(0,3) + "****" + this.user.phone.substr(7)
				return ''
			}
		},
		//  监听页面加载
		onShow() {
		},
		// 监听点击导航栏设置按钮
		onNavigationBarButtonTap(e) {
			uni.navigateTo({
				url: '../setting/setting'
			})
		},
		onLoad() {
			this.load()
		},
		methods: {
			load() {
				getUserInfo().then((res) => {
					if (res.code === 200) {
						this.$store.commit('user/SET_USER_INFO', {
							userInfo: res.data
						})
					} else {
						this.$msg.toast(res.message)
						return false
					}
				})
			},
			// 选择头像
			changeAvatar() {
				uni.chooseImage({
					count: 1,
					sizeType: ['compressed'],
					sourceType: ['album', 'camera'],
					success: res => {
						// console.log(res.tempFilePaths[0]);
						// 改变响应式数据，实时预览
						let header = {}
						let token = uni.getStorageSync('token')
						if(token) {
							header.token = token
						}
						this.avatar = res.tempFilePaths[0]
						uni.uploadFile({
							url: config.baseUrl + '8081/api/avatar/upload',
							filePath: this.avatar,
							name: 'avatar',
							header: header,
							success: (uploadFileRes) => {
								// 注意这里的返回值是string，需要反序列化
								this.user.avatar = JSON.parse(uploadFileRes.data).data
								// 上传成功后,再调用修改个人信息接口，没有新值的就保留user的原值
							},
						})
					}
				});
			},
			// 修改性别
			changeGender() {
				uni.showActionSheet({
					itemList: genderArray,
					success: res => {
						this.user.gender = genderArray[res.tapIndex]
					}
				});
			},
			//显示三级联动城市选择组件
			showCityPicker() {
				this.$refs.mpvueCityPicker.show();
			},
			// 三级联动选择组件提交事件，监听相应的值并显示
			onConfirm(e) {
				this.user.area = e.label;
			},
			// 提交修改请求
			submit() {
				personEdit(this.user).then((res) => {
					if (res.code === 200) {
						this.$msg.toast('更改成功', 'suc');
						this.$store.commit('user/SET_USER_INFO', {
							userInfo: res.data
						})
					} else {
						this.$msg.toast(res.message)
						return false
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>		

</style>

