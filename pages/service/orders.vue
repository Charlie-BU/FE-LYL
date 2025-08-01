<template>
    <view class="container">

        <!-- 订单状态Tab -->
        <view class="tab-container">
            <view v-for="(item, index) in tabList" :key="index" class="tab-item"
                :class="{ active: currentTab === index }" @click="switchTab(index)">
                <text>{{ item.name }}</text>
                <view v-if="currentTab === index" class="active-line"></view>
            </view>
        </view>

        <!-- 订单列表 -->
        <scroll-view scroll-y class="order-list" refresher-enabled @refresherrefresh="onRefresh"
            :refresher-triggered="isRefreshing">
            <view v-if="orderList.length > 0">
                <view v-for="(order, index) in orderList" :key="index" class="order-item">
                    <!-- 订单内容 -->
                    <view class="order-content" @click="gotoMyService(order.service_id)">
                        <!-- 服务包封面图 -->
                        <image class="service-image" :src="order.profile_img" mode="aspectFill"></image>

                        <!-- 订单信息 -->
                        <view class="order-info">
                            <view class="service-title">{{ order.service_title }}</view>
                            <view class="price-amount">
                                <text class="price">¥{{ order.price }}</text>
                                <text class="amount">x{{ order.amount }}</text>
                            </view>

                            <!-- 合作者信息 -->
                            <view class="cooperator-info">
                                <text class="label">订单ID：</text>
                                <text class="value">{{ order.order_id }}</text>
                            </view>
                            <view class="cooperator-info">
                                <text class="label">合作时间：</text>
                                <text class="value">{{ format_time(order.create_time) }}</text>
                            </view>
                            <view v-if="identity !== 3">
                                <view v-if="order.cooperator_name" class="cooperator-info">
                                    <text class="label">合作者：</text>
                                    <text class="value">{{ order.cooperator_name }}</text>
                                </view>
                                <view v-if="order.cooperator_phone" class="cooperator-info">
                                    <text class="label">联系电话：</text>
                                    <text class="value">{{ order.cooperator_phone }}</text>
                                </view>
                            </view>
                            <view v-else>
                                <view v-if="order.buyer_name" class="cooperator-info">
                                    <text class="label">买方：</text>
                                    <text class="value">{{ order.buyer_name }}</text>
                                </view>
                                <view v-if="order.buyer_phone" class="cooperator-info">
                                    <text class="label">买方电话：</text>
                                    <text class="value">{{ order.buyer_phone }}</text>
                                </view>
                                <view v-if="order.talent_name" class="cooperator-info">
                                    <text class="label">人才方：</text>
                                    <text class="value">{{ order.talent_name }}</text>
                                </view>
                                <view v-if="order.talent_phone" class="cooperator-info">
                                    <text class="label">人才方电话：</text>
                                    <text class="value">{{ order.talent_phone }}</text>
                                </view>
                            </view>
                        </view>
                    </view>

                    <!-- 操作按钮 -->
                    <view class="order-actions" v-if="identity !== 3">
                        <button class="action-btn cooperator-btn" @click.stop="contactCooperator(order)">
                            <u-icon name="chat" color="#ffffff" size="24"></u-icon>
                            <text>联系合作者</text>
                        </button>
                        <button class="action-btn service-btn" @click.stop="lx_kefu">
                            <u-icon name="server-man" color="#ffffff" size="24"></u-icon>
                            <text>{{ currentTab !== 3 ? '联系客服' : '退款/售后' }}</text>
                        </button>
                    </view>
                </view>
            </view>

            <!-- 空状态 -->
            <view v-else class="empty-state">
                <text class="empty-text">暂无订单数据</text>
            </view>
        </scroll-view>
    </view>
</template>

<script>
import { fetch_data } from "../../utils/ajax_request.js";
import { format_time } from "../../utils/utils.js";

export default {
    data() {
        return {
            tabList: [
                { name: '全部订单', status: 'all' },
                { name: '待合作', status: 'pending' },
                { name: '合作中', status: 'processing' },
                { name: '合作完成', status: 'completed' }
            ],
            currentTab: 0,
            orderList: [],
            isRefreshing: false
        };
    },
    onLoad(options) {
        // 检查URL中是否有status参数
        if (options && options.status) {
            // 根据status参数设置当前选中的tab
            const statusIndex = this.tabList.findIndex(tab => tab.status === options.status);
            if (statusIndex !== -1) {
                this.currentTab = statusIndex;
            }
        }
        this.getOrderList();
    },
    methods: {
        format_time,

        // 切换Tab
        switchTab(index) {
            if (this.currentTab === index) return;
            this.currentTab = index;
            this.orderList = [];
            this.getOrderList();
        },

        // 获取订单列表
        getOrderList() {
            uni.showLoading({
                title: '加载中...'
            });

            const status = this.tabList[this.currentTab].status;

            // 调用获取订单列表接口
            fetch_data('POST', 'get_service_orders', {
                status: status,
                user_id: uni.getStorageSync('user_id'),
                identity: uni.getStorageSync('identity')
            }, 'service', res => {
                uni.hideLoading();
                this.isRefreshing = false;

                if (res.data.status === 200) {
                    this.orderList = res.data.orders || [];
                } else {
                    uni.showToast({
                        title: res.data.message || '获取订单列表失败',
                        icon: 'none'
                    });
                }
            });
        },

        gotoMyService(order_id) {
            if (this.identity !== 2) return;
            if (this.status === 'completed') return;
            this.toNext(`/pages/service/my-service?order_id=${order_id}`)
        },

        // 下拉刷新
        onRefresh() {
            this.isRefreshing = true;
            this.getOrderList();
        },

        // 联系合作者
        contactCooperator(order) {
            if (!order.cooperator_id) {
                this.$u.toast('暂无合作者')
                return
            }
            // 跳转到聊天页面或拨打电话
            uni.showActionSheet({
                itemList: ['发送消息', '拨打电话'],
                success: (res) => {
                    if (res.tapIndex === 0) {
                        const user_type = order.cooperator_identity === 2 ? 'user' : 'qy';
                        // 跳转到聊天页面
                        this.toNext(`/pages/message/private_chat?id=${user_type}_${order.cooperator_id}&title=${order.cooperator_name || order.cooperator_phone}`);
                    } else if (res.tapIndex === 1) {
                        // 拨打电话
                        uni.makePhoneCall({
                            phoneNumber: order.cooperator_phone
                        });
                    }
                }
            });
        },
        async lx_kefu() {
            const data = await this.$post('port/lx_kefu')
            if (data.code == 200) {
                let id = data.result.id
                let kf_name = data.result.kf_name
                this.toNext(`/pages/message/private_chat?id=kf_${id}&title=${kf_name}`)
            } else {
                this.$u.toast(data.msg)
            }
        }
    }
};
</script>

<style lang="scss" scoped>
.container {
    background-color: #f5f5f5;
    min-height: 100vh;
}

.header {
    background-color: #ffffff;
    padding: 20rpx 30rpx;
    border-bottom: 1rpx solid #eaeaea;
}

.title {
    font-size: 36rpx;
    font-weight: bold;
    color: #333333;
}

.tab-container {
    display: flex;
    background-color: #ffffff;
    padding: 0 30rpx;
    border-bottom: 1rpx solid #eaeaea;
}

.tab-item {
    position: relative;
    flex: 1;
    height: 80rpx;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 28rpx;
    color: #666666;
}

.tab-item.active {
    color: #007AFF;
    font-weight: bold;
}

.active-line {
    position: absolute;
    bottom: 0;
    width: 40rpx;
    height: 4rpx;
    background-color: #007AFF;
    border-radius: 2rpx;
}

.order-list {
    height: calc(100vh - 180rpx);
    padding: 20rpx;
}

.order-item {
    background-color: #ffffff;
    border-radius: 12rpx;
    margin-bottom: 20rpx;
    padding: 20rpx;
    box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.05);
}

.order-content {
    display: flex;
}

.service-image {
    width: 160rpx;
    height: 160rpx;
    border-radius: 8rpx;
    background-color: #f0f0f0;
}

.order-info {
    flex: 1;
    margin-left: 20rpx;
}

.service-title {
    font-size: 28rpx;
    font-weight: bold;
    color: #333333;
    margin-bottom: 10rpx;
    line-height: 1.4;
}

.price-amount {
    display: flex;
    align-items: center;
    margin-bottom: 16rpx;
}

.price {
    font-size: 32rpx;
    color: #FF5722;
    font-weight: bold;
}

.amount {
    font-size: 24rpx;
    color: #999999;
    margin-left: 10rpx;
}

.cooperator-info {
    display: flex;
    align-items: center;
    margin-top: 8rpx;
    font-size: 24rpx;
}

.label {
    color: #999999;
}

.value {
    color: #333333;
}

.order-actions {
    display: flex;
    justify-content: flex-end;
    margin-top: 20rpx;
    padding-top: 20rpx;
    border-top: 1rpx solid #eaeaea;
    gap: 20rpx;
}

.action-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    color: #ffffff;
    font-size: 26rpx;
    padding: 16rpx 30rpx;
    border-radius: 40rpx;
    line-height: 1.5;
    box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;
    border: none;

    &::after {
        border: none;
    }

    text {
        margin-left: 8rpx;
    }

    &:active {
        transform: scale(0.96);
        box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.08);
    }
}

.cooperator-btn {
    background: linear-gradient(135deg, #1989fa, #007AFF);
}

.service-btn {
    background: linear-gradient(135deg, #19be6b, #18b566);
}

.empty-state {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding-top: 200rpx;
}

.empty-icon {
    width: 200rpx;
    height: 200rpx;
    margin-bottom: 20rpx;
}

.empty-text {
    font-size: 28rpx;
    color: #999999;
}
</style>