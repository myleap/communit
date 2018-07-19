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
    //
    cw.selectGroup = function (params, callback) {
        var that = this;
        that.params.info = "";
        var data = {};
        data = params;

        if (!data.keyword)
            that.params.info = "[keyword]为空！\n";
        if (!$utils.isNullOrEmpty(that.params.info) && $.isFunction(callback)) {
            callback(null, that.params);
            return;
        }
        $ajaxutil.dopost("Group/selectGroup", data, callback);
    };
    cw.queryGroup = function (params, callback) {
        var that = this;
        that.params.info = "";
        var data = {};
        data = params;
        if (!$utils.isNullOrEmpty(that.params.info) && $.isFunction(callback)) {
            callback(null, that.params);
            return;
        }
        $ajaxutil.dopost("Group/getList", data, callback);
    };
    cw.joinGroup = function (params, callback) {
        var that = this;
        that.params.info = "";
        var data = {};
        data = params;
        if (!data.uid)
            that.params.info = "[uid]为空！\n";
        if (!data.group_id)
            that.params.info = "[group_id]为空！\n";
        if (!data.company_code)
            that.params.info = "[company_code]为空！\n";
        if (!$utils.isNullOrEmpty(that.params.info) && $.isFunction(callback)) {
            callback(null, that.params);
            return;
        }
        $ajaxutil.dopost("Group/joinGroup", data, callback);
    };
    cw.selectRight = function (params, callback) {
        var that = this;
        that.params.info = "";
        var data = {};
        data = params;
        if (!data.uid)
            that.params.info = "[uid]为空！\n";
        if (!data.group_id)
            that.params.info = "[group_id]为空！\n";
        if (!$utils.isNullOrEmpty(that.params.info) && $.isFunction(callback)) {
            callback(null, that.params);
            return;
        }
        $ajaxutil.dopost("Group/selectRight", data, callback);
    };
    window.$community = cw;
})(window);