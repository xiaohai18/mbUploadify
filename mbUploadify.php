<?php
    $mypic = $_FILES["mypic"]; 
    if(!empty($mypic)){ 
        $picname = $_FILES['mypic']['name']; 
        $picsize = $_FILES['mypic']['size']; 
        if ($picsize > 1024*1024*2) { 
            echo '图片大小不能超过2M'; 
            exit; 
        } 
        $type = strstr($picname, '.'); 
        if ($type != ".gif" && $type != ".jpg" && $type != ".png") { 
            echo '图片格式不对！'; 
            exit; 
        } 
        $pics = 'pic'.rand(0, 10000).$type; 
        //上传路径 
        if(move_uploaded_file($mypic["tmp_name"], $pics)){
            echo '上传成功!';
        }else{
            echo '服务器繁忙!';
        }
    }else{
        echo '参数错误!';
    }

?>