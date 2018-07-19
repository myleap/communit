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

    cw.selectJoin = function (params, callback) {
        var that = this;
        that.params.info = "";
        var data = {};
        data = params;
        if (!data.uid)
            that.params.info = "[uid]为空！\n";
        if (!$utils.isNullOrEmpty(that.params.info) && $.isFunction(callback)) {
            callback(null, that.params);
            return;
        }
        $ajaxutil.dopost("Group/selectJoin", data, callback);
    };
    cw.passJoin = function (params, callback) {
        var that = this;
        that.params.info = "";
        var data = {};
        data = params;
        if (!data.uid)
            that.params.info = "[uid]为空！\n";
        if (!$utils.isNullOrEmpty(that.params.info) && $.isFunction(callback)) {
            callback(null, that.params);
            return;
        }
        $ajaxutil.dopost("Group/add_join", data, callback);
    };
    window.$groupsetting = cw;
})(window);