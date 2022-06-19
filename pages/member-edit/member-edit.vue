<template>
	<view>
		<view class="lists bg-white">
			<divider></divider>
			
			<view class="input_line flex algin-center">
				<text class="u-w-146">姓名</text>
				<input v-model="member.name" class="w-100"/>
			</view>
			<view class="input_line border-0">
				<text class="u-w-146">手机号</text>
				<input v-model="member.phone" class="w-100"/>
			</view>
		</view>
		
		<button class="btn_submit u-m-t-104" @tap="submit()">
			<text class="btn_content">提交</text>
		</button>
	</view>
</template>

<script>
	import {
		memberEdit
	} from '@/api/info'
	
	export default {
		data() {
			return {
				member: {}
			}
		},
		onLoad(e) {
			console.log(e);
			this.member = JSON.parse(e.item);
			//console.log(this.member)
		},
		methods: {
			submit() {
				const data = {
					id: this.member.id,
					name: this.member.name,
					phone: this.member.phone
				};
				memberEdit(data).then(res => {
					if (res.code === 200) {
						this.member = res.data
						console.log(res.data)
						this.$store.commit('info/SET_FAMILIES', {
							familyList: res.data
						})
						uni.navigateTo({
							url: '../family/family'
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
