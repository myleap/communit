/**
 * user.js
 * @author keysen
 * myleap Inc.
 * http://www.myleap.cn
 */

(function (window, undefined) {
    "use strict";
    var user = {
        params: {
            resCode: 201,
            info: ""
        },
        checkLogin: function (userinfo) {
            if ($utils.isNullOrEmpty(userinfo) || $utils.isNullOrEmpty(userinfo.token)) {
                console.log('checkLogin--' + JSON.stringify(userinfo));
                H.openWin("login_win", "../../main/login/login");
                return false;
            }
            return true;
        }
    };


    window.$user = user;
})(window);
