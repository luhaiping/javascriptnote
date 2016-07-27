//规律：一共有九行，每一行的列数不固定，第一行一列，第二行两列...第九行九列
//如果不想的静态写在页面上，我们需要用js发下规律：
//1、一共9行
//2、每一行的列数和行数对应
//3、每一列的内容等于 列*行=最终的值

//思想：我们自己把需要动态添加的标签和文字内容都在js中按照字符串的形式拼接好(js中可以按照规律循环进行拼接)，然后在通过innerHTML把拼好的字符串插入到指定元素中(innerHTML可以识别HTML标签的)--->以后我们项目中的数据绑定基本上就是这个原理

var str = "";
str += "<ul>";
for (var i = 1; i <= 9; i++) {
    str += "<li>";
    for (var j = 1; j <= i; j++) {
        str += "<span>" + j + " * " + i + " = " + (j * i) + "</span>";
    }
    str += "</li>";
}
str += "</ul>";
var oTab = document.getElementById("tab");
oTab.innerHTML = str;

var oSpans = oTab.getElementsByTagName("span");
for (var i = 0; i < oSpans.length; i++) {
    oSpans[i].className = "c" + (i % 3);
}

//var oLis = oTab.getElementsByTagName("li");
//for (var i = 0; i < oLis.length; i++) {
//    oLis[i].className = "c" + (i % 3);
//}


//思考题：
//http://pan.baidu.com/s/1pJuVLX5  第一周(17视频)

//1、我不想这样实现隔行变色(先拼接，然后获取循环实现变色)，我想在拼接的时候就完成隔行变色如何的来处理？--->字符串拼接的三条黄金法则

//2、我们现在是先拼接9行，然后每一行在拼接列，现在我反过来，我想先拼接9列，然后每一列在拼接不同的行该如何的处理？





