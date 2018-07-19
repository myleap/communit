/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
(function (window) {
    var cw = {params: {
            resCode: 201,
            info: ""
        }};

    cw.sendsVerify = function (params, callback) {
        var that = this;
        that.params.info = "";
        var data = {};
        data = params;
        if (!data.mobile)
            that.params.info = "[mobile]为空！\n";
        if (!$utils.isNullOrEmpty(that.params.info) && $.isFunction(callback)) {
            callback(null, that.params);
            return;
        }
        $ajaxutil.dopost("MobileVerify/sendRegiest", data, callback);
    };
//    cw.checkVerify = function (params, callback) {
//        var that = this;
//        that.params.info = "";
//        var data = {};
//        data = params;
//        if (!data.mobile)
//            that.params.info = "[mobile]为空！\n";
//        if (!data.code)
//            that.params.info = "[code]为空！\n";
//        if (!$utils.isNullOrEmpty(that.params.info) && $.isFunction(callback)) {
//            callback(null, that.params);
//            return;
//        }
//        $ajaxutil.dopost("MobileVerify/checkVerify", data, callback);
//    };
    cw.certification = function (params, callback) {
        var that = this;
        that.params.info = "";
        var data = {};
        data = params;
        if (!data.code)
            that.params.info = "[code]为空！\n";
        if (!$utils.isNullOrEmpty(that.params.info) && $.isFunction(callback)) {
            callback(null, that.params);
            return;
        }
        $ajaxutil.dopost("MobileVerify/certification", data, callback);
    };
    window.$usercenter = cw;
})(window);