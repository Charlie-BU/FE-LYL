<template>
	<view class="container">
		<view class="info-contianer">
			<scroll-view scroll-y class="scroll" id="scroll" :scroll-into-view="`item-${scroll_id}`"
				:scroll-top="scrollTop" @scrolltoupper="getMore()">
				<view class="items" id="scroll-container">
					<block v-for="(item,index) in lists">
						<view class="item item-time" v-if="renderMessageDate(item,index)">
							<text class="text-b8">{{ formatDate(item.timestamp) }}</text>
						</view>
						<block v-if="is_self(item)">
							<view class="item item-right" :id="`item-${item.messageId}`"
								:key="item.messageId" v-if="item.type == 'text'">
								<image :src="identity == 3 ? '/my/static/kefu.png' : current_user.head_pic"
									mode="aspectFill" class="left-img" />
								<view class="center-text">
									<text>{{item.payload.text}}</text>
								</view>
							</view>
							<view class="item item-image item-right" :id="`item-${item.messageId}`"
								v-if="item.type == 'image'" :key="item.messageId">
								<image :src="identity == 3 ? '/my/static/kefu.png' : current_user.head_pic"
									mode="aspectFill" class="left-img" />
								<view class="center-image">
									<image :src="item.payload.thumbnail" mode="widthFix"
										@click="previewImage(item)" />
								</view>
							</view>
							<view class="item item-time" :id="`item-${item.messageId}`"
								v-if="item.type == 'swap_wx'" :key="item.messageId">
								<text class="grey-text">您申请了与对方交换微信</text>
							</view>
							<view class="item item-time" :id="`item-${item.messageId}`"
								v-if="item.type == 'swap_phone'" :key="item.messageId">
								<text class="grey-text">您申请了与对方交换电话</text>
							</view>
							<view class="item item-time" v-if="item.type == 'refuse_wx_phone'"
								:id="`item-${item.messageId}`" :key="item.messageId">
								<text
									class="grey-text">{{item.payload.type == 1 ? '您拒绝了与对方交换电话' : '您拒绝了对方与您交换微信'}}</text>
							</view>
							<view class="item item-time" v-if="item.type == 'agree_wx_phone'"
								:id="`item-${item.messageId}`" :key="item.messageId">
								<text
									class="grey-text">{{item.payload.type == 1 ? '您同意了与对方交换电话' : '您同意了对方与您交换微信'}}</text>
							</view>
							<view class="item item-file item-right" @click="openFile(item)"
								:id="`item-${item.messageId}`" v-if="item.type == 'file'"
								:key="item.messageId">
								<image :src="identity == 3 ? '/my/static/kefu.png' : current_user.head_pic"
									mode="aspectFill" class="left-img" />
								<view class="center-file">
									<image src="@/static/message/chat-pdf.png" mode="widthFix"
										class="top-icon" v-if="getFileType(item) == 'pdf'" />
									<image src="@/static/message/chat-word.png" mode="widthFix"
										class="top-icon" v-else />
									<view class="right">
										<view class="title-text">{{item.payload.name}}</view>
										<view class="info-text">{{ formatFileSize(item) }}</view>
									</view>
								</view>
							</view>
							<view class="item item-audio item-right" :id="`item-${item.messageId}`"
								v-if="item.type == 'audio'" :key="item.messageId">
								<image :src="identity == 3 ? '/my/static/kefu.png' : current_user.head_pic"
									mode="aspectFill" class="left-img" />
								<view class="audio-file" @click.stop="playAudio(item)">
									<image src="@/static/common/play-self1.gif" mode="widthFix"
										class="audio-icon"
										v-if="audioPlayer.playingMessage && audioPlayer.playingMessage.messageId === item.messageId" />
									<image src="@/static/common/voice-self.png" mode="widthFix"
										class="audio-icon" v-else />
								</view>
								<view class="audio-text">{{ Math.ceil(item.payload.duration)}}″</view>
							</view>
							<view class="item item-wx-phone" v-if="item.type == 'consent_wx_phone'"
								:id="`item-${item.messageId}`" :key="item.messageId">
								<image :src="toIdentity == 3 ? '/my/static/kefu.png' : to.data.head_pic"
									mode="aspectFill" class="left-img" />
								<view class="center-phone">
									<view class="center-top">
										<image src="@/static/message/chat-phone-blue.png"
											mode="widthFix" class="top-icon"
											v-if="item.payload.type == 1" />
										<image src="@/static/index/weixin.png" mode="widthFix"
											class="top-icon" v-else />
										<view class="right">
											<view class="title-text">
												{{item.payload.type == 1 ? '我的手机号' : '我的微信号'}}：
											</view>
											<view class="info-text">{{item.payload.content}}
											</view>
										</view>
									</view>
									<view class="center-bot-text" @click="copy(item)">
										{{item.payload.type == 1 ? '复制手机号' : '复制微信号'}}
									</view>
								</view>
							</view>
						</block>
						<block v-else>
							<view class="item" v-if="item.type == 'text'" :id="`item-${item.messageId}`"
								:key="item.messageId">
								<image :src="toIdentity == 3 ? '/my/static/kefu.png' : to.data.head_pic"
									mode="aspectFill" class="left-img" @click.stop="clickHead()" />
								<view class="center-text">
									<text>{{item.payload.text}}</text>
								</view>
							</view>
							<view class="item item-image" :id="`item-${item.messageId}`"
								v-if="item.type == 'image'" :key="item.messageId">
								<image :src="toIdentity == 3 ? '/my/static/kefu.png' : to.data.head_pic"
									mode="aspectFill" class="left-img" @click.stop="clickHead()" />
								<view class="center-image">
									<image :src="item.payload.thumbnail" mode="widthFix"
										@click="previewImage(item)" />
								</view>
							</view>
							<view class="item item-swap" v-if="item.type == 'swap_wx'"
								:id="`item-${item.messageId}`" :key="item.messageId">
								<image :src="toIdentity == 3 ? '/my/static/kefu.png' : to.data.head_pic"
									mode="aspectFill" class="left-img" @click.stop="clickHead()" />
								<view class="center-info">
									<view class="center-top">
										<image src="@/static/index/weixin.png" mode="widthFix"
											class="top-icon" />
										<text class="top-text">我想要和您交换微信，您是否同意</text>
									</view>
									<view class="center-bot-button"
										:class="{'one-button':item.payload.status != -1}">
										<block v-if="item.payload.status == -1">
											<button class="refuse-btn"
												@click="refuse(2,item,index)">拒绝</button>
											<button class="agree-btn"
												@click="agree(2,item,index)">同意</button>
										</block>
										<block v-else>
											<button class="agree-btn"
												v-if="item.payload.status == 1">已同意</button>
											<button class="refuse-btn"
												v-if="item.payload.status == 2">已拒绝</button>
										</block>
									</view>
								</view>
							</view>
							<view class="item item-swap item-swap-phone" v-if="item.type == 'swap_phone'"
								:id="`item-${item.messageId}`" :key="item.messageId">
								<image :src="toIdentity == 3 ? '/my/static/kefu.png' : to.data.head_pic"
									mode="aspectFill" class="left-img" @click.stop="clickHead()" />
								<view class="center-info">
									<view class="center-top">
										<image src="@/static/message/chat-phone-blue.png"
											mode="widthFix" class="top-icon" />
										<text class="top-text">我想要和您交换电话，您是否同意</text>
									</view>
									<view class="center-bot-button"
										:class="{'one-button':item.payload.status != -1}">
										<block v-if="item.payload.status == -1">
											<button class="refuse-btn"
												@click="refuse(1,item,index)">拒绝</button>
											<button class="agree-btn"
												@click="agree(1,item,index)">同意</button>
										</block>
										<block v-else>
											<button class="agree-btn"
												v-if="item.payload.status == 1">已同意</button>
											<button class="refuse-btn"
												v-if="item.payload.status == 2">已拒绝</button>
										</block>
									</view>
								</view>
							</view>
							<view class="item item-time" v-if="item.type == 'refuse_wx_phone'"
								:id="`item-${item.messageId}`" :key="item.messageId">
								<text
									class="grey-text">{{item.payload.type == 1 ? '对方拒绝了与您交换电话' : '对方拒绝了与您交换微信'}}</text>
							</view>
							<view class="item item-wx-phone" v-if="item.type == 'agree_wx_phone'"
								:id="`item-${item.messageId}`" :key="item.messageId">
								<image :src="toIdentity == 3 ? '/my/static/kefu.png' : to.data.head_pic"
									mode="aspectFill" class="left-img" @click.stop="clickHead()" />
								<view class="center-phone">
									<view class="center-top">
										<image src="@/static/message/chat-phone-blue.png"
											mode="widthFix" class="top-icon"
											v-if="item.payload.type == 1" />
										<image src="@/static/index/weixin.png" mode="widthFix"
											class="top-icon" v-else />
										<view class="right">
											<view class="title-text">
												{{item.payload.type == 1 ? '我的手机号' : '我的微信号'}}：
											</view>
											<view class="info-text">{{item.payload.content}}
											</view>
										</view>
									</view>
									<view class="center-bot-text" @click="copy(item)">
										{{item.payload.type == 1 ? '复制手机号' : '复制微信号'}}
									</view>
								</view>
							</view>
							<view class="item item-file" @click="openFile(item)"
								v-if="item.type == 'file'" :id="`item-${item.messageId}`"
								:key="item.messageId">
								<image :src="toIdentity == 3 ? '/my/static/kefu.png' : to.data.head_pic"
									mode="aspectFill" class="left-img" @click.stop="clickHead()" />
								<view class="center-file">
									<image src="@/static/message/chat-pdf.png" mode="widthFix"
										class="top-icon" v-if="getFileType(item) == 'pdf'" />
									<image src="@/static/message/chat-word.png" mode="widthFix"
										class="top-icon" v-else />
									<view class="right">
										<view class="title-text">{{item.payload.name}}</view>
										<view class="info-text">{{ formatFileSize(item) }}</view>
									</view>
								</view>
							</view>
							<view class="item item-audio" v-if="item.type == 'audio'"
								:id="`item-${item.messageId}`" :key="item.messageId">
								<image :src="toIdentity == 3 ? '/my/static/kefu.png' : to.data.head_pic"
									mode="aspectFill" class="left-img" @click.stop="clickHead()" />
								<view class="audio-file" @click.stop="playAudio(item)">
									<image src="@/static/common/play.gif" mode="widthFix"
										class="audio-icon"
										v-if="audioPlayer.playingMessage && audioPlayer.playingMessage.messageId === item.messageId" />
									<image src="@/static/common/voice.png" mode="widthFix"
										class="audio-icon" v-else />
								</view>
								<view class="audio-text">{{ Math.ceil(item.payload.duration)}}″</view>
							</view>
						</block>
					</block>
				</view>
			</scroll-view>
			<view class="chat-bot">
				<view class="chat-bot-top" :class="{'border':open_bot}">
					<view class="left">
						<u-input placeholder="新信息" border="none" type="text"
							placeholderClass="placeholder28" v-model="msg" confirmType="send"
							@confirm="confirmMsg" clearable />
					</view>
					<view class="right">
						<image src="@/static/message/chat-voice.png" @touchstart.stop="onRecordStart"
							@touchend.stop="onRecordEnd" mode="widthFix" class="right-icon" />
						<image @click="changeOpen()"
							:src="open_bot ? '/static/message/chat-close.png' : '/static/message/chat-add.png'"
							mode="widthFix" class="right-icon" />
					</view>
				</view>
				<view :style="{
					'height':safe_area_bottom + 'px'
				}" v-if="!open_bot"></view>
				<view class="chat-bot-bottom" v-if="open_bot">
					<view class="bot-item" @click="send_image_msg()">
						<image src="@/static/message/chat-image.png" mode="widthFix" class="item-img" />
						<view class="item-text">图片</view>
					</view>
					<view class="bot-item" @click="chooseMessageFile()">
						<image src="@/static/message/chat-file.png" mode="widthFix" class="item-img" />
						<view class="item-text">文件</view>
					</view>
					<view class="bot-item" @click="confirm_coopration('swap_phone')">
						<image src="@/static/message/chat-phone.png" mode="widthFix" class="item-img" />
						<view class="item-text">确认合作</view>
					</view>
					<view class="bot-item" @click="grade_coopration()">
						<image src="@/static/message/chat-weixin.png" mode="widthFix" class="item-img" />
						<view class="item-text">合作评分</view>
					</view>
					<view class="bot-item" @click="sign_contrast()">
						<image src="@/static/message/chat-weixin.png" mode="widthFix" class="item-img" />
						<view class="item-text">签署合同</view>
					</view>
					<view class="bot-item" @click="manage_asset()">
						<image src="@/static/message/chat-weixin.png" mode="widthFix" class="item-img" />
						<view class="item-text">资金代管</view>
					</view>
				</view>
			</view>
		</view>

		<view class="record-loading" v-if="recorderManager.recording">
			<image src="@/static/common/recording-loading.gif" mode="widthFix" />
		</view>
		<u-popup :show="show_wx" @close="show_wx=false" mode="center" :customStyle="customAlertStyle"
			bgColor="transparent" :overlayOpacity="0.4">
			<view class="weixin-popup">
				<view class="weixin-input">
					<u-input placeholder="请输入您的微信号" border="none" type="text" placeholderClass="placeholder28"
						v-model="weixin" clearable />
				</view>
				<view class="weixin-info">双方同意后，可以看到彼此的微信号<br>您可以在个人信息中修改微信号</view>
				<view class="weixin-bot">
					<button class="confirm-btn" @click="confirmWeixin">确定</button>
				</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	import {
		fetch_data,
		upload_file
	} from '../../utils/ajax_request.js'
	import * as utils from '../../utils/utils.js'
	var _this;
	const GoEasy = uni.$GoEasy;
	import {
		formatDate
	} from '@/lib/utils';
	import RecorderManager from '@/lib/RecorderManager';
	const recorderManager = new RecorderManager();
	export default {
		data() {
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
					playingMessage: null,
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
			}
		},
		onLoad(e) {
			_this = this;
			if (e) {
				for (let item in e) {
					_this[item] = e[item]
				}
			}
			if (_this.id == 0) {
				this.$u.toast('提交参数有误', () => {
					_this.finish()
				})
				return;
			}
			let sys = uni.getSystemInfoSync()
			console.log(sys);
			this.safe_area_bottom = sys.safeAreaInsets.bottom
			let arr = _this.id.split('_')
			switch (arr[0]) {
				case 'user':
					_this.toIdentity = 1
					break;
				case 'qy':
					_this.toIdentity = 2
					break;
				case 'kf':
					_this.toIdentity = 3
					break;
				default:
					break;
			}
			_this.uid = arr[1]
			_this.get_user_info()
			_this.initGoEasyListeners();
			// 语音播放器
			this.initAudioPlayer();
			// 录音监听器
			this.initRecorderListeners();

		},
		onReady() {
			this.loadHistoryMessage();
			if (_this.title) {
				uni.setNavigationBarTitle({
					title: _this.title
				})
			}
		},
		onUnload() {
			//退出聊天页面之前，清空监听器
			GoEasy.im.off(GoEasy.IM_EVENT.PRIVATE_MESSAGE_RECEIVED, this.onMessageReceived);
			GoEasy.im.off(GoEasy.IM_EVENT.MESSAGE_DELETED, this.onMessageDeleted);
		},
		methods: {
			formatDate,
			is_self(item) {
				let senderId = item.senderId
				// let arr = senderId.split('_')
				return this.get_prefix() + this.user_id == senderId
				// let senderId = item.senderId
				// let arr = senderId.split('_')
				// return this.user_id == arr[1]
			},
			getFileType(item) {
				let name = item.payload.name
				let arr = name.split('.')
				return arr[arr.length - 1]
			},
			formatFileSize(item) {
				let limit = item.payload.size
				if (!limit || Number(limit) == 0) {
					return '0B';
				}
				// 将size B转换成 M
				var size = ''
				if (limit < 1 * 1024) {
					//小于1KB，则转化成B
					size = limit.toFixed(2) + 'B'
				} else if (limit < 1 * 1024 * 1024) {
					//小于1MB，则转化成KB
					size = (limit / 1024).toFixed(2) + 'KB'
				} else if (limit < 1 * 1024 * 1024 * 1024) {
					//小于1GB，则转化成MB
					size = (limit / (1024 * 1024)).toFixed(2) + 'MB'
				} else {
					//其他转化成GB
					size = (limit / (1024 * 1024 * 1024)).toFixed(2) + 'GB'
				}

				var sizeStr = size + '' //转成字符串
				var index = sizeStr.indexOf('.') //获取小数点处的索引
				var dou = sizeStr.substr(index + 1, 2) //获取小数点后两位的值
				if (dou == '00') {
					//判断后两位是否为00，如果是则删除00
					return sizeStr.substring(0, index) + sizeStr.substr(index + 3, 2)
				}
				return size
			},
			//像微信那样显示时间，如果有几分钟没发消息了，才显示时间
			//todo:本不需要该方法，可以在标签里完成，但小程序有兼容性问题，被迫这样实现
			renderMessageDate(message, index) {
				if (index === 0) {
					return true
					// return formatDate(message.timestamp)
				} else {
					if (message.timestamp - this.lists[index - 1].timestamp > 5 * 60 * 1000) {
						return true
						// return formatDate(message.timestamp)
					}
				}
				return false;
			},
			changeOpen() {
				_this.open_bot = !_this.open_bot
			},
			//获取用户信息
			async get_user_info() {
				if (_this.uid > 0) {
					let params = {
						uid: _this.uid
					}
					const data = await _this.$post('port/user_info', params)
					if (data.code == 200) {
						let {
							user,
							resume
						} = data.result
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
								identity: _this.toIdentity,
							}
						}
						_this.df_user = user
						_this.df_resume = resume
						if (_this.init == 1) {
							_this.create_init_msg()
						}
						console.log(user, _this.to);
					} else {
						this.$u.toast(data.msg)
					}
				}
			},
			//点击了头像
			clickHead() {
				if (this.identity == 3 || this.toIdentity == 3) {
					return
				}
				if (this.identity == 2 && this.df_resume && this.df_resume.status == 3) {
					_this.toNext(`/pages/talents/detail?id=${this.df_resume.id}`)
				} else if (this.identity == 1) {
					_this.toNext(`/my/item-list?uid=${this.df_user.user_id}`)
				}
			},
			//您好，我对这个岗位很有兴趣，方便聊聊吗？/ 您好，我对您的简历很感兴趣，方便进一步沟通下吗？
			create_init_msg() {
				let msg = ''
				switch (_this.toIdentity) {
					case 1:
						msg = '您好，我对您的简历很感兴趣，方便进一步沟通下吗？'
						break;
					case 2:
						msg = '我对这个岗位很有兴趣，方便聊聊吗？'
						break;
					case 3:
						msg = ''
						break;
					default:
						break;
				}
				if (msg) {
					var im = GoEasy.im;
					//创建消息, 内容最长不超过3K，可以发送字符串，对象和json格式字符串
					im.createTextMessage({
						text: msg, //消息内容
						to: _this.to,
						onSuccess(message) {
							console.log(message);
							_this.sendMessage(message);
						},
						onFailed(e) {
							console.log('error :', e);
						}
					});
				}
			},
			getMore() {
				console.log('getMore');
				_this.loadHistoryMessage()
			},
			//查询历史消息
			loadHistoryMessage() {
				let lastMessageTimeStamp = null;
				let lastMessage = this.lists[0];
				if (lastMessage) {
					lastMessageTimeStamp = lastMessage.timestamp;
				}
				console.log('lastMessageTimeStamp', lastMessageTimeStamp);
				GoEasy.im.history({
					userId: this.id,
					lastTimestamp: lastMessageTimeStamp,
					limit: 30,
					onSuccess: (result) => {
						let messages = result.content;
						if (messages.length > 0) {
							if (lastMessageTimeStamp) {
								_this.lists.unshift(...messages)
							} else {
								_this.lists = messages
							}
							_this.scroll_to_bottom()
						}
						//收到的消息设置为已读
						this.markPrivateMessageAsRead();
						console.log('获取历史消息成功:', result, _this.lists);
						return
						uni.stopPullDownRefresh();
						this.history.loading = false;
						if (messages.length === 0) {
							this.history.allLoaded = true;
						} else {
							if (lastMessageTimeStamp) {
								this.history.messages = messages.concat(this.history
									.messages);
							} else {
								this.history.messages = messages;
							}
							if (messages.length < 10) {
								this.history.allLoaded = true;
							}
							if (scrollToBottom) {
								this.scrollToBottom();
								//收到的消息设置为已读
								this.markPrivateMessageAsRead();
							}
						}
					},
					onFailed: (error) => {
						//获取失败
						console.log('获取历史消息失败:', error);
						// uni.stopPullDownRefresh();
						// this.history.loading = false;
					}
				})
			},
			confirmMsg() {
				if (this.msg == '') {
					this.$u.toast('请输入发送消息')
					return
				}
				var im = GoEasy.im;
				//创建消息, 内容最长不超过3K，可以发送字符串，对象和json格式字符串
				im.createTextMessage({
					text: _this.msg, //消息内容
					to: _this.to,
					onSuccess(message) {
						console.log(message);
						_this.sendMessage(message, true);
					},
					onFailed(e) {
						console.log('error :', e);
					}
				});
			},
			async confirmWeixin() {
				if (this.weixin == '' || this.weixin == null) {
					this.$u.toast('请输入微信号')
					return
				}
				let params = {
					weixin: _this.weixin
				}
				const data = await _this.$post('port/edit_user_wx', params)
				if (data.code == 200) {
					uni.$u.toast(data.msg)
					_this.current_user.weixin = _this.weixin
					if (_this.swap_type == 1) { //是点击的交换微信
						_this.send_custom_msg()
					} else { //是点击的操作同意交换微信
						let info = {
							type: 2,
							content: _this.weixin
						}
						GoEasy.im.createCustomMessage({
							type: 'agree_wx_phone', //字符串，可以任意自定义类型，比如红包'hongbao', 订单'order，处方'chufang'
							to: _this.to,
							payload: info,
							onSuccess(message) {
								if (_this.tempIndex != -1) {
									let item = _this.lists[_this.tempIndex]
									_this.deleteMessage(item, _this.tempIndex)
								}
								_this.sendMessage(message, false, false);
								_this.send_extra_msg(2)
							},
							onFailed(e) {
								console.log('error :', e);
							}
						});
					}
					_this.weixin = ''
					_this.show_wx = false
				} else {
					uni.$u.toast(data.msg)
				}
			},
			//发送图片消息
			send_image_msg() {
				uni.chooseImage({
					count: 1,
					success(res) {
						let tempFile = res.tempFiles[0]
						GoEasy.im.createImageMessage({
							to: _this.to,
							file: tempFile,
							onProgress(progress) {
								console.log(progress)
							},
							onSuccess(message) {
								console.log('创建图片消息成功:', message);
								_this.sendMessage(message);
							},
							onFailed(e) {
								console.log('error :', e);
							}
						});
					},
					fail(fail) {
						console.log(fail);
					}
				})
			},
			//发送自定义消息
			send_custom_msg(type = 'swap_wx') {
				if (type == 'swap_wx') {
					if (_this.current_user.weixin == '' || _this.current_user.weixin == null) {
						_this.swap_type = 1
						_this.show_wx = true
						_this.tempIndex = -1
						return
					}
				}
				let info = {
					status: -1
				}
				GoEasy.im.createCustomMessage({
					type: type, //字符串，可以任意自定义类型，比如红包'hongbao', 订单'order，处方'chufang'
					to: _this.to,
					payload: info,
					onSuccess(message) {
						console.log('创建自定义消息成功:', message);
						_this.sendMessage(message);
					},
					onFailed(e) {
						console.log('error :', e);
					}
				});
			},
			sendMessage(message, is_text = false, scroll_bottom = true) {
				_this.lists.push(message)
				if (scroll_bottom) {
					_this.scroll_to_bottom()
				}
				var im = GoEasy.im;
				// 发送消息
				im.sendMessage({
					message: message,
					onSuccess(message1) { //发送成功
						console.log("Private message sent successfully.", message1);
						// 给收信人发订阅消息
						// const match = _this.to.id.match(/\d+/); 		// 匹配数字
						// const receiver_id = match ? match[0] : null; 
						// let data = {
						// 	"my_id": _this.user_id,
						// 	"receiver_id": receiver_id,
						// }
						// fetch_data("POST", "send_notification", data, "user", res => {
						// 	if (res.data.status === 200) {
						// 		console.log("微信通知发送成功");
						// 	} else {
						// 		console.log("微信通知发送失败", res.data);
						// 	}
						// })

						const ONE_HOUR = 3600 * 1000; // 1 小时的毫秒数
						const now = Date.now();
						const last_execution_time = wx.getStorageSync('last_execution_time') || 0;
						// 检查是否超过 1 小时
						if (now - last_execution_time >= ONE_HOUR) {
							// 更新本地存储时间戳
							wx.setStorageSync('last_execution_time', now);
							const match = _this.to.id.match(/\d+/); // 匹配数字
							const receiver_id = match ? match[0] : null;
							let data = {
								my_id: _this.user_id,
								receiver_id: receiver_id,
							};
							fetch_data("POST", "send_notification", data, "user", (res) => {
								if (res.data.status === 200) {
									console.log("微信通知发送成功");
								} else {
									console.log("微信通知发送失败", res.data);
								}
							});
						} else {
							console.log("已在 1 小时内给此人发送过，跳过此次执行");
						}

						if (is_text) {
							_this.msg = ''
						}
					},
					onFailed(error) { //发送失败
						console.log('Failed to send private message，code:' + error.code +
							' ,error ' + error
							.content);
					}
				});
			},
			initGoEasyListeners() {
				// 监听私聊消息
				GoEasy.im.on(GoEasy.IM_EVENT.PRIVATE_MESSAGE_RECEIVED, this.onMessageReceived);
				//监听消息删除
				GoEasy.im.on(GoEasy.IM_EVENT.MESSAGE_DELETED, this.onMessageDeleted);
			},
			onMessageReceived(message) {
				console.log('监听到私聊消息：', message);
				let senderId = message.senderId;
				let receiverId = message.receiverId;
				if (this.get_prefix() + this.user_id == receiverId && senderId == this.id) {
					_this.lists.push(message)
					//聊天时，收到消息标记为已读
					_this.markPrivateMessageAsRead();
					_this.scroll_to_bottom()
				}
				return
				let friendId = this.currentUser.id === senderId ? receiverId : senderId;
				if (friendId === this.friend.id) {
					this.history.messages.push(message);
					//聊天时，收到消息标记为已读
					this.markPrivateMessageAsRead();
					//收到新消息，是滚动到最底部
					this.scrollToBottom();
				}
			},
			onMessageDeleted(deletedMessages) {
				console.log('监听到私聊消息删除：', deletedMessages);
				return
				deletedMessages.forEach(message => {
					let senderId = message.senderId;
					let receiverId = message.receiverId;
					let friendId = this.currentUser.id === senderId ? receiverId : senderId;
					if (friendId === this.friend.id) {
						let index = this.history.messages.indexOf(message);
						if (index > -1) {
							this.history.messages.splice(index, 1);
						}
					}
				});
			},
			markPrivateMessageAsRead() {
				GoEasy.im.markMessageAsRead({
					// id: this.to.id,
					// type: this.to.type,
					id: _this.id,
					type: GoEasy.IM_SCENE.PRIVATE,
					onSuccess() {
						console.log('标记私聊已读成功');
					},
					onFailed(error) {
						console.log("标记私聊已读失败", error);
					}
				});
			},
			scroll_to_bottom() {
				// _this.scroll_id = _this.lists[_this.lists.length - 1]['messageId']
				this.$nextTick(() => {
					let query = uni.createSelectorQuery()
					query.select('#scroll').boundingClientRect()
					query.select('#scroll-container').boundingClientRect()
					query.exec(res => {
						let scrollViewHeight = res[0].height
						let scrollContentHeight = res[1].height
						if (scrollContentHeight > scrollViewHeight) {
							let scroll_top = scrollContentHeight - scrollViewHeight
							_this.scrollTop = scroll_top
						}
					})
				})
				// console.log(this.scroll_id);
			},
			//拒绝交换电话/微信
			refuse(type, item, index) {
				let content = '确定拒绝交换电话?'
				if (type == 2) {
					content = '确定拒绝交换微信?'
				}
				uni.showModal({
					title: '操作提示',
					content,
					success(res) {
						if (res.confirm) {
							let info = {
								type
							}
							GoEasy.im.createCustomMessage({
								type: 'refuse_wx_phone', //字符串，可以任意自定义类型，比如红包'hongbao', 订单'order，处方'chufang'
								to: _this.to,
								payload: info,
								onSuccess(message) {
									_this.deleteMessage(item, index)
									_this.sendMessage(message, false, false);
								},
								onFailed(e) {
									console.log('error :', e);
								}
							});
						} else {
							console.log('点击了取消');
						}
					}
				})
			},
			//删除消息
			deleteMessage(message, index) {
				GoEasy.im.deleteMessage({
					messages: [message], //必须为数组格式，要删除的消息
					onSuccess() { //消息删除成功
						console.log("Messages delete successfully.");
						_this.lists.splice(index, 1)
					},
					onFailed(error) { //消息删除失败
						console.log("Failed to delete message, code:" + error.code + " content:" +
							error.content);
					}
				});
			},
			//同意交换电话/微信
			agree(type, item, index) {
				let content = '确定同意交换电话?'
				if (type == 2) {
					content = '确定同意交换微信?'
				}
				uni.showModal({
					title: '操作提示',
					content,
					success(res) {
						if (res.confirm) {
							if (type == 2) {
								if (_this.current_user.weixin == '' || _this.current_user
									.weixin == null) {
									_this.swap_type = 2
									_this.show_wx = true
									_this.tempIndex = index
									return
								}
							}
							let info = {
								type,
							}
							if (type == 1) {
								info.content = _this.current_user.mobile
							} else {
								info.content = _this.current_user.weixin
							}
							GoEasy.im.createCustomMessage({
								type: 'agree_wx_phone', //字符串，可以任意自定义类型，比如红包'hongbao', 订单'order，处方'chufang'
								to: _this.to,
								payload: info,
								onSuccess(message) {
									_this.deleteMessage(item, index)
									_this.sendMessage(message, false, false);
									_this.send_extra_msg(type)
								},
								onFailed(e) {
									console.log('error :', e);
								}
							});
						} else {
							console.log('点击了取消');
						}
					}
				})
			},
			//同意交换微信号在发一条额外信息给对方
			async send_extra_msg(type) {
				let params = {
					uid: _this.uid
				}
				const data = await _this.$post('port/user_info', params)
				if (data.code == 200) {
					let {
						user
					} = data.result
					let info = {
						type,
					}
					if (type == 1) {
						info.content = user.mobile
						// info.df_content = _this.df_user.mobile
					} else {
						info.content = user.weixin
						// info.df_content = _this.df_user.weixin
					}
					GoEasy.im.createCustomMessage({
						type: 'consent_wx_phone', //字符串，可以任意自定义类型，比如红包'hongbao', 订单'order，处方'chufang'
						to: _this.to,
						payload: info,
						onSuccess(message) {
							_this.sendMessage(message, false, true);
						},
						onFailed(e) {
							console.log('error :', e);
						}
					});
				} else {

				}
			},
			copy(item) {
				let content = item.payload.content
				uni.setClipboardData({
					data: content,
					success() {
						_this.$u.toast(`复制成功`)
					},
					fail(fail) {
						console.log('复制失败:', fail);
					}
				})
			},
			chooseMessageFile() {
				// #ifndef MP-WEIXIN
				_this.$u.toast('只允许在微信小程序中使用该功能')
				return
				// #endif
				uni.chooseMessageFile({
					count: 1,
					type: 'file',
					extension: ['pdf', 'doc', 'docx'],
					success(res) {
						let tempFile = res.tempFiles[0]
						let size = tempFile.size
						if (size > 8 * 1024 * 1024) {
							_this.$u.toast('最多可发送8M文件')
							return
						}
						GoEasy.im.createFileMessage({
							to: _this.to,
							file: tempFile,
							onProgress(progress) {
								console.log('上传进度:', progress)
							},
							onSuccess(message) {
								console.log('创建文件消息成功:', message);
								_this.sendMessage(message);
							},
							onFailed(e) {
								console.log('error :', e);
							}
						});
					},
					fail(fail) {
						console.log('选择微信文件失败', fail);
					}
				})
			},
			openFile(item) {
				// #ifdef H5
				_this.$u.toast('H5不支持此功能')
				return
				// #endif
				let url = encodeURI(item.payload.url)
				uni.downloadFile({
					url: url,
					success(res) {
						var filePath = res.tempFilePath;
						uni.openDocument({
							filePath: filePath,
							// fileType:_this.getFileType(item),
							showMenu: true,
							success(res1) {
								console.log('打开文档成功');
							},
							fail(fail) {
								console.log('打开文档失败', fail);
							}
						});
					},
					fail(fail) {
						console.log('下载文件失败', fail);
					}
				});
			},
			initRecorderListeners() {
				recorderManager.onRecordComplete((file, duration) => {
					if (duration < 1000) {
						_this.$u.toast('录音时间太短')
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
						onProgress(progress) {
							console.log(progress)
						},
						onSuccess(message) {
							console.log('创建语音消息成功:', message);
							_this.sendMessage(message);
						},
						onFailed(e) {
							console.log('error :', e);
						}
					});
				});
			},
			onRecordStart() {
				uni.getSetting({
					success(res) {
						if (res.authSetting['scope.record']) {
							console.log('有录音权限');
							recorderManager.start();
						} else {
							uni.authorize({
								scope: 'scope.record',
								success(res1) {
									// recorderManager.start();
									console.log('授权录音权限成功', res1);
								},
								fail(fail) {
									console.log('授权录音权限失败', fail);
								}
							})
							//判断录音是否是开启状态false没开启就跳转到开启页面
							if (res.authSetting['scope.record'] == false) {
								uni.openSetting({
									success(res) {
										console.log(res.authSetting)
									}
								});
							}
						}
					}
				})
			},
			onRecordEnd() {
				uni.getSetting({
					success(res) {
						if (res.authSetting['scope.record']) {
							recorderManager.stop();
						}
					}
				})
			},
			initAudioPlayer() {
				this.audioPlayer.innerAudioContext = uni.createInnerAudioContext();
				this.audioPlayer.innerAudioContext.onEnded(() => {
					this.audioPlayer.playingMessage = null;
				});
				this.audioPlayer.innerAudioContext.onStop(() => {
					this.audioPlayer.playingMessage = null;
				});
			},
			playAudio(audioMessage) {
				console.log('播放语音', audioMessage);
				let playingMessage = this.audioPlayer.playingMessage;

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
			previewImage(item) {
				uni.previewImage({
					urls: [item.payload.url]
				})
			},
			confirm_coopration() {
				console.log("确认合作");
			},
			grade_coopration() {
				console.log("合作打分");
			},
			sign_contrast() {
				console.log("签署合同");
			},
			manage_asset() {
				console.log("资金代管");
			},
		}
	}
</script>

<style lang="scss" scoped>
	// @import "static/css/chatInterface.scss";
	.container {
		height: 100%;

		.info-contianer {
			height: 100%;
			overflow: hidden;
			@include flex-box(column);

			.scroll {
				flex: 1;
				overflow: hidden;

				.items {
					padding: 0 20rpx;

					.item {
						@include flex-box();
						padding: 20rpx 0;

						&.item-time {
							justify-content: center;
							align-items: center;
							padding: 0;

							text {
								padding: 20rpx 0;
								font-size: 26rpx;

								&.text-b8 {
									color: #888;
								}

								&.grey-text {
									color: #747475;
								}
							}
						}

						&.item-swap {
							.left-img {
								align-self: flex-end;
							}

							.center-info {
								background: linear-gradient(0deg, #ffffff 0%, #ecf9e7 100%);
								padding: 35rpx 22rpx 28rpx 22rpx;
								border-radius: 20rpx;
								border: 2rpx solid #b7e6a2;
								box-sizing: border-box;

								.center-top {
									@include flex-box();

									.top-icon {
										width: 74rpx;
										margin-right: 20rpx;
									}

									.top-text {
										align-self: center;
										color: #1A1B1B;
										font-size: 26rpx;
									}
								}

								.center-bot-button {
									display: grid;
									grid-template-columns: repeat(2, 1fr);
									grid-gap: 0 23rpx;
									margin-top: 35rpx;

									&.one-button {
										grid-template-columns: repeat(1, 1fr);
									}

									button {
										line-height: 66rpx;
										background: #F3F3F3;
										font-size: 28rpx;
										border-radius: 10rpx;
										color: #575757;

										&.agree-btn {
											background: #EBF8E6;
										}
									}
								}
							}
						}

						&.item-swap-phone {
							.center-info {
								background: linear-gradient(0deg, #ffffff 0%, #ebf8ff 100%);
								border-color: #a6d2ff;
							}
						}

						&.item-wx-phone {
							.left-img {
								align-self: flex-end;
							}

							.center-phone {
								background: #fff;
								border-radius: 20rpx;
								width: 76%;

								.center-top {
									@include flex-box();
									padding: 36rpx 0 36rpx 22rpx;
									border-bottom: $global-border;

									.top-icon {
										width: 74rpx;
										margin-right: 20rpx;
									}

									.right {
										view {
											color: #1A1B1B;
											font-size: 26rpx;
										}
									}
								}

								.center-bot-text {
									text-align: center;
									color: #02AAAB;
									line-height: 95rpx;
								}
							}
						}

						&.item-file {
							.left-img {
								align-self: flex-end;
							}

							.center-file {
								background: #fff;
								border-radius: 20rpx;
								width: 76%;
								@include flex-box();
								padding: 30rpx 0 30rpx 22rpx;

								.top-icon {
									width: 74rpx;
									margin-right: 20rpx;
								}

								.right {
									view {
										color: #1A1B1B;
										font-size: 26rpx;

										&.info-text {
											color: #B8B8B8;
											font-size: 24rpx;
											margin-top: 10rpx;
										}
									}
								}
							}
						}

						&.item-audio {
							.left-img {
								align-self: flex-end;
							}

							.audio-file {
								background: #fff;
								border-radius: 20rpx;
								width: 45%;
								@include flex-box();
								box-sizing: border-box;
								padding: 20rpx 20rpx;

								.audio-icon {
									width: 40rpx;
								}
							}

							.audio-text {
								margin-left: 16rpx;
								color: #747475;
								align-self: center;
							}
						}

						&.item-image {
							.center-image {
								image {
									width: 200rpx;
									border-radius: 10rpx;
								}
							}
						}

						&.item-right {
							justify-content: flex-end;

							.left-img {
								order: 3;
								margin-right: 0;
							}

							.center-text {
								margin-right: 16rpx;
								background: #02AAAB;
								border-radius: 24rpx 24rpx 0 24rpx;

								text {
									color: #fff;
								}
							}

							.center-info {
								margin-right: 16rpx;

								.center-bot-button {
									button {
										&.agree-btn {
											background: #F3F3F3;
										}
									}
								}
							}

							.center-phone {
								margin-right: 16rpx;
							}

							.center-image {
								margin-right: 16rpx;
							}

							.center-file {
								margin-right: 16rpx;
							}

							.audio-file {
								margin-right: 16rpx;
								justify-content: flex-end;
								background: #02AAAB;
								order: 2;
							}

							.audio-text {
								order: 1;
								margin-left: 0;
								margin-right: 16rpx;
							}
						}

						.left-img {
							width: 60rpx;
							height: 60rpx;
							flex-shrink: 0;
							border-radius: 50%;
							margin-right: 16rpx;
						}

						.center-text {
							align-self: center;
							background: #fff;
							border-radius: 24rpx 24rpx 24rpx 0;
							padding: 22rpx 24rpx;

							text {
								color: #000;
							}
						}
					}
				}
			}

			.chat-bot {
				background: #fff;
				flex-shrink: 0;

				.chat-bot-top {
					@include flex-box(row, null, center);
					height: 100rpx;
					padding: 0 25rpx;
					box-sizing: border-box;

					&.border {
						border-bottom: $global-border;
					}

					.left {
						flex: 1;
						margin-right: 20rpx;
					}

					.right {
						.right-icon {
							width: 52rpx;

							&:not(:last-child) {
								margin-right: 24rpx;
							}
						}
					}
				}

				.chat-bot-bottom {
					display: grid;
					grid-template-columns: repeat(4, 1fr);
					height: 500rpx;
					padding-top: 44rpx;
					box-sizing: border-box;

					.bot-item {
						text-align: center;

						.item-img {
							width: 100rpx;
						}

						.item-text {
							font-size: 26rpx;
						}
					}
				}
			}
		}

		.record-loading {
			position: fixed;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			@include flex-box(row, center, center);

			image {
				width: 40%;
			}
		}

		.weixin-popup {
			background: #fff;
			padding: 40rpx 60rpx;
			border-radius: 16rpx;

			.weixin-input {
				border: 2rpx solid #02AAAB;
				height: 60rpx;
				@include flex-box(row, null, center);
				border-radius: 10rpx;
				padding: 0 10rpx;
			}

			.weixin-info {
				color: #B0B0B0;
				font-size: 24rpx;
				margin-top: 20rpx;
				text-align: center;
			}

			.weixin-bot {
				margin-top: 30rpx;

				.confirm-btn {
					line-height: 60rpx;
					font-size: 26rpx;
					background: #02AAAB;
					border-radius: 10rpx;
					color: #fff;
				}
			}
		}
	}
</style>