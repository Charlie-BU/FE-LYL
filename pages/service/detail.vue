<template>
    <view class="container">
        <view class="service-detail">
            <view class="service-name">{{ serviceData.name }}</view>
            <view class="service-price">
                <text class="price-symbol">¥</text>
                <text class="price-value">{{ serviceData.price }}</text>
            </view>
            <view class="service-desc">{{ serviceData.description }}</view>
            <view class="service-features">
                <view class="feature-item" v-for="(feature, index) in serviceData.features" :key="index">
                    <u-icon name="checkmark-circle" color="#02ABAB" size="28"></u-icon>
                    <text>{{ feature }}</text>
                </view>
            </view>
            <button v-if="identity === 2" class="buy-btn" @click="showBuyModal">立即购买</button>
        </view>

        <!-- 购买数量弹窗 -->
        <u-popup :show="showModal" mode="center" :round="10" @close="closeModal">
            <view class="modal-content">
                <view class="modal-header">
                    <text class="modal-title">选择购买数量</text>
                    <text class="modal-close" @click="closeModal">×</text>
                </view>
                <view class="modal-body">
                    <view class="quantity-selector">
                        <text class="minus" @click="decreaseQuantity">-</text>
                        <input type="number" v-model="quantity" class="quantity-input" />
                        <text class="plus" @click="increaseQuantity">+</text>
                    </view>
                    <view class="total-price">
                        <text>总价：</text>
                        <text class="price-symbol">¥</text>
                        <text class="price-value">{{ totalPrice }}</text>
                    </view>
                </view>
                <view class="modal-footer">
                    <button class="cancel-btn" @click="closeModal">取消</button>
                    <button class="confirm-btn" @click="confirmPurchase">确认购买</button>
                </view>
            </view>
        </u-popup>
    </view>
</template>

<script>
import { fetch_data } from '../../utils/ajax_request.js'
import * as utils from '../../utils/utils.js'

export default {
    data() {
        return {
            serviceData: {
                id: '',
                name: '',
                price: 0,
                description: '',
                features: []
            },
            showModal: false,
            quantity: 1
        }
    },
    onLoad(options) {
        // 获取服务套餐详情数据
        if (options.id) {
            this.serviceData.id = options.id
            this.getServiceDetail(options.id)
        }
    },
    computed: {
        totalPrice() {
            return this.serviceData.price * this.quantity
        }
    },
    methods: {
        async getServiceDetail(id) {
            fetch_data("POST", 'get_service_by_id', { id }, "service", res => {
                if (res.data.status == 200) {
                    this.serviceData = res.data.service
                } else {
                    uni.showToast({
                        title: '数据获取失败',
                        icon: 'none',
                        duration: 800
                    })
                }
            });
        },
        showBuyModal() {
            if (this.identity !== 2) {
                return;
            }
            this.showModal = true
        },
        closeModal() {
            this.showModal = false
            this.quantity = 1
        },
        decreaseQuantity() {
            if (this.quantity > 1) {
                this.quantity--
            }
        },
        increaseQuantity() {
            this.quantity++
        },
        async confirmPurchase() {
            if (this.identity !== 2) {
                return;
            }
            // 显示加载提示
            uni.showToast({
                title: '请稍后',
                icon: 'loading',
                duration: 1000000
            });

            // 获取用户openid
            utils.get_openid((openid) => {
                // 调用后端创建订单接口
                fetch_data("POST", 'create_pay', {
                    amount: this.totalPrice,
                    description: this.serviceData.name, // 商品描述使用服务套餐名称
                    attach: JSON.stringify({
                        service_id: this.serviceData.id,
                        user_id: uni.getStorageSync('user_id')
                    }), // 附加数据，用于回调时识别订单
                    openid: openid
                }, "service", res => {
                    uni.hideToast();
                    if (res.data) {
                        // 调用微信支付
                        uni.requestPayment({
                            provider: 'wxpay',
                            timeStamp: res.data.timeStamp,
                            nonceStr: res.data.nonceStr,
                            package: res.data.package,
                            signType: res.data.signType,
                            paySign: res.data.paySign,
                            success: () => {
                                try {
                                    fetch_data("POST", 'buy_service', {
                                        service_id: this.serviceData.id,
                                        buyer_id: uni.getStorageSync('user_id'),
                                        amount: this.quantity
                                    }, "service", res => {
                                        if (res.data.status == 200) {
                                            this.closeModal()
                                            uni.showToast({
                                                title: '服务套餐购买成功',
                                                icon: 'none',
                                                duration: 2000
                                            });
                                            // 支付成功后跳转到订单列表
                                            setTimeout(() => {
                                                uni.navigateTo({
                                                    url: '/pages/service/my-service'
                                                });
                                            }, 2000);
                                            return;
                                        } else {
                                            uni.showToast({
                                                title: "支付成功，但交易失败，请联系利易联客服",
                                                icon: 'none',
                                                duration: 2000
                                            });
                                            return;
                                        }
                                    });
                                } catch (error) {
                                    uni.showToast({
                                        title: '支付成功，但交易失败，请联系利易联客服',
                                        icon: 'none',
                                        duration: 2000
                                    });
                                    console.log(error)
                                    return;
                                }
                            },
                            fail: (err) => {
                                console.log('支付失败:', err);
                            }
                        });
                    } else {
                        uni.showToast({
                            title: res.data.message || '创建订单失败',
                            icon: 'none',
                            duration: 2000
                        });
                    }
                });
            });
        }
    }
}
</script>

<style lang="scss" scoped>
.container {
    padding: 30rpx;
}

.service-detail {
    background-color: #fff;
    border-radius: 20rpx;
    padding: 30rpx;

    .service-name {
        font-size: 36rpx;
        font-weight: bold;
        margin-bottom: 20rpx;
    }

    .service-price {
        margin: 30rpx 0;

        .price-symbol {
            color: #02ABAB;
            font-size: 32rpx;
        }

        .price-value {
            color: #02ABAB;
            font-size: 48rpx;
            font-weight: bold;
        }
    }

    .service-desc {
        color: #666;
        font-size: 28rpx;
        line-height: 1.6;
        margin-bottom: 30rpx;
    }

    .service-features {
        .feature-item {
            display: flex;
            align-items: center;
            margin-bottom: 20rpx;

            text {
                margin-left: 10rpx;
                font-size: 28rpx;
                color: #333;
            }
        }
    }

    .buy-btn {
        width: 100%;
        height: 80rpx;
        line-height: 80rpx;
        text-align: center;
        background-color: #02ABAB;
        color: #fff;
        font-size: 32rpx;
        border-radius: 40rpx;
        margin-top: 40rpx;
    }
}

.modal-content {
    background-color: #fff;
    border-radius: 20rpx;
    padding: 30rpx;

    .modal-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 30rpx;

        .modal-title {
            font-size: 32rpx;
            font-weight: bold;
        }

        .modal-close {
            font-size: 40rpx;
            color: #999;
        }
    }

    .modal-body {
        .quantity-selector {
            display: flex;
            justify-content: center;
            align-items: center;
            margin: 30rpx 0;

            .minus,
            .plus {
                width: 60rpx;
                height: 60rpx;
                line-height: 60rpx;
                text-align: center;
                background-color: #f5f5f5;
                font-size: 36rpx;
            }

            .quantity-input {
                width: 100rpx;
                height: 60rpx;
                text-align: center;
                margin: 0 20rpx;
                border: 1px solid #eee;
            }
        }

        .total-price {
            text-align: center;
            margin-top: 20rpx;

            .price-symbol,
            .price-value {
                color: #02ABAB;
                font-size: 32rpx;
                font-weight: bold;
            }
        }
    }

    .modal-footer {
        display: flex;
        justify-content: space-between;
        margin-top: 40rpx;

        button {
            width: 45%;
            height: 80rpx;
            line-height: 80rpx;
            text-align: center;
            border-radius: 40rpx;
            font-size: 32rpx;
        }

        .cancel-btn {
            background-color: #f5f5f5;
            color: #666;
        }

        .confirm-btn {
            background-color: #02ABAB;
            color: #fff;
        }
    }
}

.modal-content {
    width: 600rpx;
    background-color: #fff;
    border-radius: 20rpx;
    padding: 40rpx;

    .modal-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 40rpx;
        padding-bottom: 20rpx;
        border-bottom: 1px solid #eee;

        .modal-title {
            font-size: 32rpx;
            font-weight: bold;
            color: #333;
        }

        .modal-close {
            font-size: 40rpx;
            color: #999;
            padding: 10rpx;
        }
    }

    .modal-body {
        .quantity-selector {
            display: flex;
            justify-content: center;
            align-items: center;
            margin: 40rpx 0;

            .minus,
            .plus {
                width: 70rpx;
                height: 70rpx;
                line-height: 70rpx;
                text-align: center;
                background-color: #f5f5f5;
                font-size: 40rpx;
                color: #333;
                border-radius: 8rpx;
            }

            .quantity-input {
                width: 120rpx;
                height: 70rpx;
                text-align: center;
                margin: 0 30rpx;
                border: 1px solid #eee;
                border-radius: 8rpx;
                font-size: 32rpx;
            }
        }

        .total-price {
            text-align: center;
            margin: 30rpx 0;
            font-size: 32rpx;

            .price-symbol,
            .price-value {
                color: #02ABAB;
                font-size: 36rpx;
                font-weight: bold;
            }
        }
    }

    .modal-footer {
        display: flex;
        justify-content: space-between;
        margin-top: 40rpx;
        padding-top: 30rpx;
        border-top: 1px solid #eee;

        button {
            width: 240rpx;
            height: 80rpx;
            line-height: 80rpx;
            text-align: center;
            border-radius: 40rpx;
            font-size: 32rpx;
        }

        .cancel-btn {
            background-color: #f5f5f5;
            color: #666;
        }

        .confirm-btn {
            background-color: #02ABAB;
            color: #fff;
        }
    }
}
</style>