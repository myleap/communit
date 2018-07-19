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

    cw.getList = function (params, callback) {
        var that = this;
        that.params.info = "";
        var data = {};
        data = params;
        if (!data.type)
            that.params.info = "[type]为空！\n";
        if (!$utils.isNullOrEmpty(that.params.info) && $.isFunction(callback)) {
            callback(null, that.params);
            return;
        }
        $ajaxutil.dopost("Information/getList", data, callback);
    };
    cw.getNewList = function (params, callback) {
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
        $ajaxutil.dopost("Group/getNewsList", data, callback);
    };
    window.$notice = cw;
})(window);