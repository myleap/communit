;
!function (win) {
    "use strict";
    var $$mobileRes = {
        mobile: [{
                "resCode": "201",
                "resMsg": "参数不全"
            }, {
                "resCode": "301",
                "resMsg": "登录授权失败或已过期,accesstoken过期或者错误"
            }, {
                "resCode": "302",
                "resMsg": "用户不存在或被管理员禁用"
            }, {
                "resCode": "303",
                "resMsg": "密码错误"
            }, {
                "resCode": "304",
                "resMsg": "手机号用户已存在"
            }, {
                "resCode": "306",
                "resMsg": "亲，您已关注过啦！"
            }, {
                "resCode": "401",
                "resMsg": "数据库错误"
            }, {
                "resCode": "501",
                "resMsg": "数据不存在"
            }, {
                "resCode": "601",
                "resMsg": "验证码错误或者已过期"
            }, {
                "resCode": "602",
                "resMsg": "发送验证码失败或号码格式不对"

            }, {//阿里云播放器错误码
                "resCode": "66-511",
                "resMsg": "加载超时"
            }, {
                "resCode": "66-501",
                "resMsg": "未知错误"
            }, {
                "resCode": "66-502",
                "resMsg": "没有输入文件"
            }, {
                "resCode": "66-511",
                "resMsg": "加载超时"
            }, {
                "resCode": "66-503",
                "resMsg": "no surface"
            }, {
                "resCode": "66-504",
                "resMsg": "视频资源或者网络不可用"
            }, {
                "resCode": "66-505",
                "resMsg": "不支持此编码"
            }, {
                "resCode": "66-506",
                "resMsg": "没有足够内存"
            }, {
                "resCode": "66-401",
                "resMsg": "网络视频播放错误，没有网络或者网络状态不好的情况下播放网络视频会出现该错误"
            }, {
                "resCode": "66-402",
                "resMsg": "没有优先级"
            }, {
                "resCode": "66-400",
                "resMsg": "非法请求"
            }, {
                "resCode": "66-509",
                "resMsg": "未认证"
            }, {
                "resCode": "66-510",
                "resMsg": "资源访问失败"
            }
        ],

        getResultMsg: function (resCode) {
            if (resCode == null) {
                return null;
            }
            //H.log("getResultMsg-1:"+resCode);
            for (var i = 0; i < this.mobile.length; i++) {
                // 	H.log("getResultMsg-2:"+this.mobile[i].resCode);
                if (resCode == this.mobile[i].resCode) {
                    return this.mobile[i].resMsg;
                    break;
                }
            }
            return null;
        }
    };
    window.$errorResult = $$mobileRes;
}(window);
(function (window) {
    var u = {};
    u.post = function (moduleName, data, callback) {
        var serviceUrl = window.localStorage.getItem("serviceUrl") ? window.localStorage.getItem("serviceUrl") : "https://www.myleap.cn";
        var trandNo = this.getRandom(99, 10);
        moduleName = H.trim(moduleName);
        var ajaxUrl = serviceUrl + "/community/public/index.php/main/" + moduleName;
        console.log("post(" + trandNo + ")-url-" + ajaxUrl + "-" + JSON.stringify(data));
//        var timeoutProcess = setTimeout(function () {
//            timeoutProcess = null;
//            H.toastLoading();
//        }, 3000);
        $.ajax({
            url: ajaxUrl,
            method: 'post',
            dataType: "json",
            headers: {
            },
            data: data,
            success: function (data) {
                console.log("post(" + trandNo + ") 返回== " + data);
                callback(data, null);
            },
            error: function (err) {
                u.sysErrProc(err, callback);
                console.log("err" + JSON.stringify(err));
            }

        });
    }
    u.dopost = function (moduleName, data, callback) {
        var serviceUrl = window.localStorage.getItem("serviceUrl");
        var trandNo = this.getRandom(99, 10);
        moduleName = H.trim(moduleName);
        var ajaxUrl = "https://www.myleap.cn/communityCMFX/index.php/Portal/" + moduleName;
        console.log("post(" + trandNo + ")-url-" + ajaxUrl + "-" + JSON.stringify(data));
        $.ajax({
            url: ajaxUrl,
            method: 'post',
            dataType: "json",
            headers: {
            },
            data: data,
            success: function (data) {
                console.log("post(" + trandNo + ") 返回== " + JSON.stringify(data));
                callback(data, null);
            },
            error: function (err) {
                u.sysErrProc(err, callback);
                console.log("err" + JSON.stringify(err));
            }

        });
    }
    u.getRandom = function (max, min) {
        return parseInt(Math.random() * (max - min + 1) + min, 10);
    }
    u.postfile = function (moduleName, formData, callback) {
        var serviceUrl = window.localStorage.getItem("serviceUrl") ? window.localStorage.getItem("serviceUrl") : "https://www.myleap.cn";
        var trandNo = this.getRandom(99, 10);
        moduleName = H.trim(moduleName);
        var ajaxUrl = serviceUrl + "/community/public/index.php/main/" + moduleName;

        console.log("postfile(" + trandNo + ")-url-" + ajaxUrl + "-" + JSON.stringify(formData));

//        var timeoutProcess = setTimeout(function () {
//            timeoutProcess = null;
//            H.toastLoading();
//        }, 3000);

        $.ajax({
            type: 'POST',
            url: ajaxUrl,
            data: formData,
            processData: false,
            contentType: false,
            success: function (data) {
//            if (timeoutProcess)
//                clearTimeout(timeoutProcess);
//            else {
//                H.closeToast();
//            }
                console.log("postfile(" + trandNo + ") 返回== " + data);
                callback(data, null);
            },
            error: function (err) {
                u.sysErrProc(err, callback);
                console.log("err" + JSON.stringify(err));
            }
        });
    }

    u.get = function (moduleName, data, callback) {
        var serviceUrl = H.getStorage("serviceUrl");
        var trandNo = H.GetRandom(10, 99);
        moduleName = H.trim(moduleName);
        var ajaxUrl = serviceUrl + "/community/public/index.php/main/" + moduleName;

        var timeoutProcess = setTimeout(function () {
            timeoutProcess = null;
            H.toastLoading();
        }, 3000);

        H.log("get(" + trandNo + ")-url-" + ajaxUrl + "-" + JSON.stringify(data));

        $.ajax({
            url: ajaxUrl,
            method: 'get',
            //dataType : "json",
            headers: {
                'Content-type': 'application/x-www-form-urlencoded;charset=UTF-8'
            },
            data: {
                //body : JSON.stringify(data)
                values: data
            }
        }, function (result, err) {

            if (timeoutProcess)
                clearTimeout(timeoutProcess);
            else {
                H.closeToast();
            }

            H.log("get(" + trandNo + ") 返回== " + JSON.stringify(result) + "-1-" + JSON.stringify(err));

            if (result) {

                if (result.resCode == "200") {
                    callback(result.object, null);
                } else {
                    u.retErrProc(result, callback, moduleName);
                }

            } else {
                u.sysErrProc(err, callback);
            }
        });
    }

    u.getUrl = function (ajaxUrl, callback) {
        var trandNo = H.GetRandom(10, 99);
        ajaxUrl = H.trim(ajaxUrl);

        var timeoutProcess = setTimeout(function () {
            timeoutProcess = null;
            H.toastLoading();
        }, 3000);

        H.log("get(" + trandNo + ")-url-" + ajaxUrl);

        $.ajax({
            url: ajaxUrl,
            method: 'get',
            //dataType : "json",		
            //headers : {
            //	'Content-type' : 'application/x-www-form-urlencoded;charset=UTF-8'
            //}
        }, function (result, err) {

            if (timeoutProcess)
                clearTimeout(timeoutProcess);
            else {
                H.closeToast();
            }

            H.log("get(" + trandNo + ") 返回== " + JSON.stringify(result) + "-1-" + JSON.stringify(err));

            if (result) {

                if (result.resCode == "200") {

                    callback(result.object, null);
                } else {
                    u.retErrProc(result, callback, moduleName);
                }

            } else {
                u.sysErrProc(err, callback);
            }
        });
    }

    u.retErrProc = function (result, callback, moduleName) {

        var resMes = $errorResult.getResultMsg(result.resCode);

        if (resMes == null || resMes == 'undefine') {
            if (result && result.resCode && result.info) {
                resMes = result.info;
            } else
                resMes = "加载失败，请检查王网络状态后重试哟！[" + result.info + "]";
        }

        H.toast(function () {
        }, resMes, 1000, 'middle');

        if (result.resCode == "301") {
            H.rmStorage("mplus_usrinfo");
        }

        if (callback && typeof callback == "function")
            callback(null, result);
    }

    u.sysErrProc = function (err, callback) {
        switch (err.code) {
            case 	0 :
                //连接错误
                if (err.statusCode && err.statusCode == 500)
                    alert("服务器未到达，请检查网络状态后重试哟！");
                else
                    alert("加载失败，请检查网络状态后重试哟！");
                break;
            case	1 :
                //超时
                alert("请求超时...");
                break;
        }
        if (callback && typeof callback == "function")
            callback(null, err);
    }

    window.$ajaxutil = u;

})(window);
