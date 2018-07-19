<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

namespace app\east\controller;

/**
 * 用户中心控制器
 *
 * @author liujunli
 */
header('content-type:application:json;charset=utf8');
header('Access-Control-Allow-Origin:*');   // 指定允许其他域名访问 
header('Access-Control-Allow-Headers:x-requested-with,content-type'); // 响应头设置

class Hangqing extends \think\Controller {

    public function index() {
        return $this->fetch();
    }

    public function request() {
        $url = request()->post("purl");
        if (isset($url)) {
            //        $url = 'http://guba.eastmoney.com/news,600666,758693904.html';
            $html = file_get_contents($url);
        }
    }

}
