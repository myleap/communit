<?php

/**
 * OAuth2.0微信授权登录实现
 *
 * @author zhouqh
 * @ Wxlogin.php
 */

namespace app\main\controller;

use think\Config;
use think\Session;
use think\Db;

class Wxlogin {

    protected $RongCloud;
    private $appKey = "bmdehs6pdb8rs";
    private $appSecret = 'YoUBkGKe9rwZC';

    public function index() {
        vendor("rongcloud.rongcloud");
        $this->RongCloud = new \RongCloud($this->appKey, $this->appSecret);
        $config = Config::get('thirdlogin.weixin');
        // 获取回调地址 http://xxx.com/public/home/Wxlogin/index
//        $url = request()->root(true) . '/' . request()->path();
        $url = 'https://www.myleap.cn/community/public/index.php/main/Wxlogin/index';
        // trace('weixin url '.$url);
        $url = urlencode($url);
        // 公众号的id和secret
        $appid = $config['appid'];
        $appsecret = $config['appsecret'];

        // 获取code码，用于和微信服务器申请token。 注：依据OAuth2.0要求，此处授权登录需要用户端操作
        if (!isset($_GET['code']) && !isset($_SESSION['code'])) {
            //以下信息可安放在用户登录界面上：
            $url = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' . $appid . '&redirect_uri=' . $url . '&response_type=code&scope=snsapi_userinfo&state=1#wechat_redirect';
            header('Location:' . $url); //跳转到第三方登录入口
            exit;
        }

        // 依据code码去获取openid和access_token，自己的后台服务器直接向微信服务器申请即可
        if (isset($_GET['code']) && !isset($_SESSION['token'])) {
            $_SESSION['code'] = $_GET['code'];

            $url = "https://api.weixin.qq.com/sns/oauth2/access_token?appid=" . $appid .
                    "&secret=" . $appsecret . "&code=" . $_GET['code'] . "&grant_type=authorization_code";
            $res = $this->https_request($url);
            $res = (json_decode($res, true));
            $_SESSION['token'] = $res;
        }

        //  print_r($_SESSION);
        // 依据申请到的access_token和openid，申请Userinfo信息。
        if (isset($_SESSION['token']['access_token'])) {
            $url = "https://api.weixin.qq.com/sns/userinfo?access_token=" . $_SESSION['token']['access_token'] . "&openid=" . $_SESSION['token']['openid'] . "&lang=zh_CN";
            //echo $url;
            $res = $this->https_request($url);
            $res = json_decode($res, true); //最终得到的用户信息
            // $result = $this->RongCloud->user()->getToken('9227', 'jwd', 'https://www.rongcloud.cn/images/logo.png'); 
            $userinfo = $this->insertuser($res);

//            echo $userinfo;
            dump($userinfo);
            $result = $this->RongCloud->user()->getToken($userinfo['id'], $res['nickname'], $res['headimgurl']);
            $result = json_decode($result, true);

            $res['token'] = $result['token'];
//            $res['id'] = insertuser($res)['id'];
            $userinfo['token'] = $result['token'];
//            if (Session::has('userinfo')) {
//                Session::delete('userinfo');
//            }
            Session::set('userinfo', $userinfo);
//            $_SESSION['userinfo'] = $res;
//            Session::set('userinfo', $res);

//$_SERVER["SERVER_NAME"].$_SERVER["REQUEST_URI"]
            header('Location:' . Url('index/index?v=1')); //跳转到第三方登录入口    
//            header('Location:' . Url($_SERVER["SERVER_NAME"].$_SERVER["REQUEST_URI"]));
            
            exit;
            // return $res;
        }
        //  print_r($_SESSION);
    }

    function insertuser($weinfo) {
        $before = Db::name('users')->where('unionid', $weinfo['unionid'])->find();
        if (!empty($before)) {
            $data = ['user_login' => $weinfo['openid']];
            $result = Db::name('users')
                    ->where('unionid', $weinfo['unionid'])
                    ->update($data);
            $before['user_login'] = $weinfo['openid'];
            return $before;
        } else {
            // 启动事务
            Db::startTrans();

            try {
                $tmpStr = json_encode($weinfo['nickname']);
                $tmpStr2 = preg_replace("#(\\\ud[0-9a-f]{3})#ie", "", $tmpStr);
                $tempname = json_decode($tmpStr2);
                $data = ['avatar' => $weinfo['headimgurl'], 'user_login' => $weinfo['openid'], 'user_nicename' => $tempname, 'unionid' => $weinfo['unionid'], 'sex' => $weinfo['sex'], 'create_time' => date("Y-m-d H:i:s")];
                Db::name('users')->insert($data);
                $after = Db::name('users')->where('user_login', $weinfo['openid'])->find();
                // 提交事务
                Db::commit();
                return $after;
            } catch (\Exception $e) {
                // 回滚事务
                Db::rollback();
                return $e;
            }
        }
    }

    // cURL函数简单封装
    function https_request($url, $data = null) {
        $curl = curl_init();
        curl_setopt($curl, CURLOPT_URL, $url);
        curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, FALSE);
        curl_setopt($curl, CURLOPT_SSL_VERIFYHOST, FALSE);
        if (!empty($data)) {
            curl_setopt($curl, CURLOPT_POST, 1);
            curl_setopt($curl, CURLOPT_POSTFIELDS, $data);
        }
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
        $output = curl_exec($curl);
        curl_close($curl);
        return $output;
    }

}
