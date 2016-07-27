//var tabRender = {
//    event: function (evT, oLis, oDivs) {
//        var that = this;
//        for (var i = 0; i < oLis.length; i++) {
//            var cur = oLis[i];
//            cur["on" + evT] = function () {
//                that.change.call(this, oLis, oDivs);
//            }
//        }
//    },
//    change: function (oLis, oDivs) {
//        //this --> cur
//        for (var i = 0; i < oLis.length; i++) {
//            utils.removeClass(oLis[i], "select");
//            utils.removeClass(oDivs[i], "select");
//        }
//        var n = utils.getIndex(this);
//        utils.addClass(this, "select");
//        utils.addClass(oDivs[n], "select");
//    },
//    init: function (options) {
//        //init:是一个功能模块的唯一入口,在这里完成我们初始化数据和方法之间的相互调用，一般来说我们的init方法只有一个形参，是一个参数对象集合，主要是方便后期的扩展
//        //初始化参数，给没有传递的参数赋值默认值
//        options.curId = options.curId || "div1";
//        options.eventType = options.eventType || "click";
//        options.selIndex = options.selIndex || 0;
//
//        //给以后会常用的curEle赋值,在这个模块中常用的值，最好都定义为当前对象的一个属性
//        var curEle = document.getElementById(options.curId);
//        var oLis = curEle.getElementsByTagName("li");
//        var oDivs = curEle.getElementsByTagName("div");
//
//        //设置默认选中
//        if (options.selIndex !== 0) {
//            utils.removeClass(oLis[0], "select");
//            utils.removeClass(oDivs[0], "select");
//        }
//        utils.addClass(oLis[options.selIndex], "select");
//        utils.addClass(oDivs[options.selIndex], "select");
//
//        //通过init发送执行的指令(命令模式)，给所有的li绑定点击事件
//        this.event(options.eventType, oLis, oDivs);
//    }
//};
//
//tabRender.init({
//    curId: "div1",
//    eventType: "mouseover",
//    selIndex: 2
//});
//
//tabRender.init({
//    curId: "div2"
//});
//
//tabRender.init({
//    curId: "div3",
//    eventType: "mouseover",
//    selIndex: 2
//});

/*
function TabRender(opt) {
    //初始化参数
    opt.curId = opt.curId || "div1";
    opt.eventType = opt.eventType || "click";
    opt.selIndex = opt.selIndex || 0;

    //获取值
    this.evT = opt.eventType;
    this.curEle = document.getElementById(opt.curId);
    this.oLis = this.curEle.getElementsByTagName("li");
    this.oDivs = this.curEle.getElementsByTagName("div");

    //默认显示
    if (opt.selIndex !== 0) {
        utils.removeClass(this.oLis[0], "select");
        utils.removeClass(this.oDivs[0], "select");
    }
    utils.addClass(this.oLis[opt.selIndex], "select");
    utils.addClass(this.oDivs[opt.selIndex], "select");

    //绑定事件
    this.event();
}
TabRender.prototype = {
    constructor: TabRender,
    event: function () {
        var that = this;
        for (var i = 0; i < this.oLis.length; i++) {
            var cur = this.oLis[i];
            cur["on" + this.evT] = function () {
                that.change.call(this, that);
            }
        }
    },
    change: function (that) {
        //this --> cur
        for (var i = 0; i < that.oLis.length; i++) {
            utils.removeClass(that.oLis[i], "select");
            utils.removeClass(that.oDivs[i], "select");
        }
        var n = utils.getIndex(this);
        utils.addClass(this, "select");
        utils.addClass(that.oDivs[n], "select");
    },
    init: function () {
        //打算做另外一件事情
        alert(this.curEle.id);
    },
    extend: function (obj) {
        //让别人在自己插件的原型上扩展我们的方法
        for (var key in obj) {
            this[key] = obj[key];
        }
    }
};

var oTab1 = new TabRender({
    curId: "div1",
    eventType: "mouseover",
    selIndex: 2
});
//oTab1.init();

var oTab2 = new TabRender({
    curId: "div2"
});


//1、每一个实例都是不一样的，不会冲突
//2、我可以在实现主要功能后，根据情况进行单独扩展
//3、方便别人扩展
//TabRender.prototype.extend({
//    a: function () {
//
//    },
//    b: function () {
//
//    }
//});
//var oTab3 = new TabRender({
//    curId: "div3",
//    selIndex: 2
//});
//oTab3.a();

//4、还可以进行二次开发，继承扩展
function Fn() {

}
Fn.prototype = new TabRender({
    curId: "div3"
});


//看源码
//iscroll.js 才知道什么是插件
//jQuery 才知道什么是类库
*/















