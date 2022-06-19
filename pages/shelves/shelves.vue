<template>
    <view class="shelves">
        <divider></divider>
        <view class="bg-white mx-2 pt-2">
            <!-- 多图上传 -->
            <upload-image class="upload-img" @change="changeImage" :list="imageList" ref="uploadImage" :show="true">
            </upload-image>
            <view class="px-2">
                <input class="p-3 border-b-1" v-model="title" type="text" placeholder="商品标题简介">
                <textarea class="p-3 input" v-model="desc" type="text" placeholder="商品详细描述" />
            </view>
        </view>
        <divider></divider>

        <view class="bg-white px-2">
            <picker :value="cIndex" :range="communityList" :range-key="'name'" @change="communityChange">
                <uni-list-item title="地点" class="border-b-1">
                    <view class="flex align-center" slot="right">
                        <view class="text-muted">
                            {{communityList[cIndex].name}}
                        </view>
                        <uni-icons size="20" class="uni-icon-wrapper" color="#bbb" type="arrowright" />
                    </view>
                </uni-list-item>
            </picker>
            <picker :value="tIndex" :range="typeList" :range-key="'title'" @change="typeChange">
                <uni-list-item title="分类" class="border-b-1">
                    <view class="flex align-center" slot="right">
                        <view class="text-muted">
                            {{typeList[tIndex].title}}
                        </view>
                        <uni-icons size="20" class="uni-icon-wrapper" color="#bbb" type="arrowright" />
                    </view>
                </uni-list-item>
            </picker>
            <uni-list-item title="价格">
                <view class="flex align-center text-muted" slot="right">
                    <input class="uni-input text-right" placeholder="请输入价格" v-model="price" />
                    <uni-icons size="20" class="uni-icon-wrapper" color="#bbb" type="arrowright" />
                </view>
            </uni-list-item>
        </view>

        <button class="btn_submit u-m-t-30" @click="submit">
            <text class="btn_content">发布</text>
        </button>
    </view>
</template>

<script>
    import {
        goodsType,
        getAllCommunity,
        goodsAdd
    } from '@/api/market'

    import config from '@/lib/config.js'

    import uploadImage from '@/components/uni/uni-upload-image/uni-upload-image'
    import uniListItem from "@/components/common/uni-list-item.vue"
    import uniIcons from '@/components/uni/uni-icons/uni-icons.vue'
    export default {
        components: {
            uploadImage,
            uniListItem,
            uniIcons
        },
        data() {
            return {
                // 要显示的图片数组
                imageList: [],
                // 要上传的图片文件数组
                fileList: [],
                // 类型数组
                typeList: [{
                    id: 0,
                    title: ''
                }],
                // 类型索引
                tIndex: 0,
                // 小区数组
                communityList: [{
                    id: 0,
                    name: ''
                }],
                // 小区索引
                cIndex: 0,
                // 商品标题
                title: '',
                // 商品描述
                desc: '',
                // 商品地点
                address: '',
                // 商品分类id
                typeId: 0,
                // 小区id
                communityId: 0,
                // 价格
                price: '',
                // 用户实时位置
                position: ''

            }
        },
        onLoad() {
            this.getGoodsType();
            this.getAllCommunityList();
            this.getPosition();
        },
        onShow() {
            this.getPosition()
        },
        methods: {
            // 选中图片
            changeImage(e) {
                this.imageList = e.src;
                this.fileList = e.file;
            },
            submit() {
                if (this.checkInfo()) {
                    let imgs = this.imageList.map((value, index) => {
                        return {
                            name: "uploadFiles",
                            uri: value
                        }
                    });
                    uni.uploadFile({
                        url: config.baseUrl + '8083/api/goodsImage/upload',
                        files: imgs,
                        header: {
                            'token': uni.getStorageSync('token'),
                            'position': this.position
                        },
                        success: (res) => {
                            if (res.statusCode === 200) {
                                if (JSON.parse((res.data)).code === 200) {
                                    const imgsList = (JSON.parse((res.data)).data)
                                    let param = {
                                        uploadFile: imgsList,
                                        price: parseFloat(this.price),
                                        name: this.title,
                                        content: this.desc,
                                        address: this.address,
                                        communityId: this.communityId,
                                        typeId: this.typeId
                                    }
                                    goodsAdd(param).then((res) => {
                                        if (res.code === 200) {
                                            this.$msg.toast('上架成功!', 'suc')
                                        }
                                    })
                                }

                            }
                        }
                    })
                }
            },
            // 获取商品类型
            getGoodsType() {
                goodsType().then((res) => {
                    if (res.code === 200) {
                        this.typeList = res.data.map((i) => {
                            let item = {}
                            item.id = i.id
                            item.title = i.title
                            return item
                        });
                        // 添加未选择的状态
                        this.typeList.unshift({
                            id: 0,
                            title: '请选择类型'
                        })
                        // 类型id初始化为第一个元素的id
                        this.typeId = this.typeList[0].id;
                    }
                })
            },
            // 类型选择改变
            typeChange(e) {
                this.tIndex = e.target.value;
                this.typeId = this.typeList[this.tIndex].id;
            },
            // 获取所有小区列表
            getAllCommunityList() {
                getAllCommunity().then((res) => {
                    if (res.code === 200) {
                        this.communityList = res.data.map((i) => {
                            let item = {}
                            item.id = i.id
                            item.name = i.name
                            return item
                        })
                        // 未选择状态
                        this.communityList.unshift({
                            id: 0,
                            name: '请选择小区'
                        })
                        // 地点和社区id初始化为第一个的值
                        this.address = this.communityList[0].name;
                        this.communityId = this.communityList[0].id;
                    }
                })
            },
            // 社区选择改变
            communityChange(e) {
                this.cIndex = e.target.value;
                this.address = this.communityList[this.cIndex].name;
                this.communityId = this.communityList[this.cIndex].id;
            },
            // 判断信息是否都填写完毕
            checkInfo() {
                if (!this.fileList.length || !this.price.trim() || !this.desc ||
                    !this.address || !this.communityId || !this.typeId) {
                    this.$msg.toast('还有信息未填写！', 'err')
                    return false
                }
                if (isNaN(parseFloat(this.price))) {
                    this.$msg.toast('请输入正确的价格！', 'err')
                    return false
                }
                return true
            },
            // 获取用户当前定位
            getPosition() {
                uni.getLocation({
                    type: 'wgs84',
                    success: function(res) {
                        let position = res.longitude + '|' + res.latitude;
                        this.position = position;
                        uni.setStorageSync("position", position)
                    }
                });
            }
        }
    }
</script>

<style lang="scss" scoped>
    .shelves {}

    .uni-input-placeholder,
    .uni-textarea-placeholder {
        color: $uni-text-color-disable;
    }

    ::v-deep .uni-list-item__content-title {
        font-size: $uni-font-size-lg;
    }

    .btn_submit {
        left: 50%;
        margin-left: -339rpx;
    }
</style>
