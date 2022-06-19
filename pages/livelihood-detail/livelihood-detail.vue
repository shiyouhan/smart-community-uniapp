<template>
	<view>
		<view class="m-3" style="padding-bottom: 120rpx;">
			<view v-if="news.type == 0">
				<view class="font-weight-bold font-md">{{ news.title }}</view>
				<view class="font-sm text-grey mt-1 mb-1">{{ news.createTime.substring(0, 10) }}</view>
				<view class="news-image mb-2"><image :src="news.imageUrl" class="news-image rounded"></image></view>
				<rich-text :nodes="news.content" preview="true" class="text-muted "></rich-text>
			</view>
			<web-view :src="news.link" v-else></web-view>
			<view class="rounded bg-white  flex-column p-2 mt-2">
				<view class="mb-2 font-weight-bold">全部回复</view>
				<view class="border-bottom"></view>
				<view v-if="comments.length > 0">
					<view v-for="(item, index) in comments" :key="index">
						<news-comment :item="item" @thump="thump(item)" @getInfo="getUserInfo(item)"></news-comment>
					</view>
				</view>
				<view class="text-muted" v-else>快来发表你的评论吧!</view>
			</view>
		</view>
		<view class="bg-white bottom-0 position-fixed flex p-3 w-100" style="z-index: 1;">
			<view class="flex-1 pr-2">
				<input
					:placeholder="user.nickname"
					class="border
				rounded "
					style="height: 60rpx; padding-left: 4px;"
					type="text"
					v-model="content"
				/>
			</view>
			<button class="bg-theme text-white btn font-sm " @click="publishComment()">发布</button>
		</view>
	</view>
</template>

<script>
import { newsDetail, newsComments, addComments, addThump, cancelThump } from '@/api/index/index.js';
import newsComment from '@/components/common/news-comment.vue';
import { getDateDiff } from '@/lib/time.js';
export default {
	components: {
		newsComment
	},
	data() {
		return {
			id: '',
			news: {},
			comments: [],
			content: '',
			user: {}
		};
	},
	onLoad(option) {
		this.id = option.id;
		this.getData();
		this.getNewsComments();
	},
	methods: {
		getData() {
			let params = {
				news_id: this.id
			};
			newsDetail(params).then(res => {
				this.news = res.data;
			});
		},
		getNewsComments() {
			newsComments(this.id).then(res => {
				this.comments = res.data;
				for (let i = 0; i < this.comments.length; i++) {
					this.comments[i].createTime = getDateDiff(this.comments[i].createTime);
					if (this.comments[i].repairList.length > 0) {
						for (let j = 0; j < this.comments[i].repairList.length; j++) {
							this.comments[i].repairList[j].createTime = getDateDiff(
								this.comments[i].repairList[j].createTime
							);
						}
					}
				}
			});
		},
		publishComment() {
			let params = {
				content: this.content,
				newsId: this.id,
				parentCommentId: this.user.parentId === undefined ? '' : this.user.parentId
			};
			addComments(params).then(res => {
				uni.showToast({
					title: res.message
				});
				(this.content = ''), this.getNewsComments();
				this.user.parentId = undefined
				this.user.nickname = undefined
			});
		},
		// 计算距离顶部的高度
		scrollToTop() {
			let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
			this.scrollTop = scrollTop;
			if (this.scrollTop > 130) {
				this.status = true;
			} else {
				this.status = false;
			}
		},
		// 评论点赞和取消点赞
		thump(item) {
			if (item.isThump == 0) {
				cancelThump(item.id + '').then(res => {
					item.isThump = 1;
					item.thumpCount -= 1;
				});
			} else {
				addThump(item.id + '').then(res => {
					item.isThump = 0;
					item.thumpCount += 1;
				});
			}
		},
		getUserInfo(item) {
			console.log(this.user.nickname);
			console.log(item);
			this.user.nickname = item.userName;
			this.user.parentId = item.id;
			console.log(this.user);
		}
	}
};
</script>

<style scoped>
.news-image {
	width: 100%;
	height: 320rpx;
}
.btn {
	width: 140rpx;
	height: 60rpx;
}
</style>
