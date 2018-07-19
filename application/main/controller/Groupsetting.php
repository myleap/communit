<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

namespace app\main\controller;

/**
 * 聊天信息设置控制器
 *
 * @author liujunli
 */
class Groupsetting extends \think\Controller {

//    protected $RongCloud;
//
//    protected function _initialize() {
//        vendor("rongcloud.rongcloud");
//        $this->RongCloud = new \RongCloud($this->appKey, $this->appSecret);
//        parent::_initialize();
//    }
//
//    private $appKey = "bmdehs6pdb8rs";
//    private $appSecret = 'YoUBkGKe9rwZC';

    public function groupsettingWin() {
        return $this->fetch("groupsetting_win");
    }

    public function checkjoinWin() {
        return $this->fetch("checkjoin_win");
    }

    public function groupsettingFrm() {
        return $this->fetch("groupsetting_frm");
    }

    public function checkjoinFrm() {
        return $this->fetch("checkjoin_frm");
    }

}
