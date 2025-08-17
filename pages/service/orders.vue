<template>
    <view class="container">
        <!-- 服务类别Tab -->
        <view class="tab-container" style="font-weight: 900;">
            <view v-for="(item, index) in tabList" :key="index" class="tab-item"
                :class="{ active: currentTab === index }" @click="switchTab(index)">
                <text style="font-size: 31rpx;">{{ item.name }}</text>
                <view v-if="currentTab === index" class="active-line"></view>
            </view>
        </view>

        <!-- 订单状态Tab -->
        <view class="tab-container" style="font-weight: 300;">
            <view v-for="(item, index2) in categoryList" :key="index2" class="tab-item"
                :class="{ active: currentCategory === index2 }" @click="changeCategory(index2)">
                <text>{{ item.name }}</text>
                <view v-if="currentCategory === index2" class="active-line"></view>
            </view>
        </view>

        <!-- 订单列表 -->
        <scroll-view scroll-y class="order-list" refresher-enabled @refresherrefresh="onRefresh"
            :refresher-triggered="isRefreshing">
            <view v-if="filteredOrderList.length > 0">
                <view v-for="(order, index) in filteredOrderList" :key="index" class="order-item">
                    <view class="order-status-tag status-pending" v-if="order.status === 1 && !order.talent_name">
                        待合作
                    </view>
                    <view class="order-status-tag status-processing"
                        v-else-if="order.status === 1 && order.talent_name">
                        合作中
                    </view>
                    <view class="order-status-tag status-completed" v-else-if="order.status === 2">
                        合作完成
                    </view>
                    <view class="order-status-tag status-refunded" v-else-if="order.status === 3">
                        已退款
                    </view>
                    <!-- 订单内容 -->
                    <view class="order-content" @click="gotoMyService(order)">
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
                                <view v-if="order.cooperator_phone && order.status === 1" class="cooperator-info">
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
                        <button v-if="order.status === 1 && order.talent_name" class="action-btn service-btn"
                            @click.stop="gotoMyService(order)">
                            <u-icon name="checkbox-mark" color="#ffffff" size="24"></u-icon>
                            <text>完成合作</text>
                        </button>
                        <button v-if="order.status === 1" class="action-btn cooperator-btn"
                            @click.stop="contactCooperator(order)">
                            <u-icon name="chat" color="#ffffff" size="24"></u-icon>
                            <text>联系合作者</text>
                        </button>
                        <button class="action-btn service-btn" @click.stop="lx_kefu" style="background: red;">
                            <u-icon name="server-man" color="#ffffff" size="24"></u-icon>
                            <text v-if="identity !== 1">{{ order.status !== 1 ? '联系客服' : '退款/售后' }}</text>
                            <text v-else>联系客服</text>
                        </button>
                    </view>
                    <view class="order-actions" v-else-if="currentTab !== 4">
                        <button class="action-btn cooperator-btn" @click.stop="cancelCooperation(order)">
                            <text>取消合作</text>
                        </button>
                        <button class="action-btn service-btn" style="background: red;"
                            @click.stop="setRefunded(order)">
                            <text>标记为已退款</text>
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
                { name: '合作完成', status: 'completed' },
                { name: '已退款', status: 'refunded' }
            ],
            currentTab: 0,
            orderList: [],
            isRefreshing: false,
            // 新增类别相关数据
            categories: [],
            categoryList: [{ name: '全部类别' }],
            currentCategory: 0,
            allOrderList: [] // 存储所有订单，用于筛选
        };
    },
    computed: {
        // 根据当前选中的类别筛选订单列表
        filteredOrderList() {
            if (this.currentCategory === 0) {
                // 选择"全部类别"时，返回所有订单
                return this.orderList;
            } else {
                // 根据类别ID筛选订单
                const categoryId = this.categories[this.currentCategory - 1]?.id;
                return this.orderList.filter(order => order.category_id === categoryId);
            }
        }
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
        // 获取服务类别
        this.getServiceCategories();
        // 获取订单列表
        this.getOrderList();
    },
    methods: {
        format_time,

        // 获取服务类别
        getServiceCategories() {
            fetch_data("POST", 'get_service_categories', null, "service", res => {
                if (res.data.status == 200) {
                    this.categories = res.data.categories;
                    // 构建类别列表，添加"全部类别"选项
                    this.categoryList = [{ name: '全部类别' }].concat(
                        this.categories.map(category => {
                            return { name: category.name };
                        })
                    );
                }
            })
        },

        // 切换类别
        changeCategory(index) {
            this.currentCategory = index;
            // 不需要重新请求数据，只需要通过计算属性筛选现有数据
        },

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


        cancelCooperation(order) {
            wx.showModal({
                title: "确认取消",
                content: "确定要取消此次合作吗？",
                success: (res) => {
                    if (res.confirm) {
                        wx.showToast({
                            title: "取消中...",
                            icon: "loading",
                            duration: 100000
                        });
                        fetch_data('POST', 'cancel_cooperation', {
                            service_buyer_id: order.service_buyer_id,
                            user_id: uni.getStorageSync('user_id'),
                            identity: uni.getStorageSync('identity')
                        }, 'service', res => {
                            if (res.data.status === 200) {
                                wx.showToast({
                                    title: "取消成功",
                                    icon: "none",
                                    duration: 700
                                });
                                setTimeout(() => {
                                    uni.reLaunch({
                                        url: "/pages/service/orders"
                                    });
                                }, 700);
                            } else {
                                wx.showToast({
                                    title: res.data.message || '取消合作失败',
                                    icon: 'none'
                                });
                            }
                        });
                    }
                }
            });
        },

        setRefunded(order) {
            wx.showModal({
                title: "确认标记退款",
                content: "确定将该订单要标记为已退款吗？",
                success: (res) => {
                    if (res.confirm) {
                        wx.showToast({
                            title: "请稍后...",
                            icon: "loading",
                            duration: 100000
                        });
                        fetch_data('POST', 'refund_order', {
                            out_trade_no: order.out_trade_no,
                            amount: order.price
                        }, 'service', res => {
                            if (res.data.status === 200) {
                                fetch_data('POST', 'mark_refund', {
                                    service_buyer_id: order.service_buyer_id,
                                    user_id: uni.getStorageSync('user_id'),
                                    identity: uni.getStorageSync('identity')
                                }, 'service', res => {
                                    if (res.data.status === 200) {
                                        wx.showToast({
                                            title: "标记成功",
                                            icon: "none",
                                            duration: 700
                                        });
                                        setTimeout(() => {
                                            uni.reLaunch({
                                                url: "/pages/service/orders"
                                            });
                                        }, 700);
                                    } else {
                                        wx.showToast({
                                            title: res.data.message || '退款失败',
                                            icon: 'none'
                                        });
                                    }
                                });
                            } else {
                                wx.showToast({
                                    title: res.data.message || '退款失败',
                                    icon: 'none'
                                });
                            }
                        });
                    }
                }
            });
        },

        gotoMyService(order) {
            if (this.identity !== 2) return;
            if (this.status === 'completed') return;
            if (order.status !== 1) return;
            this.toNext(`/pages/service/my-service?order_id=${order.service_buyer_id}`)
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
                        const user_type = this.identity === 2 ? 'user' : 'qy';
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
                // this.toNext(`/pages/message/private_chat?id=kf_${id}&title=${kf_name}`)
                this.toNext(`/pages/message/private_chat?id=kf_${id}&title=客服1号`)
            } else {
                this.$u.toast(data.msg)
            }
        },
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

// 调整订单列表的高度，因为添加了一个新的Tab
.order-list {
    height: calc(100vh - 240rpx);
    padding: 20rpx;
}

.order-item {
    background-color: #ffffff;
    border-radius: 12rpx;
    margin-bottom: 20rpx;
    padding: 20rpx;
    box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.05);
    position: relative;
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
    margin-right: 10rpx;
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

.order-status-tag {
    position: absolute;
    top: 20rpx;
    right: 30rpx;
    padding: 4rpx 12rpx;
    border-radius: 20rpx;
    font-size: 22rpx;
    color: #ffffff;
    font-weight: bold;
    box-shadow: 0 2rpx 6rpx rgba(0, 0, 0, 0.1);
}

.status-pending {
    background-color: #ff9800;
    /* 橙色 - 待合作 */
}

.status-processing {
    background-color: #2196f3;
    /* 蓝色 - 合作中 */
}

.status-completed {
    background-color: #4caf50;
    /* 绿色 - 合作完成 */
}

.status-refunded {
    background-color: #f44336;
    /* 红色 - 已退款 */
}
</style>