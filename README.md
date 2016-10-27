
#mbUploadify.js
##html5移动端文件上传插件, 无依赖, 轻小


在线演示：[http://www.byex.cn/mbUploadify](http://www.byex.cn/mbUploadify/)

Written by: hishion

##使用一

####Step 1: 引入资源文件

```html
<input type="file" name="files"  id="j-file" multiple>

<!-- mbUploadify Javascript file -->
<script src="mbUploadify.min.js"></script>
```

####Step 2: 调用 mbUploadify 

```javascript
var upload = new mbUploadify({
        file: document.getElementById('j-file'),
        /*ajax 上传地址*/
        url: 'mbUploadify.php',
        /*ajax上传成功*/
        uploadSuccess: function(res){
            console.log(res);
        },
        ......
    })
```

##使用二


####Step 1: 引入资源文件

```html
<form action="mbUploadify.php" method="post">
    <label for="j-file2" class="mbUploadify" id="j-dropArea">
        拖拽文件上传
        <input type="file" name="files" id="j-file2"  multiple>

    </label>
    <!--   附带提交其它数据   -->
    <input type="hidden" name="email" value="506713930@qq.com">
</form>
<!-- mbUploadify Javascript file -->
<script src="mbUploadify.min.js"></script>
```

####Step 2: 调用 mbUploadify 

```javascript
var upload2 = new mbUploadify(document.querySelector('form'), {
        /*是否支持拖拽上传文件*/
        dropElement: document.getElementById('j-dropArea'),
        ......
    });
```



##配置项

构造函数 mbUploadify 的参数个数可选, 其中第二个参数配置项列表如下. 当只有一个form对象作参数时，系统会从form对象里面查找file, url, uploadName配置项.
```
var upload = new mbUploadify(form, {
    //input file控件对象
    file: '',
    //上传类型
    type: 'image',
    //上传最多个数
    maximum: 5,
    //文件大小 2M
    size: 1024*1024*2,
    //html5中reader对象解析类型 可选 [string | text | url]
    rendAsType: 'url',
    //上传时后端 接收的 name
    uploadName: '',
    //上传地址
    url: '',
    //错误提示信息!
    message: {
        type: '类型不对!',
        size: '文件太大',
        maximum: '上传文件数量太多!',
        same: '不能上传相同的文件!',
        other: '其它网络错误!'
    },
    //是否多选
    isMultiple: true,
    //是否允许提交重复的文件
    isAllowSame: false,
    
    //文件拖拽上传区域对象 null表示不支持
    dropElement: null,
    //文件拖拽dragenter事件回调
    dragenter: function(){},
    //文件拖拽dragleave事件回调
    dragleave: function(){},
    //文件拖拽dragover事件回调
    dragover: function(){},
    //文件拖拽drop事件回调
    drop: function(){},

    //ajax上传成功 回调
    uploadSuccess: function(){},
    //ajax上传失败 回调
    uploadFailed: function(){},
    //ajax上传完成
    uploadComplete: function(){},

    //上传中止
    abort: function(){},
    //上传失败
    error: function(file, msg){},
    //上传开始
    loadstart: function(){},
    //上传进度
    progress: function(){},
    //上传成功
    load: function(){},
    //上传完成，不管成功失败
    loadend: function(){},
    //ajax上传成功
    uploadSuccess: function(){},
    //ajax上传失败
    uploadFailed: function(){},
    //ajax上传完成
    uploadComplete: function(){}
});
```

