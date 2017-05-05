(function($) {

    function Preload(imgs, options) {
        this.imgs = (typeof imgs === 'string') ? [imgs] : imgs; //如果传入的对象不是数组，自行包装
        this.opts = $.extend({}, Preload.DEFAULTS, options); //初始化，拓展  extend{  }      将两个对象合并 后面默认覆盖前面 Preload.DEFAULTS, options 
        this._unoredered();
    }
    //原型方法，共有的每个Preload的实例对象都拥有；
    Preload.DEFAULTS = {
        each: null, //每一个Preload实例对应的方法
        all: null
    }
    Preload.prototype._unoredered = function() { //无序加载
        var imgs = this.imgs;
        var opts = this.opts;
        var count = 0;
        var len = imgs.length;
        $.each(imgs, function(i, src) {
            if (typeof src != 'string') return;
            var imgObj = new Image();
            $(imgObj).on('load error', function() {
                opts.each && opts.each(count);
                if (count >= len - 1) {
                    opts.all && opts.all();
                }
                count++;
            })
            imgObj.src = src;
        })
    }
    $.extend({
            preload: function(imgs, opts) {
                new Preload(imgs, opts);
            }
        })
        // 两种拓展插件的方法
        // $.fn.extend =>   $('#id').preload();          这样挂载在fn上的,需要选中元素后调用
        // $.extend => $.preload();                       工具类的拓展
}(jQuery))