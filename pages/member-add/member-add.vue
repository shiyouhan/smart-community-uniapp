<template>
	<view>
		<divider></divider>
		
		<view class="bg-white">
			<view class="input_line flex algin-center">
				<text class="u-w-146">姓名</text>
				<input v-model="newMember.name" placeholder="请输入姓名" class="w-100"/>
			</view>
			<view class="input_line border-0">
				<text class="u-w-146">手机号</text>
				<input v-model="newMember.phone" placeholder="请输入手机号" class="w-100"/>
			</view>
		</view>
		
		<button class="btn_submit u-m-t-104" @tap="add">
			<text class="btn_content">添加</text>
		</button>
	</view>
</template>

<script>
	import {
		memberAdd
	} from '@/api/info'
	
	export default {
		data() {
			return {
				newMember: {}
			}
		},
		methods: {
			add() {
				const data = {
					familyId: this.newMember.familyId,
					name: this.newMember.name,
					phone: this.newMember.phone
				};
				memberAdd(data).then(res => {
					if (res.code === 200) {
						this.newMember = res.data
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
