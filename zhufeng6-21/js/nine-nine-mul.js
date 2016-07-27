/**
 * Created by Lucky on 2015/6/21.
 */
//元素的innerHTML方法是获取元素内的html
//元素的innerText方法是h获取元素内的文本
var wrap = document.getElementById("wrap");
    var str = "";
    str += "<ul>";
        for(var i=1; i<=9; i++){
            var classNameVal = "";
            if(i%3 === 1){
                classNameVal = "c1";
            }else if(i%3 === 2){
                classNameVal = "c2";
            }else{
                classNameVal = "c3";
            }

            str += "<li class='"/*+classNameVal*/+"'>";
               for( var j=1; j<=i; j++){
                   str += "<span>";
                       str += j +"*" + i +"="+j*i;
                   str += "</span>";
               }
            str += "</li>";
        }
    str += "</ul>";
console.log(str)
wrap.innerHTML = str;
var oSpans = wrap.getElementsByTagName("span");
for(var i=0; i<oSpans.length; i++){
    oSpans[i].className = "c"+(i%3+1);
}