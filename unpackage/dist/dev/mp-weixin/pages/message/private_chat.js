(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["pages/message/private_chat"],{

/***/ 423:
/*!****************************************************************************************!*\
  !*** S:/Work/上海利易联建筑设计科技有限公司/FE-LYL/main.js?{"page":"pages%2Fmessage%2Fprivate_chat"} ***!
  \****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(wx, createPage) {

var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
__webpack_require__(/*! uni-pages */ 26);
var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 25));
var _private_chat = _interopRequireDefault(__webpack_require__(/*! ./pages/message/private_chat.vue */ 424));
// @ts-ignore
wx.__webpack_require_UNI_MP_PLUGIN__ = __webpack_require__;
createPage(_private_chat.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/wx.js */ 1)["default"], __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["createPage"]))

/***/ }),

/***/ 424:
/*!*********************************************************************!*\
  !*** S:/Work/上海利易联建筑设计科技有限公司/FE-LYL/pages/message/private_chat.vue ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _private_chat_vue_vue_type_template_id_4e66cb95_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./private_chat.vue?vue&type=template&id=4e66cb95&scoped=true& */ 425);
/* harmony import */ var _private_chat_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./private_chat.vue?vue&type=script&lang=js& */ 427);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _private_chat_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _private_chat_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _private_chat_vue_vue_type_style_index_0_id_4e66cb95_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./private_chat.vue?vue&type=style&index=0&id=4e66cb95&lang=scss&scoped=true& */ 430);
/* harmony import */ var _C_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js */ 32);

var renderjs





/* normalize component */

var component = Object(_C_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _private_chat_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _private_chat_vue_vue_type_template_id_4e66cb95_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _private_chat_vue_vue_type_template_id_4e66cb95_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "4e66cb95",
  null,
  false,
  _private_chat_vue_vue_type_template_id_4e66cb95_scoped_true___WEBPACK_IMPORTED_MODULE_0__["components"],
  renderjs
)

component.options.__file = "pages/message/private_chat.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ 425:
/*!****************************************************************************************************************!*\
  !*** S:/Work/上海利易联建筑设计科技有限公司/FE-LYL/pages/message/private_chat.vue?vue&type=template&id=4e66cb95&scoped=true& ***!
  \****************************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _C_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_C_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_C_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_C_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_C_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_C_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_private_chat_vue_vue_type_template_id_4e66cb95_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--17-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./private_chat.vue?vue&type=template&id=4e66cb95&scoped=true& */ 426);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _C_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_C_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_C_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_C_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_C_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_C_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_private_chat_vue_vue_type_template_id_4e66cb95_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _C_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_C_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_C_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_C_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_C_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_C_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_private_chat_vue_vue_type_template_id_4e66cb95_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return _C_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_C_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_C_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_C_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_C_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_C_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_private_chat_vue_vue_type_template_id_4e66cb95_scoped_true___WEBPACK_IMPORTED_MODULE_0__["recyclableRender"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "components", function() { return _C_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_C_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_C_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_C_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_C_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_C_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_private_chat_vue_vue_type_template_id_4e66cb95_scoped_true___WEBPACK_IMPORTED_MODULE_0__["components"]; });



/***/ }),

/***/ 426:
/*!****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--17-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!S:/Work/上海利易联建筑设计科技有限公司/FE-LYL/pages/message/private_chat.vue?vue&type=template&id=4e66cb95&scoped=true& ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return recyclableRender; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "components", function() { return components; });
var components
try {
  components = {
    uInput: function () {
      return Promise.all(/*! import() | uview-ui/components/u-input/u-input */[__webpack_require__.e("common/vendor"), __webpack_require__.e("uview-ui/components/u-input/u-input")]).then(__webpack_require__.bind(null, /*! @/uview-ui/components/u-input/u-input.vue */ 593))
    },
    uPopup: function () {
      return Promise.all(/*! import() | uview-ui/components/u-popup/u-popup */[__webpack_require__.e("common/vendor"), __webpack_require__.e("uview-ui/components/u-popup/u-popup")]).then(__webpack_require__.bind(null, /*! @/uview-ui/components/u-popup/u-popup.vue */ 585))
    },
  }
} catch (e) {
  if (
    e.message.indexOf("Cannot find module") !== -1 &&
    e.message.indexOf(".vue") !== -1
  ) {
    console.error(e.message)
    console.error("1. 排查组件名称拼写是否正确")
    console.error(
      "2. 排查组件是否符合 easycom 规范，文档：https://uniapp.dcloud.net.cn/collocation/pages?id=easycom"
    )
    console.error(
      "3. 若组件不符合 easycom 规范，需手动引入，并在 components 中注册该组件"
    )
  } else {
    throw e
  }
}
var render = function () {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  var l0 = _vm.__map(_vm.lists, function (item, index) {
    var $orig = _vm.__get_orig(item)
    var m0 = _vm.renderMessageDate(item, index)
    var m1 = m0 ? _vm.formatDate(item.timestamp) : null
    var m2 = _vm.is_self(item)
    var m3 = m2 && item.type == "file" ? _vm.getFileType(item) : null
    var m4 = m2 && item.type == "file" ? _vm.formatFileSize(item) : null
    var g0 =
      m2 && item.type == "audio" ? Math.ceil(item.payload.duration) : null
    var m5 = !m2 && item.type == "file" ? _vm.getFileType(item) : null
    var m6 = !m2 && item.type == "file" ? _vm.formatFileSize(item) : null
    var g1 =
      !m2 && item.type == "audio" ? Math.ceil(item.payload.duration) : null
    return {
      $orig: $orig,
      m0: m0,
      m1: m1,
      m2: m2,
      m3: m3,
      m4: m4,
      g0: g0,
      m5: m5,
      m6: m6,
      g1: g1,
    }
  })
  if (!_vm._isMounted) {
    _vm.e0 = function ($event) {
      _vm.show_wx = false
    }
  }
  _vm.$mp.data = Object.assign(
    {},
    {
      $root: {
        l0: l0,
      },
    }
  )
}
var recyclableRender = false
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ 427:
/*!**********************************************************************************************!*\
  !*** S:/Work/上海利易联建筑设计科技有限公司/FE-LYL/pages/message/private_chat.vue?vue&type=script&lang=js& ***!
  \**********************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _C_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_C_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_C_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_C_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_C_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_private_chat_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--13-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./private_chat.vue?vue&type=script&lang=js& */ 428);
/* harmony import */ var _C_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_C_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_C_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_C_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_C_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_private_chat_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_C_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_C_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_C_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_C_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_C_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_private_chat_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _C_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_C_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_C_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_C_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_C_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_private_chat_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _C_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_C_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_C_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_C_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_C_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_private_chat_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_C_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_C_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_C_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_C_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_C_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_private_chat_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 428:
/*!*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--13-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!S:/Work/上海利易联建筑设计科技有限公司/FE-LYL/pages/message/private_chat.vue?vue&type=script&lang=js& ***!
  \*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {

var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _regenerator = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/regenerator */ 44));
var _toConsumableArray2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/toConsumableArray */ 18));
var _asyncToGenerator2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ 50));
var _utils = __webpack_require__(/*! @/lib/utils */ 338);
var _RecorderManager = _interopRequireDefault(__webpack_require__(/*! @/lib/RecorderManager */ 429));
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

var _this;
var GoEasy = uni.$GoEasy;
var recorderManager = new _RecorderManager.default();
var _default = {
  data: function data() {
    return {
      id: 0,
      uid: 0,
      to: {
        data: {
          head_pic: ''
        }
      },
      recorderManager: recorderManager,
      audioPlayer: {
        innerAudioContext: null,
        playingMessage: null
      },
      msg: '',
      open_bot: false,
      //上次查询结果里最后一条消息的时间戳，首次查询传入null即可
      lastTimestamp: null,
      scrollTop: 0,
      scroll_id: '',
      show_wx: false,
      weixin: '',
      tempIndex: -1,
      toIdentity: 1,
      init: 0,
      title: '',
      safe_area_bottom: 0,
      swap_type: 1,
      df_user: {},
      df_resume: ''
    };
  },
  onLoad: function onLoad(e) {
    _this = this;
    if (e) {
      for (var item in e) {
        _this[item] = e[item];
      }
    }
    if (_this.id == 0) {
      this.$u.toast('提交参数有误', function () {
        _this.finish();
      });
      return;
    }
    var sys = uni.getSystemInfoSync();
    console.log(sys);
    this.safe_area_bottom = sys.safeAreaInsets.bottom;
    var arr = _this.id.split('_');
    switch (arr[0]) {
      case 'user':
        _this.toIdentity = 1;
        break;
      case 'qy':
        _this.toIdentity = 2;
        break;
      case 'kf':
        _this.toIdentity = 3;
        break;
      default:
        break;
    }
    _this.uid = arr[1];
    _this.get_user_info();
    _this.initGoEasyListeners();
    // 语音播放器
    this.initAudioPlayer();
    // 录音监听器
    this.initRecorderListeners();
  },
  onReady: function onReady() {
    this.loadHistoryMessage();
    if (_this.title) {
      uni.setNavigationBarTitle({
        title: _this.title
      });
    }
  },
  onUnload: function onUnload() {
    //退出聊天页面之前，清空监听器
    GoEasy.im.off(GoEasy.IM_EVENT.PRIVATE_MESSAGE_RECEIVED, this.onMessageReceived);
    GoEasy.im.off(GoEasy.IM_EVENT.MESSAGE_DELETED, this.onMessageDeleted);
  },
  methods: {
    formatDate: _utils.formatDate,
    is_self: function is_self(item) {
      var senderId = item.senderId;
      // let arr = senderId.split('_')
      return this.get_prefix() + this.user_id == senderId;
      // let senderId = item.senderId
      // let arr = senderId.split('_')
      // return this.user_id == arr[1]
    },
    getFileType: function getFileType(item) {
      var name = item.payload.name;
      var arr = name.split('.');
      return arr[arr.length - 1];
    },
    formatFileSize: function formatFileSize(item) {
      var limit = item.payload.size;
      if (!limit || Number(limit) == 0) {
        return '0B';
      }
      // 将size B转换成 M
      var size = '';
      if (limit < 1 * 1024) {
        //小于1KB，则转化成B
        size = limit.toFixed(2) + 'B';
      } else if (limit < 1 * 1024 * 1024) {
        //小于1MB，则转化成KB
        size = (limit / 1024).toFixed(2) + 'KB';
      } else if (limit < 1 * 1024 * 1024 * 1024) {
        //小于1GB，则转化成MB
        size = (limit / (1024 * 1024)).toFixed(2) + 'MB';
      } else {
        //其他转化成GB
        size = (limit / (1024 * 1024 * 1024)).toFixed(2) + 'GB';
      }
      var sizeStr = size + ''; //转成字符串
      var index = sizeStr.indexOf('.'); //获取小数点处的索引
      var dou = sizeStr.substr(index + 1, 2); //获取小数点后两位的值
      if (dou == '00') {
        //判断后两位是否为00，如果是则删除00
        return sizeStr.substring(0, index) + sizeStr.substr(index + 3, 2);
      }
      return size;
    },
    //像微信那样显示时间，如果有几分钟没发消息了，才显示时间
    //todo:本不需要该方法，可以在标签里完成，但小程序有兼容性问题，被迫这样实现
    renderMessageDate: function renderMessageDate(message, index) {
      if (index === 0) {
        return true;
        // return formatDate(message.timestamp)
      } else {
        if (message.timestamp - this.lists[index - 1].timestamp > 5 * 60 * 1000) {
          return true;
          // return formatDate(message.timestamp)
        }
      }

      return false;
    },
    changeOpen: function changeOpen() {
      _this.open_bot = !_this.open_bot;
    },
    //获取用户信息
    get_user_info: function get_user_info() {
      var _this2 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee() {
        var params, data, _data$result, user, resume;
        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!(_this.uid > 0)) {
                  _context.next = 6;
                  break;
                }
                params = {
                  uid: _this.uid
                };
                _context.next = 4;
                return _this.$post('port/user_info', params);
              case 4:
                data = _context.sent;
                if (data.code == 200) {
                  _data$result = data.result, user = _data$result.user, resume = _data$result.resume;
                  _this.to = {
                    id: _this.id,
                    type: GoEasy.IM_SCENE.PRIVATE,
                    data: {
                      user_id: user.user_id,
                      qy_name: user.qy_name,
                      user_name: user.user_name,
                      kf_name: user.kf_name,
                      is_kf: user.is_kf,
                      head_pic: user.head_pic,
                      identity: _this.toIdentity
                    }
                  };
                  _this.df_user = user;
                  _this.df_resume = resume;
                  if (_this.init == 1) {
                    _this.create_init_msg();
                  }
                  console.log(user, _this.to);
                } else {
                  _this2.$u.toast(data.msg);
                }
              case 6:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }))();
    },
    //点击了头像
    clickHead: function clickHead() {
      if (this.identity == 3 || this.toIdentity == 3) {
        return;
      }
      if (this.identity == 2 && this.df_resume && this.df_resume.status == 3) {
        _this.toNext("/pages/talents/detail?id=".concat(this.df_resume.id));
      } else if (this.identity == 1) {
        _this.toNext("/my/item-list?uid=".concat(this.df_user.user_id));
      }
    },
    //您好，我对这个岗位很有兴趣，方便聊聊吗？/ 您好，我对您的简历很感兴趣，方便进一步沟通下吗？
    create_init_msg: function create_init_msg() {
      var msg = '';
      switch (_this.toIdentity) {
        case 1:
          msg = '您好，我对您的简历很感兴趣，方便进一步沟通下吗？';
          break;
        case 2:
          msg = '我对这个岗位很有兴趣，方便聊聊吗？';
          break;
        case 3:
          msg = '';
          break;
        default:
          break;
      }
      if (msg) {
        var im = GoEasy.im;
        //创建消息, 内容最长不超过3K，可以发送字符串，对象和json格式字符串
        im.createTextMessage({
          text: msg,
          //消息内容
          to: _this.to,
          onSuccess: function onSuccess(message) {
            console.log(message);
            _this.sendMessage(message);
          },
          onFailed: function onFailed(e) {
            console.log('error :', e);
          }
        });
      }
    },
    getMore: function getMore() {
      console.log('getMore');
      _this.loadHistoryMessage();
    },
    //查询历史消息
    loadHistoryMessage: function loadHistoryMessage() {
      var _this3 = this;
      var lastMessageTimeStamp = null;
      var lastMessage = this.lists[0];
      if (lastMessage) {
        lastMessageTimeStamp = lastMessage.timestamp;
      }
      console.log('lastMessageTimeStamp', lastMessageTimeStamp);
      GoEasy.im.history({
        userId: this.id,
        lastTimestamp: lastMessageTimeStamp,
        limit: 30,
        onSuccess: function onSuccess(result) {
          var messages = result.content;
          if (messages.length > 0) {
            if (lastMessageTimeStamp) {
              var _this$lists;
              (_this$lists = _this.lists).unshift.apply(_this$lists, (0, _toConsumableArray2.default)(messages));
            } else {
              _this.lists = messages;
            }
            _this.scroll_to_bottom();
          }
          //收到的消息设置为已读
          _this3.markPrivateMessageAsRead();
          console.log('获取历史消息成功:', result, _this.lists);
          return;
          uni.stopPullDownRefresh();
          _this3.history.loading = false;
          if (messages.length === 0) {
            _this3.history.allLoaded = true;
          } else {
            if (lastMessageTimeStamp) {
              _this3.history.messages = messages.concat(_this3.history.messages);
            } else {
              _this3.history.messages = messages;
            }
            if (messages.length < 10) {
              _this3.history.allLoaded = true;
            }
            if (scrollToBottom) {
              _this3.scrollToBottom();
              //收到的消息设置为已读
              _this3.markPrivateMessageAsRead();
            }
          }
        },
        onFailed: function onFailed(error) {
          //获取失败
          console.log('获取历史消息失败:', error);
          // uni.stopPullDownRefresh();
          // this.history.loading = false;
        }
      });
    },
    confirmMsg: function confirmMsg() {
      if (this.msg == '') {
        this.$u.toast('请输入发送消息');
        return;
      }
      var im = GoEasy.im;
      //创建消息, 内容最长不超过3K，可以发送字符串，对象和json格式字符串
      im.createTextMessage({
        text: _this.msg,
        //消息内容
        to: _this.to,
        onSuccess: function onSuccess(message) {
          console.log(message);
          _this.sendMessage(message, true);
        },
        onFailed: function onFailed(e) {
          console.log('error :', e);
        }
      });
    },
    confirmWeixin: function confirmWeixin() {
      var _this4 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee2() {
        var params, data, info;
        return _regenerator.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (!(_this4.weixin == '' || _this4.weixin == null)) {
                  _context2.next = 3;
                  break;
                }
                _this4.$u.toast('请输入微信号');
                return _context2.abrupt("return");
              case 3:
                params = {
                  weixin: _this.weixin
                };
                _context2.next = 6;
                return _this.$post('port/edit_user_wx', params);
              case 6:
                data = _context2.sent;
                if (data.code == 200) {
                  uni.$u.toast(data.msg);
                  _this.current_user.weixin = _this.weixin;
                  if (_this.swap_type == 1) {
                    //是点击的交换微信
                    _this.send_custom_msg();
                  } else {
                    //是点击的操作同意交换微信
                    info = {
                      type: 2,
                      content: _this.weixin
                    };
                    GoEasy.im.createCustomMessage({
                      type: 'agree_wx_phone',
                      //字符串，可以任意自定义类型，比如红包'hongbao', 订单'order，处方'chufang'
                      to: _this.to,
                      payload: info,
                      onSuccess: function onSuccess(message) {
                        if (_this.tempIndex != -1) {
                          var item = _this.lists[_this.tempIndex];
                          _this.deleteMessage(item, _this.tempIndex);
                        }
                        _this.sendMessage(message, false, false);
                        _this.send_extra_msg(2);
                      },
                      onFailed: function onFailed(e) {
                        console.log('error :', e);
                      }
                    });
                  }
                  _this.weixin = '';
                  _this.show_wx = false;
                } else {
                  uni.$u.toast(data.msg);
                }
              case 8:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }))();
    },
    //发送图片消息
    send_image_msg: function send_image_msg() {
      uni.chooseImage({
        count: 1,
        success: function success(res) {
          var tempFile = res.tempFiles[0];
          GoEasy.im.createImageMessage({
            to: _this.to,
            file: tempFile,
            onProgress: function onProgress(progress) {
              console.log(progress);
            },
            onSuccess: function onSuccess(message) {
              console.log('创建图片消息成功:', message);
              _this.sendMessage(message);
            },
            onFailed: function onFailed(e) {
              console.log('error :', e);
            }
          });
        },
        fail: function fail(_fail) {
          console.log(_fail);
        }
      });
    },
    //发送自定义消息
    send_custom_msg: function send_custom_msg() {
      var type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'swap_wx';
      if (type == 'swap_wx') {
        if (_this.current_user.weixin == '' || _this.current_user.weixin == null) {
          _this.swap_type = 1;
          _this.show_wx = true;
          _this.tempIndex = -1;
          return;
        }
      }
      var info = {
        status: -1
      };
      GoEasy.im.createCustomMessage({
        type: type,
        //字符串，可以任意自定义类型，比如红包'hongbao', 订单'order，处方'chufang'
        to: _this.to,
        payload: info,
        onSuccess: function onSuccess(message) {
          console.log('创建自定义消息成功:', message);
          _this.sendMessage(message);
        },
        onFailed: function onFailed(e) {
          console.log('error :', e);
        }
      });
    },
    sendMessage: function sendMessage(message) {
      var is_text = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var scroll_bottom = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
      _this.lists.push(message);
      if (scroll_bottom) {
        _this.scroll_to_bottom();
      }
      var im = GoEasy.im;
      //发送消息
      im.sendMessage({
        message: message,
        onSuccess: function onSuccess(message1) {
          //发送成功
          console.log("Private message sent successfully.", message1);
          if (is_text) {
            _this.msg = '';
          }
        },
        onFailed: function onFailed(error) {
          //发送失败
          console.log('Failed to send private message，code:' + error.code + ' ,error ' + error.content);
        }
      });
    },
    initGoEasyListeners: function initGoEasyListeners() {
      // 监听私聊消息
      GoEasy.im.on(GoEasy.IM_EVENT.PRIVATE_MESSAGE_RECEIVED, this.onMessageReceived);
      //监听消息删除
      GoEasy.im.on(GoEasy.IM_EVENT.MESSAGE_DELETED, this.onMessageDeleted);
    },
    onMessageReceived: function onMessageReceived(message) {
      console.log('监听到私聊消息：', message);
      var senderId = message.senderId;
      var receiverId = message.receiverId;
      if (this.get_prefix() + this.user_id == receiverId && senderId == this.id) {
        _this.lists.push(message);
        //聊天时，收到消息标记为已读
        _this.markPrivateMessageAsRead();
        _this.scroll_to_bottom();
      }
      return;
      var friendId = this.currentUser.id === senderId ? receiverId : senderId;
      if (friendId === this.friend.id) {
        this.history.messages.push(message);
        //聊天时，收到消息标记为已读
        this.markPrivateMessageAsRead();
        //收到新消息，是滚动到最底部
        this.scrollToBottom();
      }
    },
    onMessageDeleted: function onMessageDeleted(deletedMessages) {
      var _this5 = this;
      console.log('监听到私聊消息删除：', deletedMessages);
      return;
      deletedMessages.forEach(function (message) {
        var senderId = message.senderId;
        var receiverId = message.receiverId;
        var friendId = _this5.currentUser.id === senderId ? receiverId : senderId;
        if (friendId === _this5.friend.id) {
          var index = _this5.history.messages.indexOf(message);
          if (index > -1) {
            _this5.history.messages.splice(index, 1);
          }
        }
      });
    },
    markPrivateMessageAsRead: function markPrivateMessageAsRead() {
      GoEasy.im.markMessageAsRead({
        // id: this.to.id,
        // type: this.to.type,
        id: _this.id,
        type: GoEasy.IM_SCENE.PRIVATE,
        onSuccess: function onSuccess() {
          console.log('标记私聊已读成功');
        },
        onFailed: function onFailed(error) {
          console.log("标记私聊已读失败", error);
        }
      });
    },
    scroll_to_bottom: function scroll_to_bottom() {
      // _this.scroll_id = _this.lists[_this.lists.length - 1]['messageId']
      this.$nextTick(function () {
        var query = uni.createSelectorQuery();
        query.select('#scroll').boundingClientRect();
        query.select('#scroll-container').boundingClientRect();
        query.exec(function (res) {
          var scrollViewHeight = res[0].height;
          var scrollContentHeight = res[1].height;
          if (scrollContentHeight > scrollViewHeight) {
            var scroll_top = scrollContentHeight - scrollViewHeight;
            _this.scrollTop = scroll_top;
          }
        });
      });
      // console.log(this.scroll_id);
    },
    //拒绝交换电话/微信
    refuse: function refuse(type, item, index) {
      var content = '确定拒绝交换电话?';
      if (type == 2) {
        content = '确定拒绝交换微信?';
      }
      uni.showModal({
        title: '操作提示',
        content: content,
        success: function success(res) {
          if (res.confirm) {
            var info = {
              type: type
            };
            GoEasy.im.createCustomMessage({
              type: 'refuse_wx_phone',
              //字符串，可以任意自定义类型，比如红包'hongbao', 订单'order，处方'chufang'
              to: _this.to,
              payload: info,
              onSuccess: function onSuccess(message) {
                _this.deleteMessage(item, index);
                _this.sendMessage(message, false, false);
              },
              onFailed: function onFailed(e) {
                console.log('error :', e);
              }
            });
          } else {
            console.log('点击了取消');
          }
        }
      });
    },
    //删除消息
    deleteMessage: function deleteMessage(message, index) {
      GoEasy.im.deleteMessage({
        messages: [message],
        //必须为数组格式，要删除的消息
        onSuccess: function onSuccess() {
          //消息删除成功
          console.log("Messages delete successfully.");
          _this.lists.splice(index, 1);
        },
        onFailed: function onFailed(error) {
          //消息删除失败
          console.log("Failed to delete message, code:" + error.code + " content:" + error.content);
        }
      });
    },
    //同意交换电话/微信
    agree: function agree(type, item, index) {
      var content = '确定同意交换电话?';
      if (type == 2) {
        content = '确定同意交换微信?';
      }
      uni.showModal({
        title: '操作提示',
        content: content,
        success: function success(res) {
          if (res.confirm) {
            if (type == 2) {
              if (_this.current_user.weixin == '' || _this.current_user.weixin == null) {
                _this.swap_type = 2;
                _this.show_wx = true;
                _this.tempIndex = index;
                return;
              }
            }
            var info = {
              type: type
            };
            if (type == 1) {
              info.content = _this.current_user.mobile;
            } else {
              info.content = _this.current_user.weixin;
            }
            GoEasy.im.createCustomMessage({
              type: 'agree_wx_phone',
              //字符串，可以任意自定义类型，比如红包'hongbao', 订单'order，处方'chufang'
              to: _this.to,
              payload: info,
              onSuccess: function onSuccess(message) {
                _this.deleteMessage(item, index);
                _this.sendMessage(message, false, false);
                _this.send_extra_msg(type);
              },
              onFailed: function onFailed(e) {
                console.log('error :', e);
              }
            });
          } else {
            console.log('点击了取消');
          }
        }
      });
    },
    //同意交换微信号在发一条额外信息给对方
    send_extra_msg: function send_extra_msg(type) {
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee3() {
        var params, data, user, info;
        return _regenerator.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                params = {
                  uid: _this.uid
                };
                _context3.next = 3;
                return _this.$post('port/user_info', params);
              case 3:
                data = _context3.sent;
                if (data.code == 200) {
                  user = data.result.user;
                  info = {
                    type: type
                  };
                  if (type == 1) {
                    info.content = user.mobile;
                    // info.df_content = _this.df_user.mobile
                  } else {
                    info.content = user.weixin;
                    // info.df_content = _this.df_user.weixin
                  }

                  GoEasy.im.createCustomMessage({
                    type: 'consent_wx_phone',
                    //字符串，可以任意自定义类型，比如红包'hongbao', 订单'order，处方'chufang'
                    to: _this.to,
                    payload: info,
                    onSuccess: function onSuccess(message) {
                      _this.sendMessage(message, false, true);
                    },
                    onFailed: function onFailed(e) {
                      console.log('error :', e);
                    }
                  });
                } else {}
              case 5:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }))();
    },
    copy: function copy(item) {
      var content = item.payload.content;
      uni.setClipboardData({
        data: content,
        success: function success() {
          _this.$u.toast("\u590D\u5236\u6210\u529F");
        },
        fail: function fail(_fail2) {
          console.log('复制失败:', _fail2);
        }
      });
    },
    chooseMessageFile: function chooseMessageFile() {
      uni.chooseMessageFile({
        count: 1,
        type: 'file',
        extension: ['pdf', 'doc', 'docx'],
        success: function success(res) {
          var tempFile = res.tempFiles[0];
          var size = tempFile.size;
          if (size > 8 * 1024 * 1024) {
            _this.$u.toast('最多可发送8M文件');
            return;
          }
          GoEasy.im.createFileMessage({
            to: _this.to,
            file: tempFile,
            onProgress: function onProgress(progress) {
              console.log('上传进度:', progress);
            },
            onSuccess: function onSuccess(message) {
              console.log('创建文件消息成功:', message);
              _this.sendMessage(message);
            },
            onFailed: function onFailed(e) {
              console.log('error :', e);
            }
          });
        },
        fail: function fail(_fail3) {
          console.log('选择微信文件失败', _fail3);
        }
      });
    },
    openFile: function openFile(item) {
      var url = encodeURI(item.payload.url);
      uni.downloadFile({
        url: url,
        success: function success(res) {
          var filePath = res.tempFilePath;
          uni.openDocument({
            filePath: filePath,
            // fileType:_this.getFileType(item),
            showMenu: true,
            success: function success(res1) {
              console.log('打开文档成功');
            },
            fail: function fail(_fail4) {
              console.log('打开文档失败', _fail4);
            }
          });
        },
        fail: function fail(_fail5) {
          console.log('下载文件失败', _fail5);
        }
      });
    },
    initRecorderListeners: function initRecorderListeners() {
      recorderManager.onRecordComplete(function (file, duration) {
        if (duration < 1000) {
          _this.$u.toast('录音时间太短');
          return;
        }
        GoEasy.im.createAudioMessage({
          to: _this.to,
          file: file,
          // notification: {
          //   title: this.currentUser.name + '发来一段语音',
          //   body: '[语音消息]',		// 字段最长 50 字符
          //   sound: 'message',
          //   badge: '+1'
          // },
          onProgress: function onProgress(progress) {
            console.log(progress);
          },
          onSuccess: function onSuccess(message) {
            console.log('创建语音消息成功:', message);
            _this.sendMessage(message);
          },
          onFailed: function onFailed(e) {
            console.log('error :', e);
          }
        });
      });
    },
    onRecordStart: function onRecordStart() {
      uni.getSetting({
        success: function success(res) {
          if (res.authSetting['scope.record']) {
            console.log('有录音权限');
            recorderManager.start();
          } else {
            uni.authorize({
              scope: 'scope.record',
              success: function success(res1) {
                // recorderManager.start();
                console.log('授权录音权限成功', res1);
              },
              fail: function fail(_fail6) {
                console.log('授权录音权限失败', _fail6);
              }
            });
            //判断录音是否是开启状态false没开启就跳转到开启页面
            if (res.authSetting['scope.record'] == false) {
              uni.openSetting({
                success: function success(res) {
                  console.log(res.authSetting);
                }
              });
            }
          }
        }
      });
    },
    onRecordEnd: function onRecordEnd() {
      uni.getSetting({
        success: function success(res) {
          if (res.authSetting['scope.record']) {
            recorderManager.stop();
          }
        }
      });
    },
    initAudioPlayer: function initAudioPlayer() {
      var _this6 = this;
      this.audioPlayer.innerAudioContext = uni.createInnerAudioContext();
      this.audioPlayer.innerAudioContext.onEnded(function () {
        _this6.audioPlayer.playingMessage = null;
      });
      this.audioPlayer.innerAudioContext.onStop(function () {
        _this6.audioPlayer.playingMessage = null;
      });
    },
    playAudio: function playAudio(audioMessage) {
      console.log('播放语音', audioMessage);
      var playingMessage = this.audioPlayer.playingMessage;
      if (playingMessage) {
        this.audioPlayer.innerAudioContext.stop();
        // 如果点击的消息正在播放，就认为是停止播放操作
        if (playingMessage === audioMessage) {
          return;
        }
      }
      this.audioPlayer.playingMessage = audioMessage;
      this.audioPlayer.innerAudioContext.src = encodeURI(audioMessage.payload.url);
      this.audioPlayer.innerAudioContext.play();
    },
    //预览图片
    previewImage: function previewImage(item) {
      uni.previewImage({
        urls: [item.payload.url]
      });
    }
  }
};
exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["default"]))

/***/ }),

/***/ 430:
/*!*******************************************************************************************************************************!*\
  !*** S:/Work/上海利易联建筑设计科技有限公司/FE-LYL/pages/message/private_chat.vue?vue&type=style&index=0&id=4e66cb95&lang=scss&scoped=true& ***!
  \*******************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _C_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_C_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_C_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_C_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_C_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_C_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_C_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_C_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_C_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_private_chat_vue_vue_type_style_index_0_id_4e66cb95_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./node_modules/mini-css-extract-plugin/dist/loader.js??ref--8-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--8-oneOf-1-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-2!./node_modules/postcss-loader/src??ref--8-oneOf-1-3!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/sass-loader/dist/cjs.js??ref--8-oneOf-1-4!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-5!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./private_chat.vue?vue&type=style&index=0&id=4e66cb95&lang=scss&scoped=true& */ 431);
/* harmony import */ var _C_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_C_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_C_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_C_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_C_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_C_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_C_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_C_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_C_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_private_chat_vue_vue_type_style_index_0_id_4e66cb95_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_C_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_C_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_C_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_C_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_C_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_C_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_C_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_C_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_C_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_private_chat_vue_vue_type_style_index_0_id_4e66cb95_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _C_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_C_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_C_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_C_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_C_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_C_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_C_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_C_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_C_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_private_chat_vue_vue_type_style_index_0_id_4e66cb95_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _C_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_C_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_C_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_C_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_C_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_C_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_C_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_C_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_C_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_private_chat_vue_vue_type_style_index_0_id_4e66cb95_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_C_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_C_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_C_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_C_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_C_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_C_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_C_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_C_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_C_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_private_chat_vue_vue_type_style_index_0_id_4e66cb95_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 431:
/*!***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??ref--8-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--8-oneOf-1-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-2!./node_modules/postcss-loader/src??ref--8-oneOf-1-3!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/sass-loader/dist/cjs.js??ref--8-oneOf-1-4!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-5!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!S:/Work/上海利易联建筑设计科技有限公司/FE-LYL/pages/message/private_chat.vue?vue&type=style&index=0&id=4e66cb95&lang=scss&scoped=true& ***!
  \***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(false) { var cssReload; }
  

/***/ })

},[[423,"common/runtime","common/vendor"]]]);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/message/private_chat.js.map