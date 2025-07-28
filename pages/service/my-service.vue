<template>
    <view class="container">
        <u-loading-page :loading="true" v-if="load" fontSize="28rpx" />
        <view class="service-list" v-else-if="lists.length > 0">
            <view class="service-item" v-for="(item, index) in lists" :key="index">
                <view class="service-item-header">
                    <view class="service-item-title">
                        <text class="name">{{ item.name }}</text>
                        <view class="service-item-label" :class="{ pending: !item.coop_talent_id }">
                            {{ item.coop_talent_id ? "合作中" : "待合作" }}
                        </view>
                    </view>
                    <view class="service-item-amount">x{{ item.amount || 1 }}</view>
                </view>
                <view class="service-images" v-if="item.images && item.images.length > 0">
                    <swiper class="swiper" circular autoplay interval="3000" duration="500" @change="swiperChange">
                        <swiper-item v-for="(image, index) in item.images" :key="index" class="swiper-item">
                            <image :src="image" mode="aspectFill" @click="previewImage(index, item.images || [])" />
                        </swiper-item>
                    </swiper>
                    <view class="swiper-dots">
                        <view v-for="(i, index) in item.images" :key="index"
                            :class="['dot', currentSwiperIndex === index ? 'active' : '']"></view>
                    </view>
                </view>
                <view class="service-item-price">
                    <text class="price-symbol">¥</text>
                    <text class="price-value">{{ item.price * item.amount }}</text>
                </view>
                <view v-if="item.description" class="service-item-desc">{{ item.description }}</view>
                <view v-if="item.features && item.features.length > 0" class="service-item-features">
                    <view class="feature-item" v-for="(feature, fIndex) in item.features" :key="fIndex">
                        <u-icon name="checkmark-circle" color="#02ABAB" size="28"></u-icon>
                        <text>{{ feature }}</text>
                    </view>
                </view>

                <!-- 添加人才列表部分 -->
                <view v-if="item.talents && item.talents.length !== 0" class="talent-list">
                    <view class="top">
                        {{ item.coop_talent_id ? "合作人才" : "已分配人才" }}：
                        <span v-if="!item.coop_talent_id" class="count">{{ item.talents.length }}</span>
                    </view>
                    <view v-for="(talent, tIndex) in item.talents" :key="tIndex" class="list-item">
                        <view class="header" @click="changeTalentMode(index, tIndex)">
                            <view>
                                <text class="masked">{{ talent.name || "【未填写姓名】" }}</text>
                            </view>
                            <text class="arrow">{{ talent.mode ? "∧" : "∨" }}</text>
                        </view>

                        <view v-if="talent.mode" class="details">
                            <view class="detail-item">
                                <text class="detail-label">手机号：</text>
                                <text class="detail-value">{{ talent.phone || "未设置" }}</text>
                            </view>
                            <view class="detail-item">
                                <text class="detail-label">评分：</text>
                                <text class="detail-value">{{ talent.star || "暂无评分" }}</text>
                            </view>
                            <button v-if="item.coop_talent_id" class="cooperate-btn"
                                @click.stop="toChat(talent.id, talent.name, talent.phone)">立即沟通</button>
                            <button v-if="!item.coop_talent_id" class="cooperate-btn" :disabled="!talent.is_online"
                                @click.stop="gotoTalentDatail(talent.id, item.coop_talent_id ? true : false)">
                                查看简历
                            </button>
                            <button v-if="!item.coop_talent_id" class="cooperate-btn" :disabled="!talent.is_online"
                                @click.stop="cooperate(talent.id, item.id, talent.name || talent.phone, item.service_buyer_id, talent.is_online, item.name)">
                                合作
                            </button>
                            <button v-else class="cooperate-btn" style="background-color: #1ac51a"
                                @click.stop="finishCooperate(talent.id, item.id, item.service_buyer_id)">
                                完成合作
                            </button>
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

        <!-- 添加评分弹窗 -->
        <u-popup :show="showEvaluateModal" @close="showEvaluateModal = false" mode="center"
            :customStyle="customAlertStyle" bgColor="transparent" :overlayOpacity="0.4">
            <view class="cooperate-popup">
                <view class="cooperate-title">
                    <text>合作评价</text>
                </view>
                <view class="cooperate-content">
                    <text>合作完成后，您可在一个月内对服务进行评价。如满一个月未评价，则默认五星好评</text>
                </view>
                <view style="display: flex;">
                    <text style="margin-top: 8rpx;">服务配合：</text>
                    <view v-for="i in evaluateIndex1" :key="i" style="margin-bottom: 15rpx;">
                        <image @click="select_star(i, 'evaluateIndex1')" src="@/static/message/starred.png"
                            mode="widthFix" style="width: 50rpx;" />
                    </view>
                    <view v-for="i in (5 - evaluateIndex1)" :key="i" style="margin-bottom: 15rpx;">
                        <image @click="select_star(evaluateIndex1 + i, 'evaluateIndex1')"
                            src="@/static/message/unstarred.png" mode="widthFix" style="width: 50rpx;" />
                    </view>
                </view>
                <view style="display: flex; margin-top: 20rpx;">
                    <text style="margin-top: 8rpx;">专业能力：</text>
                    <view v-for="i in evaluateIndex2" :key="i" style="margin-bottom: 15rpx;">
                        <image @click="select_star(i, 'evaluateIndex2')" src="@/static/message/starred.png"
                            mode="widthFix" style="width: 50rpx;" />
                    </view>
                    <view v-for="i in (5 - evaluateIndex2)" :key="i" style="margin-bottom: 15rpx;">
                        <image @click="select_star(evaluateIndex2 + i, 'evaluateIndex2')"
                            src="@/static/message/unstarred.png" mode="widthFix" style="width: 50rpx;" />
                    </view>
                </view>
                <view class="cooperate-bot" style="margin-top: 30rpx; margin-left: 160rpx;">
                    <button class="confirm-btn" @click="submit_evaluate()">确认</button>
                </view>
            </view>
        </u-popup>
    </view>
</template>

<script>
import { fetch_data } from "../../utils/ajax_request.js";
import { show_stars } from "../../utils/utils.js";
var _this;
export default {
    data() {
        return {
            lists: [],
            load: true,
            hasMore: false,
            noMore: "",
            currentSwiperIndex: 0,
            // 添加评分弹窗相关数据
            showEvaluateModal: false,
            evaluateIndex1: 0,
            evaluateIndex2: 0,
            currentTalentId: null,
            currentServiceId: null,
            currentServiceBuyerId: null,
            customAlertStyle: {
                borderRadius: '16rpx'
            }
        };
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
            fetch_data(
                "POST",
                "get_service_I_bought",
                {
                    my_id: uni.getStorageSync("user_id")
                },
                "service",
                (res) => {
                    if (res.data.status == 200) {
                        let services = res.data.services;

                        if (services.length !== 0) {
                            services = services.map((service) => {
                                if (service.talents) {
                                    service.talents = service.talents.map((talent) => ({
                                        ...talent,
                                        star: show_stars(talent.star_as_elite)[0] || null,
                                        mode: false
                                    }));
                                }
                                return service;
                            });
                            _this.lists = services;
                        }
                        if (_this.load) {
                            _this.load = false;
                        }
                    } else {
                        uni.showToast({
                            title: "数据获取失败",
                            icon: "none",
                            duration: 800
                        });
                    }
                }
            );
        },
        gotoTalentDatail(talent_id, showContact) {
            fetch_data(
                "POST",
                "get_his_resume_id",
                {
                    talent_id: talent_id
                },
                "service",
                (res) => {
                    if (res.data.status !== 200) {
                        uni.showToast({
                            title: "该人才暂无简历",
                            icon: "none",
                            duration: 800
                        });
                        return;
                    }
                    const resume_id = res.data.resume_id;
                    _this.toNext(`/pages/talents/detail?id=${resume_id}&showContact=${showContact}`);
                }
            );
        },
        goToBuy() {
            uni.navigateTo({
                url: "/pages/service/index"
            });
        },

        async toChat(talent_id, talent_name, talent_phone) {
            if (_this.user_id == 0) {
                uni.navigateTo({
                    url: "/pages/index/login"
                });
                return;
            }
            if (_this.user_id == talent_id) {
                this.$u.toast("无法与自己沟通");
                return;
            }
            if (_this.identity !== 2) {
                this.$u.toast("当前身份不合法");
                return;
            }
            _this.toNext(`/pages/message/private_chat?id=user_${talent_id}&title=${talent_name || talent_phone}`);
        },

        cooperate(talentId, serviceId, talentName, service_buyer_id, is_online = 1, serviceName) {
            if (_this.user_id == talentId) {
                this.$u.toast("无法与自己合作");
                return;
            }
            if (!is_online) {
                uni.showToast({
                    title: "该人才暂不可接服务套餐",
                    icon: "none",
                    duration: 1000
                });
                return;
            }
            // 显示确认弹窗
            uni.showModal({
                title: "确认合作",
                content: "确认合作后不可取消，确认与" + talentName + "合作？",
                success: (res) => {
                    if (res.confirm) {
                        // 调用确认合作接口
                        fetch_data(
                            "POST",
                            "confirm_cooperate",
                            {
                                talent_id: talentId,
                                service_id: serviceId,
                                service_buyer_id: service_buyer_id
                            },
                            "service",
                            (res) => {
                                if (res.data.status === 200) {
                                    uni.showToast({
                                        title: "合作成功",
                                        icon: "success",
                                        duration: 2000
                                    });

                                    // 发送微信通知给人才
                                    const notificationData = {
                                        my_id: this.user_id,
                                        receiver_id: talentId,
                                        service_name: serviceName
                                    };

                                    fetch_data("POST", "send_notification", notificationData, "service", (notifyRes) => {
                                        if (notifyRes.data.status === 200) {
                                            console.log("微信通知发送成功");
                                        } else {
                                            console.log("微信通知发送失败", notifyRes);
                                        }
                                    });

                                    // 刷新列表
                                    this.getMyPurchaseList();
                                } else {
                                    uni.showToast({
                                        title: res.data.message || "操作失败",
                                        icon: "none",
                                        duration: 2000
                                    });
                                }
                            }
                        );
                    }
                }
            });
        },

        // finishCooperate(talentId, serviceId, service_buyer_id) {
        //     uni.showModal({
        //         title: "确认完成",
        //         content: "确认完成此次合作？",
        //         success: (res) => {
        //             if (res.confirm) {
        //                 fetch_data(
        //                     "POST",
        //                     "finish_cooperate",
        //                     {
        //                         talent_id: talentId,
        //                         service_id: serviceId,
        //                         service_buyer_id: service_buyer_id
        //                     },
        //                     "service",
        //                     (res) => {
        //                         if (res.data.status === 200) {
        //                             uni.showToast({
        //                                 title: "完成合作成功",
        //                                 icon: "success",
        //                                 duration: 2000
        //                             });
        //                             // 刷新列表
        //                             this.getMyPurchaseList();
        //                         } else {
        //                             uni.showToast({
        //                                 title: res.data.message || "操作失败",
        //                                 icon: "none",
        //                                 duration: 2000
        //                             });
        //                         }
        //                     }
        //                 );
        //             }
        //         }
        //     });
        // },

        // 添加轮播图切换事件处理

        finishCooperate(talentId, serviceId, service_buyer_id) {
            // 保存当前合作信息
            this.currentTalentId = talentId;
            this.currentServiceId = serviceId;
            this.currentServiceBuyerId = service_buyer_id;
            // 重置评分
            this.evaluateIndex1 = 0;
            this.evaluateIndex2 = 0;
            // 显示评分弹窗
            this.showEvaluateModal = true;
        },

        // 添加评分选择方法
        select_star(i, whichone) {
            if (whichone === "evaluateIndex1") {
                this.evaluateIndex1 = i + 1;
            } else {
                this.evaluateIndex2 = i + 1;
            }
        },

        submit_evaluate() {
            if (this.evaluateIndex1 === 0 || this.evaluateIndex2 === 0) {
                uni.showToast({
                    title: "请完成评分",
                    icon: "none",
                    duration: 1000
                });
                return;
            }

            fetch_data(
                "POST",
                "finish_cooperate",
                {
                    talent_id: this.currentTalentId,
                    service_id: this.currentServiceId,
                    service_buyer_id: this.currentServiceBuyerId,
                    evaluate_score1: this.evaluateIndex1,
                    evaluate_score2: this.evaluateIndex2
                },
                "service",
                (res) => {
                    if (res.data.status === 200) {
                        uni.showToast({
                            title: "合作已完成",
                            icon: "success",
                            duration: 2000
                        });
                        // 刷新列表
                        this.getMyPurchaseList();
                    } else {
                        uni.showToast({
                            title: res.data.message || "操作失败",
                            icon: "none",
                            duration: 2000
                        });
                    }
                    this.showEvaluateModal = false;
                }
            );
        },

        swiperChange(e) {
            this.currentSwiperIndex = e.detail.current;
        },
        // 添加图片预览功能
        previewImage(index, imgs_list) {
            if (!imgs_list || !Array.isArray(imgs_list)) {
                uni.showToast({
                    title: "图片数据异常",
                    icon: "none"
                });
                return;
            }
            uni.previewImage({
                current: imgs_list[index], // 修改这里，直接使用图片URL
                urls: imgs_list
            });
        }
    }
};
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
            margin-bottom: 20rpx; // 从30rpx减少到20rpx

            .service-item-amount {
                font-size: 32rpx;
                color: #02abab;
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
            margin: 24rpx 0; // 从36rpx减少到24rpx
            display: flex;
            align-items: baseline;

            .price-symbol {
                font-size: 34rpx;
                color: #02abab;
                margin-right: 4rpx;
            }

            .price-value {
                font-size: 52rpx;
                font-weight: 700;
                color: #02abab;
                letter-spacing: -1rpx;
            }
        }

        &-desc {
            font-size: 28rpx;
            color: #666666;
            /* 更改描述文字颜色 */
            line-height: 1.6;
            margin-bottom: 24rpx; // 从36rpx减少到24rpx
        }

        &-features {
            margin-bottom: 30rpx; // 从40rpx减少到30rpx

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
            content: "";
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
}

.service-item-title {
    display: inline-flex;
    flex-wrap: wrap;
    align-items: flex-end;
    font-size: 28rpx;
    gap: 12rpx;

    .name {
        word-break: break-all;
    }

    .service-item-label {
        background: rgba(255, 153, 0, 0.1);
        color: #b88230;
        font-size: 28rpx;
        display: inline-flex;
        align-items: center;
        padding: 8rpx 20rpx;
        border-radius: 4rpx;
        font-size: 24rpx;
        white-space: nowrap;
        border-radius: 30rpx;
        min-width: 60rpx;
        text-align: center;

        &.pending {
            color: #b88230;
            background: rgba(255, 153, 0, 0.1);
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
    color: #02abab;
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
    color: #02abab;
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
                background: #02abab;
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
                background: linear-gradient(90deg, #02abab, #05c5c5);
                background-clip: text;
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
                background: linear-gradient(45deg, #02abab, #05c5c5);
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
                    content: "";
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

.details {
    padding: 20rpx 0;

    .detail-row {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 10rpx 0;
    }

    .detail-item {
        display: flex;
        align-items: center;

        .detail-label {
            color: #666;
            font-size: 28rpx;
            margin-right: 10rpx;
        }

        .detail-value {
            color: #333;
            font-size: 28rpx;
        }
    }

    .cooperate-btn {
        margin-top: 15rpx;
        padding: 0 30rpx;
        height: 56rpx;
        line-height: 56rpx;
        font-size: 28rpx;
        color: #fff;
        background-color: #02abab;
        border-radius: 28rpx;
        border: none;

        &:active {
            opacity: 0.8;
        }
    }
}

.cooperate-popup {
    background: #fff;
    padding: 60rpx 60rpx;
    border-radius: 16rpx;
    width: 70%;
    margin: 0 auto;

    .cooperate-title {
        color: #000;
        font-size: 42rpx;
        text-align: center;
        margin-bottom: 20rpx;
    }

    .cooperate-content {
        color: #adadad;
        font-size: 24rpx;
        text-align: justify;
        width: 80%;
        margin: 0 auto;
        margin-bottom: 40rpx;
    }

    .cooperate-bot {
        display: flex;
        justify-content: space-between;

        .confirm-btn {
            line-height: 60rpx;
            font-size: 26rpx;
            border-radius: 10rpx;
            color: #fff;
            padding: 0 20rpx;
            background: #02AAAB;
        }
    }
}
</style>
