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
    //上传的图片，服务器URL，回调
    cw.uploadFile = function (formData, callback) {
        $ajaxutil.postfile("upload/upload", formData, callback);
    };
    cw.saveFile = function (params, callback) {
        var that = this;
        that.params.info = "";
        var data = {};
        data = params;

        if (!data.sendid)
            that.params.info = "[sendid]为空！\n";
        if (!data.targetId)
            that.params.info = "[targetId]为空！\n";
        if (!$utils.isNullOrEmpty(that.params.info) && $.isFunction(callback)) {
            callback(null, that.params);
            return;
        }
        $ajaxutil.post("upload/save", data, callback);
    }
    cw.gethismsg = function (params, callback) {
        var that = this;
        that.params.info = "";
        var data = {};
        data = params;


        if (!$utils.isNullOrEmpty(that.params.info) && $.isFunction(callback)) {
            callback(null, that.params);
            return;
        }
        $ajaxutil.post("chatbox/getHismsg", data, callback);
    }
    cw.cutImg = function (e, callback) {
        var kbs = (e.total * 4 / 3) / 1024;
//        alert("kbs" + kbs + "e.target" + e.target.result.replace(/[^\u0000-\u00ff]/g, "aa").length / 1024);
//        var kbs = e.target.result.replace(/[^\u0000-\u00ff]/g, "aa").length / 1024;
        if (kbs > 100) {
            // 图片大于100k，需要压缩
            var quality = 100 / kbs;
            var $tempImg = $("<img>").hide();
            $tempImg.load(function () {
                // IOS 设备中，如果的照片是竖屏拍摄的，虽然实际在网页中显示出的方向也是垂直，但图片数据依然是以横屏方向展示
                var sourceWidth = this.naturalWidth; // 在没有加入文档前，jQuery无法获得正确宽高，但可以通过原生属性来读取
                $tempImg.appendTo(document.body);
                var realityHeight = this.naturalHeight;
                $tempImg.remove();
                delete $tempImg[0];
                $tempImg = null;
                var angleOffset = 0;
//                if (sourceWidth === realityHeight) {
//                    angleOffset = 90;
//                }
                var newDataURL = cw.compressImg(this, quality, angleOffset);
//                alert("newDataURL" + newDataURL.replace(/[^\u0000-\u00ff]/g, "aa").length / 1024);
                callback(newDataURL);
            });
            $tempImg.attr("src", e.target.result);

        } else {
            callback(e.target.result);
        }
    };

    cw.compressImg = function (sourceImgObj, quality, angleOffset, outputFormat) {
        quality = quality || .8;
        angleOffset = angleOffset || 0;
        var mimeType = "image/jpeg";
        if (outputFormat != undefined && outputFormat == "png") {
            mimeType = "image/png";
        }

        var drawWidth = sourceImgObj.naturalWidth,
                drawHeight = sourceImgObj.naturalHeight;
        // IOS 设备上 canvas 宽或高如果大于 1024，就有可能导致应用崩溃闪退
        // 因此这里需要缩放
        var maxSide = Math.max(drawWidth, drawHeight);
        if (maxSide > 1024) {
            var minSide = Math.min(drawWidth, drawHeight);
            minSide = minSide / maxSide * 1024;
            maxSide = 1024;
            if (drawWidth > drawHeight) {
                drawWidth = maxSide;
                drawHeight = minSide;
            } else {
                drawWidth = minSide;
                drawHeight = maxSide;
            }
        }

        var cvs = document.createElement('canvas');
        var ctx = cvs.getContext("2d");
        if (angleOffset) {
            cvs.width = drawHeight;
            cvs.height = drawWidth;
            ctx.translate(drawHeight, 0);
            ctx.rotate(angleOffset * Math.PI / 180);
        } else {
            cvs.width = drawWidth;
            cvs.height = drawHeight;
        }

        ctx.drawImage(sourceImgObj, 0, 0, drawWidth, drawHeight);
        var newImageData = cvs.toDataURL(mimeType, quality || .8);
        return newImageData;
    };

    // 缩略图路径，实际大小路径，图片消息的位置 
    cw.addimg = function (base64, detailurl, isHis, list) {
        var img = new Image();
        img.src = base64;
        // 根据加载图片的先后，导至详情图片乱序。
        img.onload = function () {
            var i = {
                src: detailurl,
                w: img.width,
                h: img.height
//            ,
//            flag: loadindex
            };
            if (isHis)
                list.unshift(i);
            else
                list.push(i);
//        图片详情列表中加入发送的图片
        };
    }
    window.$chatwin = cw;
})(window);