<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

namespace app\main\controller;
use think\Db;
/**
 * 交流群对话界面控制器
 *
 * @author liujunli
 */
class Stock extends \think\Controller {

    // 聊天页
    public function stockWin() {

        return $this->fetch("stock_win");
    }

    public function stockFrm() {
        $vars = [1, 2, 3];
        return $this->fetch("stock_frm", $vars);
    }

    public function ajaxchuli() {
        $groups = Db::name('group')->select();
//        $this->assign($groups); 
        return $groups;
    }

}
