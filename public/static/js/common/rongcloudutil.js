/*
 * APICloud JavaScript Library
 * Copyright (c) 2014 apicloud.com
 */
(function (window) {
    var u = {};
//    window.onload = RongIMLib.RongIMClient.init("bmdehs6pdb8rs");
    u.setConnectListener = function () {
        // 设置连接监听状态 （ status 标识当前连接状态 ）
        // 连接状态监听器
        RongIMClient.setConnectionStatusListener({
            onChanged: function (status) {
                switch (status) {
                    case RongIMLib.ConnectionStatus.CONNECTED:
                        console.log('链接成功');
                        break;
                    case RongIMLib.ConnectionStatus.CONNECTING:
                        console.log('正在链接');
                        break;
                    case RongIMLib.ConnectionStatus.DISCONNECTED:
                        console.log('断开连接');
                        break;
                    case RongIMLib.ConnectionStatus.KICKED_OFFLINE_BY_OTHER_CLIENT:
                        console.log('其他设备登录');
                        alert("您的登录信息已失效，请重新登录！");
                        break;
                    case RongIMLib.ConnectionStatus.DOMAIN_INCORRECT:
                        console.log('域名不正确');
                        break;
                    case RongIMLib.ConnectionStatus.NETWORK_UNAVAILABLE:
                        console.log('网络不可用');
                        break;
                }
            }});
    };

    u.setRecieveListener = function (callback) {
        // 消息监听器
        RongIMClient.setOnReceiveMessageListener({
            // 接收到的消息
            onReceived: function (message) {
                console.log("onReceived+" + JSON.stringify(message));
                callback(message);
                // 判断消息类型
                switch (message.messageType) {
                    case RongIMClient.MessageType.TextMessage:
                        // message.content.content => 消息内容
                        console.log("onReceivedTextMessage:" + JSON.stringify(message.content));
//                        callback(message);
                        break;
                    case RongIMClient.MessageType.VoiceMessage:
                        // 对声音进行预加载                
                        // message.content.content 格式为 AMR 格式的 base64 码                       
                        break;
                    case RongIMClient.MessageType.ImageMessage:
                        // message.content.content => 图片缩略图 base64。
                        // message.content.imageUri => 原图 URL。
                        console.log("onReceivedImageMessage:" + JSON.stringify(message.content));
//                        callback(message);
                        break;
                    case RongIMClient.MessageType.DiscussionNotificationMessage:
                        // message.content.extension => 讨论组中的人员。
                        break;
                    case RongIMClient.MessageType.LocationMessage:
                        // message.content.latiude => 纬度。
                        // message.content.longitude => 经度。
                        // message.content.content => 位置图片 base64。
                        break;
                    case RongIMClient.MessageType.RichContentMessage:
                        // message.content.content => 文本消息内容。
                        // message.content.imageUri => 图片 base64。
                        // message.content.url => 原图 URL。
                        break;
                    case RongIMClient.MessageType.InformationNotificationMessage:
                        // do something...
                        break;
                    case RongIMClient.MessageType.ContactNotificationMessage:
                        // do something...
                        break;
                    case RongIMClient.MessageType.ProfileNotificationMessage:
                        // do something...
                        break;
                    case RongIMClient.MessageType.CommandNotificationMessage:
                        // do something...
                        break;
                    case RongIMClient.MessageType.CommandMessage:
                        // do something...
                        break;
                    case RongIMClient.MessageType.UnknownMessage:
                        // do something...
                        break;
                    default:
                    // do something...
                }
            }
        });
    };
    u.doConnect = function (token, callback) {
        RongIMClient.connect(token, {
            onSuccess: function (userId) {
                console.log("doConnect successfully." + userId);
//                alert("doConnect successfully." + userId);
                callback(userId);
            },
            onTokenIncorrect: function () {
                console.log('token无效');
            },
            onError: function (errorCode) {
                var info = '';
                switch (errorCode) {
                    case RongIMLib.ErrorCode.TIMEOUT:
                        info = '超时';
                        break;
                    case RongIMLib.ErrorCode.UNKNOWN_ERROR:
                        info = '未知错误';
                        break;
                    case RongIMLib.ErrorCode.UNACCEPTABLE_PaROTOCOL_VERSION:
                        info = '不可接受的协议版本';
                        break;
                    case RongIMLib.ErrorCode.IDENTIFIER_REJECTED:
                        info = 'appkey不正确';
                        break;
                    case RongIMLib.ErrorCode.SERVER_UNAVAILABLE:
                        info = '服务器不可用';
                        break;
                }
                console.log(errorCode);
            }
        });
    };
    u.quitGroup = function (groupId) {
//        var groupId = "xxxx";// 群 Id 。
        RongIMClient.getInstance().quitGroup(groupId, {
            onSuccess: function () {
                // 退群成功。
                alert("退群成功:");
            },
            onError: function (error) {
                console.log("error:" + error);
            }
        });
    };
    u.joinGroup = function (groupId, groupName) {
        RongIMClient.getInstance().joinGroup(groupId, groupName, {
            onSuccess: function () {
                // 加入群成功。
                console.log('加群成功');
            },
            onError: function (error) {
                // error => 加入群失败错误码。
                console.log('加群失败' + error);
            }
        });
    };
    u.sendMsg = function (targetId, msg, callback) {
        //    var msg = new RongIMLib.TextMessage({content: chatVue.msgcontent, extra: {user: user}});
        var conversationtype = RongIMLib.ConversationType.GROUP; //群组,其他会话选择相应的消息类型即可。
        RongIMClient.getInstance().sendMessage(conversationtype, targetId, msg, {
            onSuccess: function (message) {
                //message 为发送的消息对象并且包含服务器返回的消息唯一Id和发送消息时间戳
                callback(message, null);
                console.log("RongIMClientsendsuccess");
            },
            onError: function (errorCode, message) {
                var info = '';
                switch (errorCode) {
                    case RongIMLib.ErrorCode.TIMEOUT:
                        info = '超时';
                        break;
                    case RongIMLib.ErrorCode.UNKNOWN_ERROR:
                        info = '未知错误';
                        break;
                    case RongIMLib.ErrorCode.REJECTED_BY_BLACKLIST:
                        info = '在黑名单中，无法向对方发送消息';
                        break;
                    case RongIMLib.ErrorCode.NOT_IN_DISCUSSION:
                        info = '不在讨论组中';
                        break;
                    case RongIMLib.ErrorCode.NOT_IN_GROUP:
                        info = '不在群组中';
                        break;
                    case RongIMLib.ErrorCode.NOT_IN_CHATROOM:
                        info = '不在聊天室中';
                        break;
                    default :
                        info = "x";
                        break;
                }
                console.log('发送失败:' + info);
                callback(null, message);
                alert('发送失败:' + info);
            }
        });
    };
    u.getHistoryMessages = function (targetId) {
        var conversationType = RongIMLib.ConversationType.GROUP; //群聊,其他会话选择相应的消息类型即可。
        var timestrap = null; // 默认传 null，若从头开始获取历史消息，请赋值为 0 ,timestrap = 0;
        var count = 20; // 每次获取的历史消息条数，范围 0-20 条，可以多次获取。
        RongIMLib.RongIMClient.getInstance().getHistoryMessages(conversationType, targetId, timestrap, count, {
            onSuccess: function (list, hasMsg) {
                // list => Message 数组。
                // hasMsg => 是否还有历史消息可以获取。
                alert(hasMsg + "LIST" + JSON.stringify(list.length));
            },
            onError: function (error) {
                console.log("GetHistoryMessages,errorcode:" + error);
            }
        });
    };
    window.$rongCloud = u;
})(window);