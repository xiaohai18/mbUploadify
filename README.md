
#mbUploadify.js
##html5移动端文件上传插件, 无依赖, 轻小


在线演示：[http://www.byex.cn/mbUploadify](http://www.byex.cn/mbUploadify/)

Written by: hishion

##使用步骤

###Step 1: 引入资源文件


```html
<input type="file" name="files"  id="j-file" multiple>

<!-- mbSlider Javascript file -->
<script src="mbUploadify.js"></script>
```


###Step 2: 调用 mbUploadify 

```javascript
var upload = new mbUploadify({
        file: document.getElementById('j-file'),
        /*ajax 上传地址*/
        url: 'mbUploadify.php',
        /*ajax 提交的字段名称*/
        uploadName: 'mypic',
        /*ajax上传成功*/
        uploadSuccess: function(res){
            console.log(res);
        }
    })
```

##配置项

以下参数全部为默认值
```
var upload = new mbUploadify({
    /* input file控件 */
    file: '',
    /* 上传类型, 验证时需要*/
    type: 'image',
    /* 最多上传文件数量 */
    maximum: 3,
    /* 单个文件最大大小 2M */
    size: 1024*1024*2,
    /* html5中reader对象解析类型 可选 [string | text | url] */
    rendAsType: 'url',
    /*ajax 上传的 name*/
    uploadName: 'mbUploadify',

    /*ajax 上传地址*/
    url: '',
    /*错误提示信息*/
    message: {
        type: '类型不对!',
        size: '文件太大',
        maximum: '上传文件数量太多!',
        other: '其它网络错误!'
    },
    /*上传中止*/
    abort: function(){
    },
    /*上传失败*/
    error: function(file, msg){
    },
    /*上传开始*/
    loadstart: function(){
    },
    /*上传进度*/
    progress: function(){
    },
    /*上传成功*/
    load: function(){
    },
    /*上传完成，不管成功失败*/
    loadend: function(){
    },
    /*ajax上传成功*/
    uploadSuccess: function(){
    },
    /*ajax上传失败*/
    uploadFailed: function(){
    },
    /*ajax上传完成*/
    uploadComplete: function(){
    }
});
```

