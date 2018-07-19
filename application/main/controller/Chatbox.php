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
header('content-type:application:json;charset=utf8');
header('Access-Control-Allow-Origin:*');   // 指定允许其他域名访问 
header('Access-Control-Allow-Headers:x-requested-with,content-type'); // 响应头设置

class Chatbox extends \think\Controller {

//    protected $RongCloud;
//    protected function _initialize() {
//        vendor("rongcloud.rongcloud");
//        $this->RongCloud = new \RongCloud($this->appKey,$this->appSecret);
//        parent::_initialize();
//    }
//    private $appKey = "bmdehs6pdb8rs";
//    private $appSecret = 'YoUBkGKe9rwZC';

    public function index() {
        return $this->fetch("chatbox_win");
    }

    // 聊天页
    public function chatWin() {

        return $this->fetch("chatbox_win");
    }

    public function chatBox() {
        return $this->fetch("chatbox");
    }

    public function chatFrm() {
        return $this->fetch("chatbox_frm");
    }

    public function getHismsg() {
        $limit = request()->post("limit");
        $page = request()->post("page");
        $jointime = request()->post("jointime");
        $group_id = request()->post("to_group_id");
//        $currenttime = date('Y-m-d H:i:s');
        $result = Db::name('content')
                ->alias('c')
                ->field(['*', 'c.id' => 'msgid'])
                ->join('com_users u', 'c.from_user_id = u.id')
                ->where('to_group_id', $group_id)
                ->where('createtime', '<= time', $jointime)
                ->order('createtime desc')
                ->page($page, $limit)
                ->select();
        $response = array();
        if ($result) {
            $response['isSuccess'] = true;
            $response['objects'] = $result;
        } else {
            $response['isSuccess'] = false;
        }
        return json($response);
    }

    public function getNews() {
        $limit = request()->post("limit");
        $page = request()->post("page");
//        $jointime = request()->post("jointime");
//        $group_id = request()->post("to_group_id");
//        $currenttime = date('Y-m-d H:i:s');
        $result = Db::name('news')
                ->order('release_time desc')
                ->page($page, $limit)
                ->select();
        $response = array();
        if ($result) {
            $response['isSuccess'] = true;
            $response['objects'] = $result;
        } else {
            $response['isSuccess'] = false;
        }
        return json($response);
    }

}
