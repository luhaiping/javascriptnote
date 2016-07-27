//一 获取到tab需要操作的元素
    var oTab = document.getElementById("tab");
    var oLis = oTab.getElementsByTagName('li');
    var oContents = oTab.getElementsByClassName("content");
    for(var j=0; j<oLis.length; j++){  //length = 3;
        oLis[j].index= j;
        oLis[j].onmouseover = function (){
           tab(this['index']);
        }
        //j = 3;
    }
    //console.log(j)
    //oLis[i].selfClass = "c2"
function tab(index){ //定义一个tab函数 index:滑过li的索引值
    for(var i=0; i<oLis.length; i++){
        //清除默认选中样式
        oLis[i].className = "";
        oContents[i].className="content";
    }
    //滑过体育的时候的index=0
    console.log(index);
    oLis[index].className = "active"; //li
    oContents[index]['className'] = "content show";
}






