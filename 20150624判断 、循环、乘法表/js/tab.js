//选项卡实现的原理：
//开始默认只有第一个li个对应的那个div有选中的样式，当我们鼠标划过某一个li的时候，首先让所有的li和对应的div没有选中的样式，在让当前划过的这个li和对应的div有选中的样式
//设置选中样式 className="cur"

//第一步：想操作谁就先获取谁(我们要操作的是oTab下的li和div，所有上下文一定要指定好，而且li和div一定要数量相同)
var oTab = document.getElementById("tab");
var oLis = oTab.getElementsByTagName("li");
var oDivs = oTab.getElementsByTagName("div");

//第二步：给所有的li添加鼠标划过的事件
//for (var i = 0; i < oLis.length; i++) {
//    var cur = oLis[i];
//    cur.onmouseover = function () {
//        tabChange(i);
//    }
//}
//上述这样循环绑定事件为啥不行?
/*
 i=0 cur=oLis[0] cur.onmouseover=function(){"tabChange(i);"} 给元素绑定事件，只是先把函数定义的部分绑定给事件，当触发这个事件的时候，函数才执行
 定义一个函数的原理是：开辟一个新空间，然后把函数体中的js当做字符串存起来,那上面来说，我们首先把函数体中的代码当字符串存起来-->"tabChange(i);" 这里面的i只是一个字符串i，不是我们的i这个变量
 i=1 cur=oLis[1] cur.onmouseover=function(){"tabChange(i);"}
 ...
 i=4 cur=oLis[4] cur.onmouseover=function(){"tabChange(i);"}
 i++ ==> i=5 循环五次，分别给五个li绑定完事件，发现i最终变成了5

 只有当页面加载完成(指css、html、js代码都加载完成)，我们才能手动的划过li，触发开始绑定的事件；js加载完成，肯定这个循环也完成了

 当我们在触发的时候，把字符串"tabChange(i);"当做正常的js代码执行：tabChange(i);,所以不管划过哪一个i都是5

 但是我们想要的是每一个li自己对应的那个索引，不能直接用i这个变量了
 */

//那我们的结局方案是？--->js编程解决反感之一：自定义属性解决方案(免费课必须会的)
//不能用i，但是还需要用索引，那我们可以在每一次循环的时候，首先把自己的索引存起来(存哪里呢？存在自己的自定义属性上)
for (var i = 0; i < oLis.length; i++) {
    var cur = oLis[i];//每一次循环获取的cur都是对象数据类型的
    cur.zhuFeng = i;//开始循环的时候，把自己的索引存储到自己的字定义属性上
    cur.onmouseover = function () {
        tabChange(this.zhuFeng);//this就是当前被绑定事件的那个元素
    }
}

//以下方式仅供目前参考，不要深究正式课还会讲:
//2)
//for (var i = 0; i < oLis.length; i++) {
//    ;(function (i) {
//        oLis[i].onmouseover = function () {
//            tabChange(i);
//        }
//    })(i);
//}

//3)
//for (var i = 0; i < oLis.length; i++) {
//    oLis[i].onmouseover = (function (i) {
//        return function () {
//            tabChange(i);
//        }
//    })(i);
//}

//4)
//function fn(i) {
//    return function () {
//        tabChange(i);
//    }
//}
//for (var i = 0; i < oLis.length; i++) {
//    oLis[i].onmouseover = fn(i);
//}


//第三步：实现一个方法执行我们选项卡的效果
function tabChange(n) {
    //n:是我们自己定义的一个形参，当执行这个方法的时候，需要把当前鼠标划过的那个li对应的索引值传进来
    //1)先让所有的li和div都清空选中的样式
    for (var i = 0; i < oLis.length; i++) {
        oLis[i].className = null;
        oDivs[i].className = null;
    }
    //2)给当前鼠标划过的加选中样式
    oLis[n].className = "cur";
    oDivs[n].className = "cur";
}




