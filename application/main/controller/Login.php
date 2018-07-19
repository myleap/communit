<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

namespace app\main\controller;

use think\Session;
use think\Db;

/**
 * 用户中心控制器
 *
 * @author liujunli
 */
class Login extends \think\Controller {

    public function login() {
        return $this->fetch("login_win");
    }

    public function getuser() {
        $userinfo = Session::has('userinfo') ? Session::get('userinfo') : '-1';
        return $userinfo;
    }

    public function userfromdb() {
        $id = request()->post("uid");
        $result = Db::name('users')
                ->where('id', $id)
                ->find();
        $response = array();
        if ($result) {
            $temp = Session::get('userinfo');
            $result['token'] = $temp['token'];
            Session::set('userinfo', $result);
            $response['isSuccess'] = true;
            $response['objects'] = $result;
        } else {
            $response['isSuccess'] = false;
        }
        return $response;
    }

    public function delSession() {
        $response = array();
        if (Session::has('userinfo')) {
            Session::delete('userinfo');
        }
        $response['isSuccess'] = true;
        return $response;
    }

//     public function loginsuc() {
// //        $userinfo = isset($_S0ESSION['userinfo']) ? $_SESSION['userinfo'] : '';
// //        $this->assign('res', $userinfo);
//         $userinfo = Session::has('userinfo') ? Session::get('userinfo') : 'error';
//         $this->assign('userinfo', json_encode($userinfo));
//         return $this->fetch("login_win");
//     }
}
