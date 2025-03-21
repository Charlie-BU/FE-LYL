<template>
    <view class="container">
        <u-loading-page :loading="true" v-if="load" fontSize="28rpx" />
        <block v-else>
            <view class="form-info">
                <view class="form-row">
                    <view class="row-left">
                        <text class="red-text">*</text>
                        <text>项目标题</text>
                    </view>
                    <view class="row-input">
                        <u-input placeholder="请输入项目标题" border="none" type="text" placeholderClass="placeholder28" v-model="form.title" clearable />
                    </view>
                </view>
                <view class="form-row">
                    <view class="row-left">
                        <text class="red-text">*</text>
                        <text>项目标签</text>
                    </view>
                    <view class="row-input" @click="goNext('tags', 1)">
                        <text :class="{ 'text-c3': other.tags == '' }">{{ other.tags ? other.tags : "请选择项目标签" }}</text>
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
                        <text>招聘岗位</text>
                    </view>
                    <view class="row-input" @click="goNext('post', 2)">
                        <text :class="{ 'text-c3': other.post == '' }">{{ other.post ? other.post : "请选择招聘岗位" }}</text>
                    </view>
                    <view class="row-right" @click="goNext('post', 2)">
                        <u-icon name="arrow-right" size="16" color="#7D7D7D" />
                    </view>
                </view>
                <view class="form-row">
                    <view class="row-left">
                        <text>需求技能</text>
                    </view>
                    <view class="row-input" @click="goNext('talents', 3)">
                        <text :class="{ 'text-c3': other.talents == '' }">{{ other.talents ? other.talents : "请选择需求技能" }}</text>
                    </view>
                    <view class="row-right" @click="goNext('talents', 3)">
                        <u-icon name="arrow-right" size="16" color="#7D7D7D" />
                    </view>
                </view>
                <view class="form-row">
                    <view class="row-left">
                        <text>合作时间</text>
                    </view>
                    <view class="row-input">
                        <text @click="showStartDate = true" :class="{ 'text-c3': form.hz_start_time == '' }">{{ form.hz_start_time ? form.hz_start_time : "选择开始时间" }}</text>
                        <text class="heng-text">—</text>
                        <text @click="showEndDate = true" :class="{ 'text-c3': form.hz_end_time == '' }">{{ form.hz_end_time ? form.hz_end_time : "选择结束时间" }}</text>
                    </view>
                </view>
                <view class="form-row">
                    <view class="row-left">
                        <text class="red-text">*</text>
                        <text>薪资</text>
                    </view>
                    <view class="row-input">
                        <block v-if="form.salary_unit">
                            <u-input placeholder="请输入薪资" border="none" type="text" placeholderClass="placeholder28" v-model="form.salary" clearable />
                        </block>
                        <text @click="showUnit = true" :class="{ 'text-c3': form.salary_unit == '' }">{{ form.salary_unit ? form.salary_unit : "请先选择单位，再输入薪资" }}</text>
                    </view>
                    <view class="row-right" @click="showUnit = true">
                        <u-icon name="arrow-right" size="16" color="#7D7D7D" />
                    </view>
                </view>
                <view class="form-row column">
                    <view class="row-left">
                        <text>项目需求</text>
                    </view>
                    <view class="row-textarea">
                        <u-textarea :maxlength="300" height="80" border="none" v-model="form.strength" :customStyle="customStyle1" placeholder="请输入项目需求" />
                        <view class="textarea-count">已输入{{ form.strength.length }}/300</view>
                    </view>
                </view>
                <view class="form-row column">
                    <view class="row-left">
                        <text>岗位职责</text>
                    </view>
                    <view class="row-textarea">
                        <u-textarea :maxlength="300" height="80" border="none" v-model="form.experience" :customStyle="customStyle1" placeholder="请输入岗位职责" />
                        <view class="textarea-count">已输入{{ form.experience.length }}/300</view>
                    </view>
                </view>
                <view class="form-row column">
                    <view class="row-left">
                        <text>项目展示</text>
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
            :show="showStartDate"
            confirmColor="#02AAAB"
            cancelColor="#B8B8B8"
            title="选择时间"
            :minDate="minDate"
            @confirm="confirmDate"
            @cancel="showStartDate = false"
            mode="date"
        />

        <u-datetime-picker
            :show="showEndDate"
            confirmColor="#02AAAB"
            cancelColor="#B8B8B8"
            title="选择时间"
            :minDate="minDate"
            @confirm="confirmEndDate"
            @cancel="showEndDate = false"
            mode="date"
        />

        <u-picker :show="showUnit" :columns="columns" confirmColor="#02AAAB" cancelColor="#B8B8B8" @cancel="showUnit = false" @confirm="confirmUnit"></u-picker>
    </view>
</template>

<script>
import { fetch_data, upload_file } from "../../utils/ajax_request.js";
import md5 from "@/components/MD5.js";
var validate = require("@/components/validate/validate.js");
var _this;
let d = new Date();
export default {
    data() {
        return {
            temp_index: -1,
            default_heads: [],
            submitDisabled: false,
            customStyle1: {
                padding: "20rpx 28rpx 20rpx 28rpx",
                background: "transparent"
            },
            placeholderStyle: {
                color: "#C3C3C3"
            },
            showStartDate: false,
            showEndDate: false,
            showUnit: false,
            columns: [["元/天", "元/月", "项目总额"]],
            form: {
                step: 1,
                id: "",
                title: "",
                type: 1,
                tags: "",
                property: "",
                citys: "",
                post: "",
                talents: "",
                hz_start_time: "",
                hz_end_time: "",
                salary: "",
                salary_unit: "",
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
            minDate: Date.parse(`${d.getFullYear()}/01/01`),
            maxDate: Date.parse(`${d.getFullYear()}/${d.getMonth() + 1}/01`),
            temp_field: "",
            preview_images: [],
            new_images: [],
            item_id: "",
            posted: false, // 防抖标记
            required_fields: [
                {
                    name: "title",
                    msg: "请输入项目标题"
                },
                {
                    name: "tags",
                    msg: "请选择项目标签"
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
                    name: "post",
                    msg: "请输入招聘岗位"
                },
                {
                    name: "salary_unit",
                    msg: "请选择薪资单位"
                },
                {
                    name: "salary",
                    msg: "请输入薪资"
                }
            ]
        };
    },
    onLoad(e) {
        _this = this;
        if (e.id) {
            _this.form.id = e.id;
        }
        uni.$on("chooseTag", (res) => {
            if (res.from == 3) {
                _this.other[_this.temp_field] = res.brr.join(",");
                _this.form[_this.temp_field] = res.arr.join(",");
            }
        });
        _this.tijiao();
        // 异步拿到item id和works
        setTimeout(() => {
            let data1 = {
                user_id: _this.user_id,
                title: _this.form.title
            };
            try {
                if (data1.title) {
                    fetch_data("POST", "get_item_id", data1, "user", (res) => {
                        this.item_id = res.data.item_id;
                        fetch_data(
                            "POST",
                            "get_item_files",
                            {
                                item_id: this.item_id
                            },
                            "user",
                            (res) => {
                                const item_files = res.data.item_files;
                                for (let i = 1; i <= item_files.length; i++) {
                                    _this.preview_images.push(item_files["file" + i]);
                                }
                            }
                        );
                    });
                }
            } catch (error) {
                console.log(error);
            }
        }, 1000);
    },
    onUnload() {
        uni.$off("chooseTag");
    },
    computed: {
        minDate1: {
            cache: false,
            get() {
                return Date.parse(`${d.getFullYear() - 70}/01/01`);
            }
        }
        // showCitys:{
        // 	cache:false,
        // 	get() {
        // 		return this.other.property.includes('线下办公')
        // 	}
        // }
    },
    methods: {
        goNext(field, type) {
            _this.temp_field = field;
            _this.toNext(`/pages/index/filter-list?max=3&from=3&type=${type}`);
        },
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
            let d = date.getDate() < 10 ? `0${date.getDate()}` : `${date.getDate()}`;
            _this.form.hz_start_time = `${y}-${m}-${d}`;
            _this.showStartDate = false;
        },
        confirmEndDate(e) {
            let { value, mode } = e;
            const date = new Date(value);
            let y = date.getFullYear();
            let m = date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : `${date.getMonth() + 1}`;
            let d = date.getDate() < 10 ? `0${date.getDate()}` : `${date.getDate()}`;
            _this.form.hz_end_time = `${y}-${m}-${d}`;
            _this.showEndDate = false;
        },
        changeIndex(field, index) {
            if (_this.form[field] != index) {
                _this.form[field] = index;
            }
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
            this.new_images = [];
            this.preview_images = [];
        },

        upload_images() {
            if (!this.new_images || this.new_images.length === 0) {
                return Promise.resolve([]); // 如果没有新图片，直接返回空数组
            }
            // 一张一张传
            const uploadPromises = this.new_images.map((this_one) => {
                return new Promise((resolve, reject) => {
                    upload_file("upload_project_image_to_OSS", this_one, "this_one", "user", (res) => {
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

        // 提交：废弃
        async tijiao() {
            // 这里需要加防抖
            if (_this.posted) {
                console.log("rebounce");
                uni.hideToast();
                return;
            }
            if (_this.form.step == 2) {
                var rule = [
                    {
                        name: "title",
                        rules: ["require"],
                        errorMsg: {
                            require: "请输入项目标题"
                        }
                    },
                    {
                        name: "tags",
                        rules: ["require"],
                        errorMsg: {
                            require: "请选择项目标签"
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
                        name: "post",
                        rules: ["require"],
                        errorMsg: {
                            require: "请输入招聘岗位"
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
                    }
                ];
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

            const data = await _this.$post("port/edit_user_item", _this.form);
            if (data.code == 200) {
                _this.posted = true;
                const project_urls = await _this.upload_images();
                if (project_urls) {
                    let data1 = {
                        user_id: _this.user_id,
                        title: _this.form.title
                    };
                    fetch_data("POST", "get_item_id", data1, "user", (res) => {
                        _this.item_id = res.data.item_id;
                        if (_this.item_id) {
                            const data2 = {
                                item_id: _this.item_id,
                                item_type: 1,
                                files: project_urls
                            };
                            fetch_data("POST", "upload_works", data2, "user", (res) => {
                                if (res.data.status === 200) {
                                    uni.$u.toast(data.msg, () => {
                                        _this.finish();
                                    });
                                } else {
                                    uni.$u.toast("发布成功，但图片上传失败");
                                }
                            });
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
            
            fetch_data("POST", "edit_item", _this.form, "application", async (res) => {
                if (res.data.status === 200) {
                    const project_urls = await _this.upload_images();
                    if (project_urls.length !== 0) {
                        let data1 = {
                            user_id: _this.user_id,
                            title: _this.form.title
                        };
                        fetch_data("POST", "get_item_id", data1, "user", (res) => {
                            _this.item_id = res.data.item_id;
                            if (_this.item_id) {
                                const data2 = {
                                    item_id: _this.item_id,
                                    item_type: 1,
                                    files: project_urls
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
                                        uni.$u.toast("发布成功，但图片上传失败", () => {
                                            _this.finish();
                                            uni.reLaunch({
                                                url: "/pages/my/my"
                                            });
                                        });
                                    }
                                });
                            }
                        });
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
</style>
