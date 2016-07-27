/**
 * Created by Lucky on 2015/6/21.
 */
    var oWrap = document.getElementById("warp");

    var str = "";
    str +="<ul>";
        for(var i=0; i<=9; i++){
            str += "<li class='c1'>";
                for(var j=1; j<=i; j++){
                    str += "<span>";
                        str +=    j +"*"+ i +"="+ j*i;
                    str += "</span>";
                }
            str += "</li>";
        }

    str+="</ul>";
    oWrap.innerHTML = str;
