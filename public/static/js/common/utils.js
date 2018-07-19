/*
 * APICloud JavaScript Library
 * Copyright (c) 2014 apicloud.com
 */
(function (window) {
    var u = {};
    u.enterListener = function (callback) {
        document.onkeydown = function (event) {
            var e = event || window.event;
            if (e && e.keyCode == 13) { // enter 键
                callback(event);
            }
        };
    };
    u.isNullOrEmpty = function (o) {
        if (o !== null && o !== undefined && o !== '') {
            return false;
        }
        return true;
    };
    // 获取当前时间
    u.getNowFormatDate = function () {
        var date = new Date();
        var seperator1 = "-";
        var seperator2 = ":";
        var month = date.getMonth() + 1;
        var strDate = date.getDate();
        if (month >= 1 && month <= 9) {
            month = "0" + month;
        }
        if (strDate >= 0 && strDate <= 9) {
            strDate = "0" + strDate;
        }
        var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
                + " " + date.getHours() + seperator2 + date.getMinutes()
                + seperator2 + date.getSeconds();
        return currentdate;
    }
    // 时间戳转日期
    u.formatDate = function (now) {
        var year = now.getYear();
        var month = now.getMonth() + 1;
        var date = now.getDate();
        var hour = now.getHours();
        var minute = now.getMinutes();
        var second = now.getSeconds();
        return "20" + year + "-" + month + "-" + date + " " + hour + ":" + minute + ":" + second;
    }
    window.$utils = u;
})(window);