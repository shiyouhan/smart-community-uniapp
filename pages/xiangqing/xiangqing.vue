<template>
	<view class="">
		<guangchang :item="list" class="px-3" @pinglun="changePlStatus()" :comment="commentList.length" :dz="dz"
			:star="star" @dianzan="getCount()"></guangchang>
		<view class="comment mx-3 mt-2 mb-5 rounded px-3 pb-3" v-if="commentList.length != 0">
			<view class="comment__title py-3">全部评论</view>
			<view class="">
				<comment v-for="(item,index) in commentList" :key="index" :item="item" class="mt-2"></comment>
			</view>
		</view>
		<view class="bg-white bottom-0 position-fixed flex p-3 w-100" v-if="isComment">
			<view class="flex-1 pr-2">
				<input placeholder="请输入评论……" class="border rounded " style="height: 60rpx; padding-left: 4px;"
					type="text" v-model="content" />
			</view>
			<button class="bg-theme text-white btn font-sm " @click="publishComment()">发布</button>
		</view>
	</view>
</template>

<script>
	import {
		getcommunity,
		getComment,
		putComment,
		starCount,
		dzCount
	} from '@/api/luntan'
	import {
		getDateDiff
	} from '@/lib/time.js'
	export default {
		name: "detail",
		data() {
			return {
				list: {},
				commentList: [],
				isComment: false,
				content: '',
				dz: 0,
				star: 0,
			}
		},
		onLoad(option) {
			wx.showLoading()
			this.load(option.id);
		},
		methods: {
			changePlStatus() {
				this.isComment = true
			},
			publishComment() {
				let param = {
					content: this.content,
					"article_id": this.list.id,
					"type_id": 1
				}

				putComment(param).then(res => {
					console.log(res)
					this.isComment = false
					this.load()
				})
			},
			load(id) {
				getcommunity(id).then((res) => {
					if (res.code === 200) {
						let data1 = res.data
						data1.banner = data1.banner.substring(1, data1.banner.length - 1).split(',')
						data1.createTime = getDateDiff(data1.createTime)
						this.list = data1
						console.log(this.list)
						this.getCount()
					}
				})
				let parma = {
					Index: 1,
					size: 1000
				}
				getComment(1, id, parma).then(res => {
					console.log(res)
					this.commentList = res.data
					this.commentList.forEach(item => {
						item.createTime = getDateDiff(item.createTime)
					})
				})
				this.getCount()
			},
			getCount() {
				let param1 = {
					"type_id": 1,
					id: this.list.id
				}
				let param2 = {
					"article_id": this.list.id,
					"banner": this.list.banner[0],
					"title": this.list.content
				}
				dzCount(param1).then(res => {
					this.dz = res.data
				})
				starCount(param2).then(res => {
					this.star = res.data
					wx.hideLoading()
				})
			},
		}


	}
</script>

<style lang="scss">
	page {
		background-color: rgb(243, 244, 246);
	}

	.comment {
		background: #fff;

		&__title {
			text-align: left;
		}
	}
</style>
