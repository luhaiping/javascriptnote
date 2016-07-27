//选项卡的需求：点击每一个页卡，底下的内容展示对应的信息
//思路：默认让第一个li和对应的div有选中的样式，当我鼠标点击某一个li的时候，让当前点击的li有select样式，而其余的两个都没有select样式----->换个思路:不管点击的是哪个，首先让所有的li都没有选中的样式，然后让当前点击的这个有选中的样式就好了

//第一步：想要操作谁就先获取谁
var oTab = document.getElementById("tab");
var oLis = oTab.getElementsByTagName("li");
var oDivs = oTab.getElementsByTagName("div");

//第二步：实现一个方法或者功能，完成我们选项卡的思路
//nIndex:在定义功能的时候，设定一个形参nIndex：代表当前被点击的这个li的索引
function changeTab(nIndex) {
    //1、让所有的li和div都没有选中的样式
    for (var i = 0; i < oLis.length; i++) {
        oLis[i].className = null;
        oDivs[i].className = null;
    }
    //2、让当前点击的这个有选中的样式
    oLis[nIndex].className = "select";
    oDivs[nIndex].className = "select";
}

//第三步：给三个li绑定点击事件
/*
 oLis[0].onclick = function () {
 changeTab(0);
 }
 oLis[1].onclick = function () {
 changeTab(1);
 }
 oLis[2].onclick = function () {
 changeTab(2);
 }
 */
//下面这样写不行
/*
 for (var i = 0; i < oLis.length; i++) {
 oLis[i].onclick = function () {
 changeTab(i);//i永远都是3
 }
 }
 oLis[0].onclick=function(){//给元素绑定事件，只有点击的时候才执行我们的函数，此时属于定义函数：开辟一个新的空间，把函数中的代码当字符串存储起来，此时的changeTab(i);其实应该是"changeTab(i);"，只是字符串而已
 changeTab(i);
 }
 oLis[1].onclick=function(){
 changeTab(i);
 }
 oLis[2].onclick=function(){
 changeTab(i);
 }

 for(var i=0;i<3;i++){.....}
 i==>3

 只有当页面加载完成(css html js都加载完成)，页面呈现在我们眼前的时候，我们才可以点击，也就是当我点击的时候，整个循环绑定已经完成了

 总结：我们每一次点击传的索引都是3
 */

//问题：要传的是索引，但是还不能用i--->自定义属性存储的方式
//1、给三个li增加一个属性zhuFeng，属性值是当前li的索引
//for (var i = 0; i < oLis.length; i++) {
//    oLis[i].zhuFeng = i;
//    //绑定事件
//    oLis[i].onclick = function () {
//        //this就是当前被点击的这个li
//        changeTab(this.zhuFeng);
//    }
//}


//扩展:
//for (var i = 0; i < oLis.length; i++) {
//    ;(function(i){
//        oLis[i].onclick = function () {
//            changeTab(i);
//        }
//    })(i);
//}

//for (var i = 0; i < oLis.length; i++) {
//    oLis[i].onclick = (function(i){
//        return function(){
//            changeTab(i);
//        }
//    })(i);
//}

//function fn(i){
//    return function(){
//        changeTab(i);
//    }
//}
//for (var i = 0; i < oLis.length; i++) {
//    oLis[i].onclick = fn(i);
//}



