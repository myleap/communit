<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

namespace app\main\controller;

/**
 * 用户中心，设置界面控制器
 *
 * @author liujunli
 */
class Usersetting extends \think\Controller{
    
//    protected $RongCloud;
//    protected function _initialize() {
//        vendor("rongcloud.rongcloud");
//        $this->RongCloud = new \RongCloud($this->appKey,$this->appSecret);
//        parent::_initialize();
//    }
//    
//    private $appKey = "bmdehs6pdb8rs";
//    private $appSecret = 'YoUBkGKe9rwZC';
       
    public function usersettingWin() {

        return $this->fetch("usersetting_win");
    }

    public function usersettingFrm() {

        return $this->fetch("usersetting_frm");
    }
    
}
