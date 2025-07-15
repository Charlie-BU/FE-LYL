<template>
    <view class="container">
        <view class="service-detail">
            <view class="service-name">{{ serviceData.name }}</view>
            <view class="service-images" v-if="serviceData.images && serviceData.images.length > 0">
                <swiper class="swiper" circular autoplay interval="3000" duration="500" @change="swiperChange">
                    <swiper-item v-for="(image, index) in serviceData.images" :key="index" class="swiper-item">
                        <image :src="image" mode="aspectFill" @click="previewImage(index)" />
                    </swiper-item>
                </swiper>
                <view class="swiper-dots">
                    <view v-for="(item, index) in serviceData.images" :key="index"
                        :class="['dot', currentSwiperIndex === index ? 'active' : '']"></view>
                </view>
            </view>
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
                features: [],
                images: []
            },
            currentSwiperIndex: 0,
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
        },
        // 添加轮播图切换事件处理
        swiperChange(e) {
            this.currentSwiperIndex = e.detail.current;
        },
        // 添加图片预览功能
        previewImage(index) {
            uni.previewImage({
                current: index,
                urls: this.serviceData.images
            });
        },
    }
}
</script>

<style lang="scss" scoped>
.container {
    padding: 40rpx;
    background: linear-gradient(135deg, #f8f9fa, #e9ecef);
    min-height: 100vh;
}

.service-images {
    width: 100%;
    height: 500rpx;
    position: relative;
    margin-bottom: 30rpx;

    .swiper {
        width: 100%;
        height: 100%;

        .swiper-item {
            width: 100%;
            height: 100%;

            image {
                width: 100%;
                height: 100%;
                border-radius: 30rpx;
            }
        }
    }

    .swiper-dots {
        position: absolute;
        bottom: 30rpx;
        left: 50%;
        transform: translateX(-50%);
        display: flex;
        gap: 12rpx;

        .dot {
            width: 12rpx;
            height: 12rpx;
            background: rgba(255, 255, 255, 0.6);
            border-radius: 6rpx;
            transition: all 0.3s ease;

            &.active {
                width: 24rpx;
                background: #fff;
            }
        }
    }

    &::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        height: 120rpx;
        background: linear-gradient(to top, rgba(0, 0, 0, 0.3), transparent);
        border-radius: 0 0 30rpx 30rpx;
        pointer-events: none;
    }
}

.service-detail {
    background: linear-gradient(145deg, #ffffff, #f8f9fa);
    border-radius: 30rpx;
    padding: 40rpx;
    box-shadow: 0 20rpx 40rpx rgba(0, 0, 0, 0.08);
    position: relative;
    overflow: hidden;
    border: 1rpx solid rgba(2, 171, 171, 0.1);

    &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 8rpx;
        background: linear-gradient(90deg, #02ABAB, #05d5d5);
    }

    .service-name {
        font-size: 40rpx;
        font-weight: bold;
        margin-bottom: 30rpx;
        background: linear-gradient(90deg, #333, #666);
        -webkit-background-clip: text;
        color: transparent;
        position: relative;
        padding-bottom: 20rpx;

        &::after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 0;
            width: 80rpx;
            height: 4rpx;
            background: linear-gradient(90deg, #02ABAB, #05d5d5);
            border-radius: 4rpx;
        }
    }

    .service-price {
        margin: 40rpx 0;
        background: rgba(2, 171, 171, 0.08);
        padding: 20rpx 30rpx;
        border-radius: 20rpx;
        display: inline-block;

        .price-symbol {
            color: #02ABAB;
            font-size: 34rpx;
            font-weight: 500;
        }

        .price-value {
            color: #02ABAB;
            font-size: 56rpx;
            font-weight: bold;
            text-shadow: 0 2rpx 4rpx rgba(2, 171, 171, 0.2);
        }
    }

    .service-desc {
        color: #666;
        font-size: 30rpx;
        line-height: 1.8;
        margin-bottom: 40rpx;
        padding: 30rpx 30rpx 30rpx 50rpx;
        background: #f8f9fa;
        border-radius: 20rpx;
        position: relative;

        &::before {
            content: '"';
            position: absolute;
            top: 10rpx;
            left: 20rpx;
            font-size: 60rpx;
            color: rgba(2, 171, 171, 0.2);
        }
    }

    .service-features {
        margin: 40rpx 0;

        .feature-item {
            display: flex;
            align-items: center;
            margin-bottom: 24rpx;
            padding: 16rpx 24rpx;
            background: rgba(2, 171, 171, 0.05);
            border-radius: 16rpx;
            transform: translateX(0);
            transition: all 0.3s ease;

            &:hover {
                transform: translateX(10rpx);
                background: rgba(2, 171, 171, 0.08);
            }

            text {
                margin-left: 16rpx;
                font-size: 28rpx;
                color: #444;
                font-weight: 500;
            }
        }
    }

    .buy-btn {
        width: 100%;
        height: 88rpx;
        line-height: 88rpx;
        text-align: center;
        background: linear-gradient(135deg, #02ABAB, #029595);
        color: #fff;
        font-size: 32rpx;
        font-weight: 500;
        border-radius: 44rpx;
        margin-top: 40rpx;
        box-shadow: 0 8rpx 16rpx rgba(2, 171, 171, 0.2);
        position: relative;
        overflow: hidden;
        transition: all 0.3s ease;

        &::after {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
            transition: all 0.6s ease;
        }

        &:active {
            transform: translateY(4rpx);
            box-shadow: 0 4rpx 8rpx rgba(2, 171, 171, 0.15);
        }

        &:hover::after {
            left: 100%;
        }
    }
}

// 弹窗样式优化
.modal-content {
    width: 650rpx;
    background: linear-gradient(145deg, #ffffff, #f8f9fa);
    border-radius: 30rpx;
    padding: 40rpx;
    box-shadow: 0 20rpx 40rpx rgba(0, 0, 0, 0.15);

    .modal-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 40rpx;
        padding-bottom: 20rpx;
        border-bottom: 2rpx solid rgba(2, 171, 171, 0.1);

        .modal-title {
            font-size: 34rpx;
            font-weight: bold;
            color: #333;
            position: relative;
            padding-left: 20rpx;

            &::before {
                content: '';
                position: absolute;
                left: 0;
                top: 50%;
                transform: translateY(-50%);
                width: 6rpx;
                height: 28rpx;
                background: linear-gradient(to bottom, #02ABAB, #029595);
                border-radius: 3rpx;
            }
        }

        .modal-close {
            font-size: 40rpx;
            color: #666;
            padding: 10rpx;
            border-radius: 50%;
            transition: all 0.3s ease;

            &:active {
                background: rgba(0, 0, 0, 0.05);
            }
        }
    }

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
            background: linear-gradient(145deg, #f0f0f0, #ffffff);
            font-size: 36rpx;
            color: #02ABAB;
            border-radius: 16rpx;
            box-shadow: 4rpx 4rpx 8rpx rgba(0, 0, 0, 0.1),
                -4rpx -4rpx 8rpx rgba(255, 255, 255, 0.9);
            transition: all 0.3s ease;

            &:active {
                box-shadow: inset 2rpx 2rpx 4rpx rgba(0, 0, 0, 0.1),
                    inset -2rpx -2rpx 4rpx rgba(255, 255, 255, 0.9);
            }
        }

        .quantity-input {
            width: 140rpx;
            height: 70rpx;
            text-align: center;
            margin: 0 30rpx;
            border: 2rpx solid rgba(2, 171, 171, 0.2);
            border-radius: 16rpx;
            font-size: 32rpx;
            color: #333;
            background: #fff;
            transition: all 0.3s ease;

            &:focus {
                border-color: #02ABAB;
                box-shadow: 0 0 0 3rpx rgba(2, 171, 171, 0.1);
            }
        }
    }

    .total-price {
        text-align: center;
        margin: 30rpx 0;
        padding: 20rpx;
        background: rgba(2, 171, 171, 0.05);
        border-radius: 20rpx;

        .price-symbol,
        .price-value {
            color: #02ABAB;
            font-size: 40rpx;
            font-weight: bold;
            text-shadow: 0 2rpx 4rpx rgba(2, 171, 171, 0.2);
        }
    }

    .modal-footer {
        display: flex;
        justify-content: space-between;
        margin-top: 40rpx;
        padding-top: 30rpx;
        border-top: 2rpx solid rgba(2, 171, 171, 0.1);

        button {
            width: 260rpx;
            height: 88rpx;
            line-height: 88rpx;
            text-align: center;
            border-radius: 44rpx;
            font-size: 32rpx;
            font-weight: 500;
            transition: all 0.3s ease;

            &:active {
                transform: translateY(4rpx);
            }
        }

        .cancel-btn {
            background: linear-gradient(145deg, #f0f0f0, #ffffff);
            color: #666;
            box-shadow: 4rpx 4rpx 8rpx rgba(0, 0, 0, 0.1);

            &:active {
                box-shadow: 2rpx 2rpx 4rpx rgba(0, 0, 0, 0.1);
            }
        }

        .confirm-btn {
            background: linear-gradient(135deg, #02ABAB, #029595);
            color: #fff;
            box-shadow: 0 8rpx 16rpx rgba(2, 171, 171, 0.2);

            &:active {
                box-shadow: 0 4rpx 8rpx rgba(2, 171, 171, 0.15);
            }
        }
    }
}
</style>