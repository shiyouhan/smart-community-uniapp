<template>
	<view class="integral">
		<image src="../../static/images/other/integral.png" class="width-100 u-absolute top-0" />
		
		<view class="u-relative flex flex-column justify-center u-p-t-112">
			<text class="u-font-66 text-white flex justify-center u-p-t-38">{{ totalIntegration }}</text>
			<text class="u-font-16 text-white flex justify-center u-p-t-19">我的积分</text>
			<view class="u-p-t-64">
				<integration-list :list="integrationList" class="u-relative">
				</integration-list>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		getIntegration
	} from '@/api/info'
	import integrationList from "@/components/common/integration-list.vue";
	export default {
		components: {
			integrationList
		},
		data() {
			return {
				totalIntegration: 0,
				integrationList: []
			};
		},
		onLoad() {
			this.load()
		},
		methods: {
			load() {
				getIntegration().then(res => {
					if (res.code === 200) {
						this.totalIntegration = res.data.totalIntegration
						this.integrationList = res.data.integrationList
					} else {
						this.$msg.toast(res.message)
						return false
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	.integral {
		padding-top: var(--status-bar-height);
	}
</style>
