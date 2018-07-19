<?php

/*

 * To change this license header, choose License Headers in Project Properties.

 * To change this template file, choose Tools | Templates

 * and open the template in the editor.

 */

namespace app\main\controller;

/**

 * 用户中心控制器

 *

 * @author liujunli

 */
class Usercenter extends \think\Controller {

    protected function _initialize() {
        parent::_initialize();
    }

    public function userCenter() {
        return $this->fetch("user_center");
    }
}
