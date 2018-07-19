<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

namespace app\grains\controller;

/**
 * 用户中心控制器
 *
 * @author liujunli
 */
header('content-type:application:json;charset=utf8');
header('Access-Control-Allow-Origin:*');   // 指定允许其他域名访问 
header('Access-Control-Allow-Headers:x-requested-with,content-type'); // 响应头设置

class Tab extends \think\Controller {

    public function index() {
        return $this->fetch();
    }


}
