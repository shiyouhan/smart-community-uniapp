<template>
	<view>
		<view>
			<view class="bg-white mx-2">
				<divider></divider>
				
				<image :src="estate.imageUrl" class="u-w-714 u-h-284 rounded"></image>
				
				<divider></divider>
				
				<view class="u-p-38">
					<view class="flex justify-between">
						<view class="u-font-38 flex-1">{{ estate.title }}</view>
						<view v-if="estate.title < 0">{{ estate.createTime }}</view>
						<view v-else></view>
						<view class="u-font-14 text-grey">{{ expiresDays }}天前</view>
					</view>
					<view class="u-font-14 text-grey u-p-t-10">{{ estate.content }}</view>
					<view class="flex u-font-16 my-2 u-m-t-38">
						<view>参考价格: </view>
						<view class="text-danger">{{ estate.price }}</view>
						<view>元/每平米</view>
					</view>
					<view  class="flex u-font-16 my-2">
						<view>房产公司: </view>
						<view>{{ estate.company }}</view>
					</view>
					<view class="flex u-font-16 my-2">
						<view>房产地址: </view>
						<view>{{ estate.address }}</view>
					</view>
					<view class="flex justify-between my-2 u-m-t-38">
						<view class="flex u-font-14">
							<view>联系人: </view>
							<view>{{ estate.contact }}</view>
						</view>
						<view class="flex u-font-14">
							<view>联系电话: </view>
							<view>{{ estate.phone }}</view>
						</view>
					</view>
				</view>
				
				<divider></divider>
				
				<view class="flex  align-center justify-between u-h-90 bg-white fixed-bottom">
					<view class="u-m-l-38 flex align-center">
						<view class="iconfont icon-shoucang1 u-p-r-19"
							:class="estate.isMarked ? 'text-theme' : ''" 
							@click="changeCollect"
							></view>
						<view class="u-font-16">收藏</view>
					</view>
					<view class="u-w-154 u-h-64 u-line-35 text-white bg-theme text-center rounded u-m-r-22">立即联系</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		addEsCollect,
		deleteEsCollect
	} from '@/api/service'
	import {
		getEstateDetail
	} from '@/api/service'
	
	export default {
		data() {
			return {
				id: null
			};
		},
		onLoad(e) {
			this.id = e.id
		},
		asyncComputed: {
			estate: {
				get() {
					return this.load(this.id)
				},
				default: {
					id: null,
					title: '',
					content: '',
					imageUrl: '',
					company: '',
					contact: '',
					phone: '',
					address: '',
					price: 0,
					marks: 0,
					createTime: ''
				}
			},
			expiresDays: {
				get() {
					if(!this.estate)
						return ''
					return this.moment().diff(this.moment(this.estate.createTime), 'days')
				}
			}
		},
		methods: {
			async load(e) {
				let res = await getEstateDetail(e)
				if(!res && res.code !== 200) {
					this.$msg.toast(res.message)
					return []
				}
				res = res.data
				res = {
					...res.estateTransaction,
					isMarked: res.isMarked
				}
				return res
			},
			changeCollect() {
				const id = this.estate.id
				if(!this.estate.isMarked) {
					addEsCollect(id).then(res => {
						if (res.code === 200) {
							this.estate.isMarked = true
						} else {
							this.$msg.toast(res.message)
							return false
						}
					})
				} else {
					deleteEsCollect(id).then(res => {
						if (res.code === 200) {
							this.estate.isMarked = false
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

<style lang="scss">

</style>
