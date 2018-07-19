<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

namespace app\main\controller;

use think\Controller;
use think\Loader;
use think\Db;

/**
 * 社群界面控制器
 *
 * @author liujunli
 */
class Community extends \think\Controller {

    public function index() {
//        $groups = Db::name('group')->select();
//        $this->assign("community",json_encode($groups));
        return $this->fetch();
    }
    
    public function indexs() {     
        return $this->fetch();
    }

    public function add() {
        $data = ['title' => '3', 'group_id' => '3', 'group_name' => '3'];
        $result = Db::name('group')->insert($data);
        if (false != $result) {
            $this->success("添加成功！");
        } else {
            $this->error("添加失败！");
        }
    }

    public function edit() {
        $data = ['title' => '4', 'group_id' => '4', 'group_name' => '4'];
        $result = Db::name('group')
                ->where('id', 4)
                ->update($data);
        if (false != $result) {
            $this->success("修改成功！");
        } else {
            $this->error("修改失败！");
        }
    }

    public function delete($id = '') {
        $result = Db::name('group')->where('id', $id)->delete();
        if (false != $result) {
            return $result;
        } else {
            $this->error("删除失败！");
        }
    }

}
