<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

namespace app\main\controller;

/**
 * 社群界面控制器
 *
 * @author liujunli
 */
class Certification extends \think\Controller {

    public function certificationwin() {

        return $this->fetch("certification_win");
    }
  
    public function certificationfrm() {

        return $this->fetch("certification_frm");
    }

}
