<template>
	<view>
		<view v-for="(item, index) in showList" :key="index">
			<view class="u-h-166 rounded flex u-m-19">
				<view class="w-92">
					<image :src="item.imgurl" class="w-92"></image>
				</view>
				<view class="flex-1 flex justify-center flex-column u-p-l-19">
					<view class="flex justify-between">
						<view class="u-font-16">{{ item.name }}</view>
						<view class="u-font-12 text-grey">库存20份</view>
					</view>
					<view class="u-font-12 text-grey py-16">月销{{ item.sales }}</view>
					<view class="flex justify-between">
						<view class="flex u-font-14">
							<view class="text-danger">¥{{ item.price }}.00</view>
							<view class="text-grey">/包</view>
						</view>
						<view class="text-theme flex">
							<view class="iconfont icon-jianhao" v-if="item.number > 0" @click="subtract(item.id)"></view>
							<view v-if="item.number > 0" class="px-1">{{ item.number }}</view>
							<view class="iconfont icon-jiahao" @click="add(item.id)"></view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			list: {
				type: Array,
				default: () => []
			},
			tab: {
				type: Number,
				default: 0
			}
		},
		data() {
			return {
			}
		},
		computed: {
			showList() {
				if(this.tab)
					return this.list.filter(e => this.tab == e.tabId)
				return this.list
			}
		},
		methods: {
			subtract(e) {
				for(let i in this.list) {
					if(e == this.list[i].id) {
						if(!this.list[i].number)
							this.list[i].number = 0
						this.list[i].number == 0 || this.list[i].number--
						this.$set(this.list, i, this.list[i])
						break
					}
				}
			},
			add(e) {
				for(let i in this.list) {
					if(e == this.list[i].id) {
						if(!this.list[i].number)
							this.list[i].number = 0
						this.list[i].number++
						this.$set(this.list, i, this.list[i])
						break
					}
				}
			}
		}
	}
</script>

<style>
</style>