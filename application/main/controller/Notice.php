<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

namespace app\main\controller;

/**
 * 公告解读控制器
 *
 * @author liujunli
 */
class Notice extends \think\Controller {

    public function analysis() {

        return $this->fetch();
    }

    public function research() {

        return $this->fetch();
    }

    public function broadcast() {

        return $this->fetch();
    }

    public function news() {

        return $this->fetch();
    }

    public function common() {

        return $this->fetch();
    }

}
