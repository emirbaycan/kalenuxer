<?php

class Mailer
{
    private $host = 'localhost';
    private $port = '@mail_port@';
    private $username = '@mail_username@';
    private $password = '@mail_password@';
    private $from_mail = '@mail_email@';
    private $from_title = '@site@';
    private $charset = 'UTF-8';

    public function php_mailer($email, $title, $mail)
    {
        require $_SERVER['DOCUMENT_ROOT'].'/api/lib/mailer/PHPmailer/class.phpmailer.php';
        
        $results = (object) [];
        try {
            ob_start(); 
            $a = new PHPMailer(true);
            $a->IsSMTP();
            $a->SMTPDebug = false;
            $a->Host = $this->host;
            $a->Port = $this->port;
            $a->Username = $this->username;
            $a->Password = $this->password;
            $a->SetFrom($this->from_mail, $this->from_title);
            $a->AddAddress($email);
            $a->CharSet = $this->charset;
            $a->Subject = $title;
            $a->MsgHTML($mail);
            $a->send(); 
            ob_end_clean(); 
        }
        catch (phpmailerException $e) {
          
        }


        $results->result = 1;
            
        return $results;
    }
}
