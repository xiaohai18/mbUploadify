<?php
    $files = $_FILES["files"]; 
    if(!empty($files)){ 
        $picname = $files['name']; 
        $picsize = $files['size']; 
        if ($picsize > 1024*1024*2) { 
            echo '图片大小不能超过2M'; 
            exit; 
        } 
        $type = strstr($picname, '.'); 
        if ($type != ".gif" && $type != ".jpg" && $type != ".png") { 
            echo '图片格式不对！'; 
            exit; 
        } 
        //echo '服务器繁忙';
        //die();
        $pics = 'pic'.rand(0, 10000).$type; 
        //上传路径 
        if(move_uploaded_file($files["tmp_name"], $pics)){
            echo '上传成功!';
        }else{
            echo '服务器繁忙!';
        }
    }else{
        echo '参数错误!';
    }

?>
