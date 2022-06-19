<template>
	<view class="flex p-1 border-bottom" @click="getInfo()">
		<view class="user-avatar"><image :src="item.avatar" class="user-avatar rounded-circle"></image></view>
		<view class="flex-column flex-1 pl-2">
			<view class="user-nickname">{{ item.userName }}</view>
			<view class=" flex text-grey font-sm justify-between">
				<view>{{ item.createTime }}</view>
				<view class="flex">
					<view
						class="iconfont icon-31dianzan"
						:class="{ thump: item.isThump === 0 }"
						@click="thump()"
					></view>
					<view class="ml-1" :class="{ thump: item.isThump === 0 }">{{ item.thumpCount }}</view>
				</view>
			</view>
			<view class="pb-1 text-muted user-comment ">{{ item.content }}</view>
			<view
				v-if="item.repairList.length > 0"
				v-for="(comment, index1) in item.repairList"
				:key="index1"
				class="flex flex-1 border-top py-1"
			>
				<view class="user-avatar">
					<image :src="comment.avatar" class="user-avatar rounded-circle"></image>
				</view>
				<view class="flex-column flex-1 pl-2">
					<view class="user-nickname">{{ comment.userName }}</view>
					<view class=" flex text-grey font-sm justify-between">
						<view>{{ comment.createTime }}</view>
						<view class="flex">
							<view
								class="iconfont icon-31dianzan"
								:class="{ thump: comment.isThump === 0 }"
								@click="itemThump(comment)"
							></view>
							<view class="ml-1" :class="{ thump: comment.isThump === 0 }">{{ comment.thumpCount }}</view>
						</view>
					</view>
					<view class="pb-1 text-muted user-comment">{{ comment.content }}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import { addThump, cancelThump } from '@/api/index/index.js';
export default {
	props: {
		item: Object
	},
	methods: {
		thump() {
			this.$emit('thump');
		},
		getInfo(){
			this.$emit('getInfo')
		},
		itemThump(item) {
			// 评论点赞和取消点赞
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
		}
	}
};
</script>

<style scoped>
.user-avatar {
	width: 77rpx;
	height: 77rpx;
}
.user-nickname {
	font-size: 15px;
	font-weight: 550;
}
.user-comment {
	font-size: 15px;
}
.thump {
	color: #e64a19;
}
</style>
