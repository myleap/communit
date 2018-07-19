<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

namespace app\mgnews\controller;

/**
 * 用户中心控制器
 *
 * @author liujunli
 */
class Edit extends \think\Controller {

    public function index() {
        return $this->fetch("edit_head");
    }

    public function editfrm() {
        return $this->fetch("edit_body");
    }

}
