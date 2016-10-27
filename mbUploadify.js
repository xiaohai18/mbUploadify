/*
    Date: 2016/10/25
    Author: hishion
    Email: 506713930@qq.com
    Description: html5 文件上传小插件, 支持简单验证
*/
(function(){
    var Uploadify = function (){
        return this.init.apply(this, arguments);
    };

    Uploadify.prototype ={
        /*
            两个参数时:  form对象 与 config对象
            一个参数时:  config对象
        */
        init: function(){
            //传入的是form 与 config
            if(arguments[0].tagName && arguments[0].nodeType === 1){
                this.element = arguments[0];
                this.setConfig(arguments[1] || {});
            }else{
                //传入config
                this.setConfig(arguments[0]);
            }

            this.file    = this.options['file'] || this.element && this.element.querySelector('input[type=file]');
            this.url     = this.options['url']  || this.element && this.element.action;
            this.max     = this.options['maximum'];
            this.size    = this.options['size'];
            this.type    = this.options['type'];
            this.cache   = {};

            if(!this.file){
                throw new Error("file does not exist!");
            }else if(!this.url){
                throw new Error("url cannot be empty!");
            }else if(typeof FileReader === 'undefined'){
                throw new Error('browser does not support FileReader!');
            }

            if(this.max > 1 && this.options.isMultiple){
                this.file.setAttribute('multiple', true);
            }else{
                this.file.removeAttribute('multiple');
            }
            this.bindEvent();
        },
        /*
            检验合法性, return null 表示无错, 否则 return 错误信息.
        */
        verify: function(file){
            var msg = this.options.message;
            var reg = new RegExp('\\b' + this.type + '\\b');

            if(file.size > this.size){
                return msg['size'];
            }else if(reg.test(file.type) === false){
                return msg['type'];
            }else if(!this.options.isAllowSame && this.cache[file.lastModified] === 1){
                return msg['same'];
            }else{
                this.cache[file.lastModified] = 1;
                return null;
            }
        },
        /*
            获得上传的个数
        */
        getUploadNum: function(){
            var attr, count = 0;
            for(attr in this.cache){
                if(this.cache[attr]){
                    count++;
                }
            }
            return count;
        },
        /*
            开始上传文件,并验证
        */
        bindEvent: function(){
            var self = this, opt = self.options, msg = opt.message,
            cb  = ['abort', 'loadstart', 'progress', 'loadend'];
            
            function uploadstart(){
                var files = this.files;

                if(files.length > self.max || self.getUploadNum() >= self.max){
                    opt['error'](files, msg['maximum']);
                }else{
                    for(var k = 0; k < files.length; k++){
                        var ret = files[k], err = self.verify(ret),
                        reader = new FileReader();

                        if(err){
                            opt['error'](ret, err);
                        }else{
                            switch(opt['rendAsType'].toLowerCase()){
                                case 'string': reader.readAsBinaryString(files[k]);break;
                                case 'text': reader.readAsText(files[k]);break;
                                default: reader.readAsDataURL(files[k]);
                            }
                        }

                        for(var i = 0;  i < cb.length; i++){
                            reader.addEventListener(cb[i], opt[cb[i]], false);
                        }

                        (function(ret){
                            reader.addEventListener('error', function(e){
                                opt['error'](ret, err || msg['other']);
                            }, false);
                            reader.addEventListener('load', function(e){
                                self.ajaxUpload(ret);
                                opt['load']( e, ret);
                            })
                        }(ret));
                    }
                }
            }

            if(opt.isDrop){
                self.on(document, 'dragenter', opt.dragenter);
                self.on(document, 'dragleave', opt.dragleave);
                self.on(document, 'dragover', function(e){
                    e.preventDefault();
                    opt.dragover.call(this, e);
                });
                self.on(document, 'drop', function(e){
                    e.preventDefault();
                    uploadstart.call(e.dataTransfer);
                    opt.drop.call(this, e);
                });
            }
            
            self.on(self.file, 'change', function(){
                uploadstart.call(this);
                if(self.options.isAllowSame){
                    this.dataValue = this.value;
                    this.value     = '';
                }
            });
        },
        /*ajax 上传*/
        ajaxUpload:  function(file){
            var self = this;
            var xhr  = new XMLHttpRequest();
            var xhrData = new FormData(self.element || null);
            xhr.lastModified = file.lastModified;
            xhr.onreadystatechange = function(){
                var response = this.responseText;
                if(this.readyState == 4){
                    if(this.status < 300 && this.status >= 200){
                        self.options.uploadSuccess.call(this, response);
                    }else{
                        self.cache[this.lastModified] = null;
                        self.options.uploadFailed.call(this);
                    }
                }
                if(!this.once){
                    this.once = true;
                    self.options.uploadComplete();
                }
            };
            xhrData.append(self.options.uploadName || self.file.name, file); 
            xhr.open("POST", self.url, true);    
            xhr.send(xhrData);
        },
        on: function(obj, event, callback){
            return obj.addEventListener(event, callback, false);
        },
        setConfig: function(config){
            var options = {
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

                //是否支持拖拽上传文件
                isDrop: false,
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
                uploadComplete: function(){}
            }, attr, 
            /*数组中 各种回调 */
            cb = ['abort', 'error', 'loadstart', 'progress', 'load', 'loadend'];

            for(var i = 0, len = cb.length; i < len; i++){
                options[cb[i]] = function(){};
            }
            for(attr in config){  
                if(options.hasOwnProperty(attr)){
                    options[attr] = config[attr];
                }
            };
            this.options = options;
        }
    };

    window.mbUploadify = Uploadify;
}());