<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

namespace app\main\controller;

/**
 * 用户中心控制器
 *
 * @author liujunli
 */
use PHPMailer\PHPMailer\PHPMailer;

class Mail extends \think\Controller {

    public function index() {
        return $this->fetch();
    }

    /**
     * 系统邮件发送函数
     * @param string $tomail 接收邮件者邮箱
     * @param string $name 接收邮件者名称
     * @param string $subject 邮件主题
     * @param string $body 邮件内容
     * @param string $attachment 附件列表
     * @return boolean
     * @author static7 <static7@qq.com>
     */
    function send_mail($tomail, $name, $subject = '', $body = '', $attachment = null) {
        $mail = new PHPMailer();           //实例化PHPMailer对象
        $mail->CharSet = 'UTF-8';           //设定邮件编码，默认ISO-8859-1，如果发中文此项必须设置，否则乱码
        $mail->IsSMTP();                    // 设定使用SMTP服务
        $mail->SMTPDebug = 0;               // SMTP调试功能 0=关闭 1 = 错误和消息 2 = 消息
        $mail->SMTPAuth = true;             // 启用 SMTP 验证功能
        $mail->SMTPSecure = 'ssl';          // 使用安全协议
        $mail->Host = "smtp.exmail.qq.com"; // SMTP 服务器
        $mail->Port = 465;                  // SMTP服务器的端口号
        $mail->Username = "goldengrains@myleap.cn";    // SMTP服务器用户名
        $mail->Password = "Admin123456789";     // SMTP服务器密码
        $mail->SetFrom('goldengrains@myleap.cn', '五龙电动车');
        $replyEmail = '';                   //留空则为发件人EMAIL
        $replyName = '';                    //回复名称（留空则为发件人名称）
        $mail->AddReplyTo($replyEmail, $replyName);
        $mail->Subject = $subject;
        $mail->MsgHTML($body);
        $mail->AddAddress($tomail, $name);
        if (is_array($attachment)) { // 添加附件
            foreach ($attachment as $file) {
                is_file($file) && $mail->AddAttachment($file);
            }
        }
        return $mail->Send() ? true : $mail->ErrorInfo;
    }

    /**
     * tp5邮件
     * @param
     * @author jwd
     * @return mixed
     */
    public function email() {
        $mobile = request()->post("mobile");
        $code = request()->post("code");
        $name = request()->post("name");
        $company = request()->post("company");
        $job = request()->post("job");
        $question = request()->post("question");

        $toemail = 'ir@fdgev.com';
        $mailname = 'noname';
        $subject = '用户注册信息';
        $content = '电话：' . $mobile . '<br>姓名:' . $name . '<br>公司:' . $company . '<br>职位:' . $job . '<br>咨询内容:' . $question;
        return $this->send_mail($toemail, $mailname, $subject, $content);
    }

}
