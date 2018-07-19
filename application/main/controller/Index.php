<?php

namespace app\main\controller;

use think\Session;

class Index extends \think\Controller {

    public function index() {
//        $userinfo = '-1';
//        $this->assign('userinfo', json_encode($userinfo));
        return $this->fetch();
    }

//    public function loginsuc() {
//        $userinfo = Session::has('userinfo') ? Session::get('userinfo') : 'error';
//        $this->assign('userinfo', json_encode($userinfo));
//        return $this->fetch("index");
//    }
//
//    public function loginoff() {
//        $userinfo = Session::has('userinfo') ? Session::get('userinfo') : 'error';
//        $this->assign('userinfo', json_encode($userinfo));
//        return $this->fetch("index");
//    }

}
