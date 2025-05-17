<template>
    <view class="container">
        <u-loading-page :loading="true" v-if="load" fontSize="28rpx" />
        <view class="service-list" v-else-if="lists.length > 0">
            <view class="service-item" v-for="(item, index) in lists" :key="index">
                <view class="service-item-header">
                    <view class="service-item-title">{{ item.name }}</view>
                    <view class="service-item-amount">x{{ item.amount || 1 }}</view>
                </view>
                <view class="service-item-price">
                    <text class="price-symbol">¥</text>
                    <text class="price-value">{{ item.price * item.amount }}</text>
                </view>
                <view class="service-item-desc">{{ item.description }}</view>
                <view class="service-item-features">
                    <view class="feature-item" v-for="(feature, fIndex) in item.features" :key="fIndex">
                        <u-icon name="checkmark-circle" color="#02ABAB" size="28"></u-icon>
                        <text>{{ feature }}</text>
                    </view>
                </view>

                <!-- 添加人才列表部分 -->
                <view v-if="item.talents && item.talents.length !== 0" class="talent-list">
                    <view class="top">
                        已分配人才：<span class="count">{{ item.talents.length }}</span>
                    </view>
                    <view v-for="(talent, tIndex) in item.talents" :key="tIndex" class="list-item">
                        <view class="header" @click="changeTalentMode(index, tIndex)">
                            <view>
                                <text class="masked">{{ talent.name || '【未填写姓名】' }}</text>
                            </view>
                            <text class="arrow">{{ talent.mode ? '∧' : '∨' }}</text>
                        </view>

                        <view v-if="talent.mode" class="details" @click="gotoTalentDatail(talent.id)">
                            <view class="detail-item">
                                <text class="detail-label">手机号：</text>
                                <text class="detail-value">{{ talent.phone || '未设置' }}</text>
                            </view>
                            <view class="detail-item">
                                <text class="detail-label">评分：</text>
                                <text class="detail-value">{{ talent.star || '暂无评分' }}</text>
                            </view>
                        </view>
                    </view>
                </view>
                <view v-else class="empty-talent">
                    <text>暂无分配人才</text>
                </view>
            </view>
            <u-loadmore class="load-more" :status="hasMore ? 'loading' : 'nomore'" :nomoreText="noMore" />
        </view>
        <view class="empty-container" v-else>
            <view class="empty-content">
                <view class="empty-tips">
                    <text class="main-tip">还没有购买任何服务包哦～</text>
                    <text class="sub-tip">快去挑选心仪的服务包吧</text>
                </view>
                <view class="empty-button">
                    <button class="go-buy-btn" @click="goToBuy">去看看</button>
                </view>
            </view>
        </view>
    </view>
</template>

<script>
import { fetch_data } from '../../utils/ajax_request.js'
import { show_stars } from '../../utils/utils.js';
var _this;
export default {
    data() {
        return {
            lists: [],
            load: true,
            hasMore: false,
            noMore: ''
        }
    },
    onLoad() {
        _this = this;
        _this.getMyPurchaseList();
    },
    methods: {
        changeTalentMode(serviceIndex, talentIndex) {
            this.lists[serviceIndex].talents[talentIndex].mode = !this.lists[serviceIndex].talents[talentIndex].mode;
        },

        getMyPurchaseList() {
            // 获取我购买的服务包数据
            fetch_data("POST", 'get_service_I_bought', {
                my_id: uni.getStorageSync('user_id')
            }, "service", res => {
                if (res.data.status == 200) {
                    let services = res.data.services;

                    if (services.length !== 0) {
                        services = services.map(service => {
                            if (service.talents) {
                                service.talents = service.talents.map(talent => ({
                                    ...talent,
                                    star: show_stars(talent.star_as_elite)[0] || null,
                                    mode: false
                                }));
                            }
                            return service;
                        });
                        _this.lists.push(...services)
                    }
                    if (_this.load) {
                        _this.load = false;
                    }
                } else {
                    uni.showToast({
                        title: '数据获取失败',
                        icon: 'none',
                        duration: 800
                    })
                }
            });
        },
        gotoTalentDatail(talent_id) {
            fetch_data("POST", 'get_his_resume_id', {
                talent_id: talent_id
            }, "service", res => {
                if (res.data.status !== 200) {
                    return;
                }
                const resume_id = res.data.resume_id;
                _this.toNext(`/pages/talents/detail?id=${resume_id}&showContact=false`)
            });
        },
        goToBuy() {
            uni.navigateTo({
                url: '/pages/service/index'
            });
        }
    }
}
</script>

<style lang="scss" scoped>
.container {
    padding: 30rpx;
    min-height: 100vh;

    .service-list {
        display: grid;
        grid-template-columns: repeat(1, 1fr);
        gap: 40rpx;
    }

    .service-item {
        background-color: #ffffff;
        /* 改为纯白色背景 */
        border-radius: 24rpx;
        padding: 40rpx;
        box-shadow: 0 8rpx 24rpx rgba(2, 171, 171, 0.08);
        /* 调整阴影颜色为主题色 */
        transition: transform 0.3s ease;
        position: relative;
        overflow: hidden;
        border: 1px solid rgba(2, 171, 171, 0.15);
        /* 加深边框颜色 */

        &:hover {
            transform: translateY(-4rpx);
            box-shadow: 0 12rpx 30rpx rgba(2, 171, 171, 0.12);
        }

        &-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 20rpx;  // 从30rpx减少到20rpx

            .service-item-amount {
                font-size: 32rpx;
                color: #02ABAB;
                font-weight: 600;
                background: rgba(2, 171, 171, 0.1);
                padding: 8rpx 20rpx;
                border-radius: 30rpx;
                min-width: 60rpx;
                text-align: center;
            }
        }

        &-title {
            font-size: 38rpx;
            font-weight: 600;
            color: #1a1a1a;
            /* 更深的标题颜色 */
            letter-spacing: 0.5rpx;
        }

        &-price {
            margin: 24rpx 0;  // 从36rpx减少到24rpx
            display: flex;
            align-items: baseline;

            .price-symbol {
                font-size: 34rpx;
                color: #02ABAB;
                margin-right: 4rpx;
            }

            .price-value {
                font-size: 52rpx;
                font-weight: 700;
                color: #02ABAB;
                letter-spacing: -1rpx;
            }
        }

        &-desc {
            font-size: 28rpx;
            color: #666666;
            /* 更改描述文字颜色 */
            line-height: 1.6;
            margin-bottom: 24rpx;  // 从36rpx减少到24rpx
        }

        &-features {
            margin-bottom: 30rpx;  // 从40rpx减少到30rpx

            .feature-item {
                display: flex;
                align-items: center;
                margin-bottom: 20rpx;
                padding: 12rpx 20rpx;
                background-color: rgba(2, 171, 171, 0.05);
                /* 特性背景改为主题色淡色 */
                border-radius: 12rpx;
                transition: all 0.3s ease;

                text {
                    font-size: 26rpx;
                    color: #333333;
                    /* 更改文字颜色 */
                    margin-left: 16rpx;
                }
            }
        }
    }
}

/* 人才列表样式调整 */
.talent-list {
    margin-top: 30rpx;
    padding-top: 20rpx;
    border-top: 2rpx solid rgba(2, 171, 171, 0.1);
    /* 改用主题色边框 */
}

.top {
    color: #333;
    border-bottom: 2rpx solid rgba(2, 171, 171, 0.2);
    /* 使用主题色边框 */
    padding-bottom: 10rpx;
    margin-bottom: 20rpx;
}

.count {
    color: #02ABAB;
    /* 改用主题色 */
}

.list-item {
    background-color: rgba(2, 171, 171, 0.02);
    /* 淡化背景色 */
    border-radius: 20rpx;
    margin-bottom: 20rpx;
    padding: 20rpx;
    box-shadow: 0 4rpx 6rpx rgba(2, 171, 171, 0.06);
    border: 1px solid rgba(2, 171, 171, 0.1);
}

.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #333;
    margin-left: 20rpx;
}

.masked {
    color: #333333;
}

.arrow {
    color: #02ABAB;
    /* 改用主题色 */
    cursor: pointer;
    margin-right: 13rpx;
}

.details {
    margin-top: 20rpx;
    padding-top: 10rpx;
    border-top: 1rpx dashed rgba(2, 171, 171, 0.1);
    /* 使用主题色虚线 */
}

.detail-item {
    display: flex;
    padding: 10rpx 0;
    margin-left: 20rpx;
    margin-right: 20rpx;
}

.detail-label {
    color: #888888;
    /* 调整标签颜色 */
}

.detail-value {
    color: #333333;
}

.empty-talent {
    text-align: center;
    padding: 30rpx 0;
    color: #888888;
    /* 调整空状态文字颜色 */
    font-size: 28rpx;
}

.empty-container {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 80vh;

    .empty-content {
        text-align: center;

        .empty-tips {
            display: flex;
            flex-direction: column;
            align-items: center;
            margin-bottom: 40rpx;

            .main-tip {
                font-size: 32rpx;
                color: #333;
                margin-bottom: 16rpx;
            }

            .sub-tip {
                font-size: 28rpx;
                color: #999;
            }
        }

        .empty-button {
            .go-buy-btn {
                background: #02ABAB;
                color: #fff;
                border-radius: 44rpx;
                padding: 20rpx 60rpx;
                font-size: 30rpx;
                border: none;
            }
        }
    }
}

.empty-container {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 70vh;
    border-radius: 24rpx;

    .empty-content {
        text-align: center;
        padding: 60rpx 40rpx;
        transform: translateY(-40rpx);
        animation: float 3s ease-in-out infinite;

        .empty-tips {
            display: flex;
            flex-direction: column;
            align-items: center;
            margin-bottom: 50rpx;

            .main-tip {
                font-size: 36rpx;
                color: #333;
                margin-bottom: 20rpx;
                font-weight: 600;
                background: linear-gradient(90deg, #02ABAB, #05C5C5);
                -webkit-background-clip: text;
                color: transparent;
            }

            .sub-tip {
                font-size: 28rpx;
                color: #666;
                letter-spacing: 2rpx;
            }
        }

        .empty-button {
            .go-buy-btn {
                background: linear-gradient(45deg, #02ABAB, #05C5C5);
                color: #fff;
                border-radius: 44rpx;
                padding: 24rpx 80rpx;
                font-size: 32rpx;
                border: none;
                box-shadow: 0 8rpx 20rpx rgba(2, 171, 171, 0.2);
                transition: all 0.3s ease;
                position: relative;
                overflow: hidden;

                &::after {
                    content: '';
                    position: absolute;
                    top: -50%;
                    left: -50%;
                    width: 200%;
                    height: 200%;
                    background: rgba(255, 255, 255, 0.1);
                    transform: rotate(45deg);
                    transition: all 0.3s ease;
                }

                &:active {
                    transform: translateY(4rpx);
                    box-shadow: 0 4rpx 10rpx rgba(2, 171, 171, 0.2);
                }
            }
        }
    }
}

@keyframes float {

    0%,
    100% {
        transform: translateY(-40rpx);
    }

    50% {
        transform: translateY(-50rpx);
    }
}
</style>