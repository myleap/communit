<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

namespace app\main\controller;

use think\Config;
use think\Db;

/**
 * 交流群对话界面控制器
 *
 * @author liujunli
 */
class Upload extends \think\Controller {

    // 聊天页
    public function index() {
        return $this->fetch();
    }

    public function upload() {
        $path = 'uploads/' . date('Ymd'); // 接收文件目录
        if (!file_exists($path)) {
            mkdir("$path", 0777, true);
        }
        $filename = $path . '/' . time() . substr($_FILES['file']['name'], strrpos($_FILES['file']['name'], '.'));
        $response = array();
        if (is_uploaded_file($_FILES['file']['tmp_name'])) {
            if (move_uploaded_file($_FILES['file']['tmp_name'], $filename)) {
                $response['isSuccess'] = true;
                $response['imgurl'] = Config::get('url_domain_root') . $filename;
            } else {
                $response['isSuccess'] = false;
            }
        }
        return $response;
    }

    public function save() {
        $path = request()->post("imgurl");
        $objectname = request()->post("objectname");
        $content = request()->post("content");
        $from_user_id = request()->post("sendid");
        $to_group_id = request()->post("targetId");
        $time = date('Y-m-d H:i:s');
        $data = ['from_user_id' => $from_user_id, 'to_group_id' => $to_group_id, 'content' => $content, 'path' => $path, 'createtime' => $time, 'object_name' => $objectname];
        $result = Db::name('content')->insert($data);
        $response = array();
        if ($result) {
            $response['isSuccess'] = true;
        } else {
            $response['isSuccess'] = true;
        }
        return json($response);
    }

//    public function upimg() {
////        define('UPLOAD_DIR', './images/');
//        $img = Request::instance()->post("imgurl");
//        $base64_image = str_replace(' ', '+', $img);
//        //post的数据里面，加号会被替换为空格，需要重新替换回来，如果不是post的数据，则注释掉这一行
//        if (preg_match('/^(data:\s*image\/(\w+);base64,)/', $base64_image, $result)) {
//            //匹配成功
//            if ($result[2] == 'jpeg') {
//                $image_name = uniqid() . '.jpg';
//                //纯粹是看jpeg不爽才替换的
//            } else {
//                $image_name = uniqid() . '.' . $result[2];
//            };
//            $image_file = ROOT_PATH .'public'.DS.'uploads\\'.$image_name;
//            //服务器文件存储路径
//            if (file_put_contents($image_file, base64_decode(str_replace($result[1], '', $base64_image)))) {
//                return $image_file;
//            } else {
//                return false;
//            }
//        } else {
//            return false;
//        }
//    }
}
