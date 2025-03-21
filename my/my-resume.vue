<template>
    <view class="container">
        <u-loading-page :loading="true" v-if="load" fontSize="28rpx" />
        <block v-else>
            <view class="form-tip">
                <text style="margin-left: 15px; font-size: 25rpx">简历越完善，找活越方便！</text>
            </view>
            <view class="form-info">
                <view class="form-row">
                    <view class="row-left">
                        <text class="red-text">*</text>
                        <text>性别</text>
                    </view>
                    <view class="row-tag">
                        <view class="tag-item" :class="{ act: form.sex == 1 }" @click="changeIndex('sex', 1)">男</view>
                        <view class="tag-item" :class="{ act: form.sex == 2 }" @click="changeIndex('sex', 2)">女</view>
                    </view>
                </view>
                <view class="form-row" @click="showDate = true">
                    <view class="row-left">
                        <text class="red-text">*</text>
                        <text>出生年月</text>
                    </view>
                    <view class="row-input">
                        <text :class="{ 'text-c3': form.birthday == '' }">{{ form.birthday ? form.birthday : "请选择出生年月" }}</text>
                    </view>
                    <view class="row-right">
                        <u-icon name="arrow-right" size="16" color="#7D7D7D" />
                    </view>
                </view>
                <view class="form-row">
                    <view class="row-left">
                        <text class="red-text">*</text>
                        <text>擅长项目</text>
                    </view>
                    <view class="row-input" @click="goNext('tags', 1)">
                        <text :class="{ 'text-c3': other.tags == '' }">{{ other.tags ? other.tags : "请选择擅长项目" }}</text>
                    </view>
                    <view class="row-right" @click="goNext('tags', 1)">
                        <u-icon name="arrow-right" size="16" color="#7D7D7D" />
                    </view>
                </view>
                <view class="form-row">
                    <view class="row-left">
                        <text class="red-text">*</text>
                        <text>工作属性</text>
                    </view>
                    <view class="row-input" @click="goNext('property', 5)">
                        <text :class="{ 'text-c3': other.property == '' }">{{ other.property ? other.property : "请选择工作属性" }}</text>
                    </view>
                    <view class="row-right" @click="goNext('property', 5)">
                        <u-icon name="arrow-right" size="16" color="#7D7D7D" />
                    </view>
                </view>
                <view class="form-row">
                    <view class="row-left">
                        <text class="red-text">*</text>
                        <text>期望城市</text>
                    </view>
                    <view class="row-input" @click="goNext('citys', 4)">
                        <text :class="{ 'text-c3': other.citys == '' }">{{ other.citys ? other.citys : "请选择期望城市" }}</text>
                    </view>
                    <view class="row-right" @click="goNext('citys', 4)">
                        <u-icon name="arrow-right" size="16" color="#7D7D7D" />
                    </view>
                </view>
                <view class="form-row">
                    <view class="row-left">
                        <text class="red-text">*</text>
                        <text>期望薪资</text>
                    </view>
                    <view class="row-input">
                        <block v-if="form.salary_unit">
                            <u-input placeholder="请输入薪资" border="none" type="text" placeholderClass="placeholder28" v-model="form.salary" clearable />
                        </block>
                        <text @click="showUnit = true" :class="{ 'text-c3': form.salary_unit == '' }">{{ form.salary_unit ? form.salary_unit : "请先选择单位再输入薪资" }}</text>
                    </view>
                    <view class="row-right" @click="showUnit = true">
                        <u-icon name="arrow-right" size="16" color="#7D7D7D" />
                    </view>
                </view>
                <view class="form-row">
                    <view class="row-left">
                        <text class="red-text">*</text>
                        <text>应聘岗位</text>
                    </view>
                    <view class="row-input" @click="goNext('post', 2)">
                        <text :class="{ 'text-c3': other.post == '' }">{{ other.post ? other.post : "请选择应聘岗位" }}</text>
                    </view>
                    <view class="row-right" @click="goNext('post', 2)">
                        <u-icon name="arrow-right" size="16" color="#7D7D7D" />
                    </view>
                </view>
                <view class="form-row">
                    <view class="row-left">
                        <text class="red-text">*</text>
                        <text>擅长技能</text>
                    </view>
                    <view class="row-input" @click="goNext('talents', 3)">
                        <text :class="{ 'text-c3': other.talents == '' }">{{ other.talents ? other.talents : "请选择擅长技能" }}</text>
                    </view>
                    <view class="row-right" @click="goNext('talents', 3)">
                        <u-icon name="arrow-right" size="16" color="#7D7D7D" />
                    </view>
                </view>
                <view class="form-row column">
                    <view class="row-left" style="width: 100%">
                        <text>个人优势</text>
                        <text class="detail-tip">(请详细填写，提高简历评分)</text>
                    </view>
                    <view class="row-textarea">
                        <u-textarea :maxlength="300" height="80" border="none" v-model="form.strength" :customStyle="customStyle1" placeholder="请输入个人优势" />
                        <view class="textarea-count">已输入{{ form.strength.length }}/300</view>
                    </view>
                </view>
                <view class="form-row column">
                    <view class="row-left" style="width: 100%">
                        <text>项目经历</text>
                        <text class="detail-tip">(请详细填写，提高简历评分)</text>
                    </view>
                    <view class="row-textarea">
                        <u-textarea :maxlength="300" height="80" border="none" v-model="form.experience" :customStyle="customStyle1" placeholder="请输入项目经历" />
                        <view class="textarea-count">已输入{{ form.experience.length }}/300</view>
                    </view>
                </view>

                <view class="form-row column">
                    <view class="row-left" style="width: 100%">
                        <text>作品展示</text>
                        <text class="detail-tip">(展示你自己，最多可以上传9张)</text>
                    </view>
                    <div class="image-preview">
                        <div v-for="(image, index) in preview_images" :key="index">
                            <image :src="image" class="preview-image" mode="aspectFill" @click="image_operation(preview_images, image, 'upload')" />
                        </div>
                        <button v-if="preview_images.length === 0" @click="choose_image()" class="upload-button">+</button>
                        <button v-else @click="clear_image()" class="upload-button">×</button>
                    </div>
                </view>

                <view class="form-row column">
                    <view class="row-left">
                        <text>备注信息</text>
                    </view>
                    <view class="row-textarea">
                        <u-textarea :maxlength="300" height="80" border="none" v-model="form.remark" :customStyle="customStyle1" placeholder="请输入备注信息" />
                        <view class="textarea-count">已输入{{ form.remark.length }}/300</view>
                    </view>
                </view>
            </view>
            <view style="height: 120rpx"></view>
            <view class="submit-bot" style="z-index: 999">
                <button class="submit-bot-btn" :disabled="submitDisabled" @click="real_submit">发布</button>
            </view>
        </block>
        <u-datetime-picker
            :show="showDate"
            confirmColor="#02AAAB"
            cancelColor="#B8B8B8"
            title="出生年月"
            :minDate="minDate"
            :maxDate="maxDate"
            @confirm="confirmDate"
            @cancel="showDate = false"
            mode="year-month"
        />

        <u-picker :show="showUnit" :columns="columns" confirmColor="#02AAAB" cancelColor="#B8B8B8" @cancel="showUnit = false" @confirm="confirmUnit"></u-picker>
    </view>
</template>

<script>
import { fetch_data, upload_file } from "../utils/ajax_request.js";
import md5 from "@/components/MD5.js";
var validate = require("@/components/validate/validate.js");
var _this;
let d = new Date();
export default {
    data() {
        return {
            submitDisabled: false,
            customStyle1: {
                padding: "20rpx 28rpx 20rpx 28rpx",
                background: "transparent"
            },
            placeholderStyle: {
                color: "#C3C3C3"
            },
            showDate: false,
            showUnit: false,
            columns: [["元/天", "元/月"]],
            form: {
                step: 1,
                sex: 1,
                birthday: "",
                tags: "",
                type: 2, // 写死必须是简历
                property: "",
                citys: "",
                salary: "",
                salary_unit: "",
                talents: "",
                post: "",
                strength: "",
                experience: "",
                remark: ""
            },
            other: {
                tags: "",
                property: "",
                citys: "",
                talents: "",
                post: ""
            },
            minDate: Date.parse(`${d.getFullYear() - 70}/01/01`),
            maxDate: Date.parse(`${d.getFullYear()}/${d.getMonth() + 1}/01`),
            temp_field: "",
            // works: [],
            // exist_works: [],
            preview_images: [],
            new_images: [],
            item_id: "",
            image_modified: false,

            required_fields: [
                {
                    name: "birthday",
                    msg: "请选择出生年月"
                },
                {
                    name: "tags",
                    msg: "请选择擅长项目"
                },
                {
                    name: "property",
                    msg: "请选择工作属性"
                },
                {
                    name: "citys",
                    msg: "请选择期望城市"
                },
                {
                    name: "salary_unit",
                    msg: "请选择薪资单位"
                },
                {
                    name: "salary",
                    msg: "请输入期望薪资"
                },
                {
                    name: "post",
                    msg: "请输入应聘岗位"
                },
                {
                    name: "talents",
                    msg: "请输入擅长技能"
                }
            ]
        };
    },
    onLoad(e) {
        _this = this;
        uni.$on("selectCitys", (res) => {
            let { arr, brr } = res;
            _this.form.citys = arr.join(",");
        });
        uni.$on("chooseTag", (res) => {
            if (res.from == 2) {
                _this.other[_this.temp_field] = res.brr.join(",");
                _this.form[_this.temp_field] = res.arr.join(",");
            }
        });
        _this.tijiao();
        // 异步拿到item id和works
        setTimeout(() => {
            let data1 = {
                user_id: _this.user_id,
                salary: _this.form.salary
            };
            fetch_data("POST", "get_item_id", data1, "user", (res) => {
                this.item_id = res.data.item_id;
                fetch_data("POST", "get_item_files", { item_id: this.item_id }, "user", (res) => {
                    const item_files = res.data.item_files;
                    if (item_files && item_files?.length) {
                        for (let i = 1; i <= item_files.length; i++) {
                            _this.preview_images.push(item_files["file" + i]);
                            _this.new_images.push(item_files["file" + i]);
                        }
                    }
                });
            });
        }, 1500);
    },
    onUnload() {
        uni.$off("selectCitys");
        uni.$off("chooseTag");
    },
    computed: {
        minDate1: {
            cache: false,
            get() {
                return Date.parse(`${d.getFullYear() - 70}/01/01`);
            }
        }
    },
    methods: {
        confirmUnit(e) {
            let { value } = e;
            _this.form.salary_unit = value[0];
            _this.showUnit = false;
        },
        confirmDate(e) {
            let { value, mode } = e;
            const date = new Date(value);
            let y = date.getFullYear();
            let m = date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : `${date.getMonth() + 1}`;
            _this.form.birthday = `${y}-${m}`;
            _this.showDate = false;
        },
        changeIndex(field, index) {
            if (_this.form[field] != index) {
                _this.form[field] = index;
            }
        },
        goNext(field, type) {
            _this.temp_field = field;
            _this.toNext(`/pages/index/filter-list?max=3&from=2&type=${type}`);
        },
        submit() {
            uni.showToast({
                title: "发布中",
                icon: "loading",
                duration: 100000
            });
            _this.form.step = 2;
            _this.tijiao();
        },

        choose_image(sourceType = "album") {
            this.image_modified = true;
            uni.chooseImage({
                sizeType: ["original", "compressed"],
                sourceType: [sourceType],
                success: (res) => {
                    this.new_images = res.tempFilePaths;
                    this.preview_images = [...res.tempFilePaths];
                }
            });
        },

        clear_image() {
            this.image_modified = true;
            this.new_images = [];
            this.preview_images = [];
        },

        upload_images() {
            if (!this.new_images || this.new_images.length === 0) {
                return Promise.resolve([]); // 如果没有图片，直接返回空数组
            }
            // 一张一张传
            const uploadPromises = this.new_images.map((this_one) => {
                return new Promise((resolve, reject) => {
                    upload_file("upload_works_to_OSS", this_one, "this_one", "user", (res) => {
                        let response;
                        try {
                            response = JSON.parse(res.data);
                        } catch (error) {
                            console.error("JSON解析错误:", error);
                            wx.showToast({
                                title: "作品上传失败，请稍后重试",
                                icon: "none",
                                duration: 700
                            });
                            return reject("JSON解析错误");
                        }
                        if (res.statusCode === 200) {
                            resolve(response.url); // 上传成功返回 URL
                        } else {
                            wx.showToast({
                                title: "作品上传失败，请稍后重试",
                                icon: "none",
                                duration: 700
                            });
                            reject("上传失败");
                        }
                    });
                });
            });
            return Promise.all(uploadPromises); // 等待所有上传完成
        },

        image_operation(post_images, this_image, where = "display") {
            let image_urls;
            if (where === "display") {
                // 筛选出所有图片URL
                image_urls = Object.keys(post_images)
                    .filter((key) => key.startsWith("image") && key !== "image_length" && post_images[key]) // 筛选出以"image"开头且值不为空的键
                    .map((key) => post_images[key]);
            } else if (where === "upload") {
                image_urls = post_images;
            }
            wx.previewImage({
                urls: image_urls,
                current: this_image
            });
        },

        //提交
        async tijiao() {
            if (_this.form.step == 2) {
                var rule = [
                    {
                        name: "birthday",
                        rules: ["require"],
                        errorMsg: {
                            require: "请选择出生年月"
                        }
                    },
                    {
                        name: "tags",
                        rules: ["require"],
                        errorMsg: {
                            require: "请选择擅长项目"
                        }
                    },
                    {
                        name: "property",
                        rules: ["require"],
                        errorMsg: {
                            require: "请选择工作属性"
                        }
                    },
                    {
                        name: "citys",
                        rules: ["require"],
                        errorMsg: {
                            require: "请选择期望城市"
                        }
                    },
                    {
                        name: "salary_unit",
                        rules: ["require"],
                        errorMsg: {
                            require: "请选择薪资单位"
                        }
                    },
                    {
                        name: "salary",
                        rules: ["require"],
                        errorMsg: {
                            require: "请输入薪资"
                        }
                    },
                    {
                        name: "post",
                        rules: ["require"],
                        errorMsg: {
                            require: "请输入应聘岗位"
                        }
                    },
                    {
                        name: "talents",
                        rules: ["require"],
                        errorMsg: {
                            require: "请输入擅长技能"
                        }
                    }
                ];
                // let cityRule = {
                // 	name: 'citys',
                // 	rules: ['require'],
                // 	errorMsg: {
                // 		require: '请选择期望城市',
                // 	}
                // }
                // if (this.showCitys) {
                // 	rule.splice(2,0,cityRule)
                // }
                // 是否全部通过，返回Boolean
                let checked = validate.check(this.form, rule);
                if (!checked) {
                    // 获取错误信息
                    let err = validate.getError();
                    uni.$u.toast(err[0]);
                    return;
                }
                _this.submitDisabled = true;
                setTimeout(() => {
                    _this.submitDisabled = false;
                }, 2000);
            }
            const data = await _this.$post("port/edit_user_resume", _this.form);
            if (data.code == 200) {
                const work_urls = await _this.upload_images();
                if (work_urls) {
                    const data2 = {
                        item_id: _this.item_id,
                        item_type: _this.form.type,
                        files: work_urls
                    };
                    fetch_data("POST", "upload_works", data2, "user", (res) => {
                        if (res.data.status === 200) {
                            uni.$u.toast(data.msg, () => {
                                _this.finish();
                            });
                        } else {
                            uni.$u.toast("发布失败，请稍后再试");
                        }
                    });
                } else {
                    uni.$u.toast(data.msg, () => {
                        _this.finish();
                    });
                }
            } else if (data.code == -50) {
                uni.$u.toast(data.msg, () => {
                    _this.finish();
                });
            } else if (data.code == -1) {
                _this.form = {
                    ..._this.form,
                    ...data.result.form
                };
                _this.other = {
                    ..._this.other,
                    ...data.result.other
                };
                if (_this.load) {
                    _this.load = false;
                }
            } else {
                uni.$u.toast(data.msg);
            }
        },

        // 不用外包的接口，换Charlie的接口
        async real_submit() {
            for (const each of _this.required_fields) {
                if (!_this.form[each.name]) {
                    uni.$u.toast(each.msg);
                    return;
                }
            }
            _this.form.user_id = _this.user_id;

            fetch_data("POST", "edit_user_resume", _this.form, "user", async (res) => {
                if (res.data.status === 200) {
                    if (this.image_modified) {
                        const work_urls = await _this.upload_images();
                        if (work_urls) {
                            const data2 = {
                                item_id: _this.item_id,
                                item_type: _this.form.type,
                                files: work_urls
                            };
                            fetch_data("POST", "upload_works", data2, "user", (res) => {
                                if (res.data.status === 200) {
                                    uni.$u.toast("发布成功", () => {
                                        _this.finish();
                                        uni.reLaunch({
                                            url: "/pages/my/my"
                                        });
                                    });
                                } else {
                                    uni.$u.toast("发布失败，请稍后再试");
                                    return;
                                }
                            });
                        }
                    } else {
                        uni.$u.toast("发布成功", () => {
                            _this.finish();
                            uni.reLaunch({
                                url: "/pages/my/my"
                            });
                        });
                    }
                } else {
                    uni.$u.toast("发布失败，请稍后再试");
                    return;
                }
            });
        }
    }
};
</script>

<style lang="scss" scoped>
@import "static/css/form.scss";

.container {
    background: #fff;
    padding: 0 36rpx 0 36rpx;
}

.form-tip {
    position: relative;
    color: #41b6b4;
    background-color: #edfbff;
    width: 120vw;
    box-sizing: border-box;
    margin-left: -30rpx;
    padding: 0;
}

.upload-button {
    width: 60px;
    height: 60px;
    border: 2px dashed #ccc;
    border-radius: 4px;
    font-size: 32px;
    color: #999;
    background-color: #f9f9f9;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    margin-top: 20rpx;
    z-index: 999;
}

.image-preview {
    display: flex;
    flex-wrap: wrap;
    margin-top: 10px;
    gap: 10px;
    align-items: center;
    z-index: 999;
}

.preview-image {
    width: 60px;
    height: 60px;
    object-fit: cover;
    border-radius: 4px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    margin-top: 30rpx;
}

.detail-tip {
    font-size: 24rpx;
    color: #41b6b4;
    margin-left: 10rpx;
}
</style>
