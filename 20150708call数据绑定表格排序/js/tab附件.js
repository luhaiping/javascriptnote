var oTab = document.getElementById("tab");
var tBody = oTab.tBodies[0];//获取table里面所有tBody中的第一个

//第一步：数据绑定
//1)按照拼接字符串的方式来实现
//var str = "";
//for (var i = 0; i < jsonData.length; i++) {
//    var cur = jsonData[i];
//    str += "<tr>";
//        str += "<td><input type='checkbox' name='tabInput'/></td>";
//        for (var key in cur) {
//            str += "<td>" + cur[key] + "</td>";
//        }
//    str += "</tr>";
//}
//tBody.innerHTML=str;

//2)DOM动态创建的方式
//for (var i = 0; i < jsonData.length; i++) {
//    var cur = jsonData[i];
//    var oTr = document.createElement("tr");
//    var str = "";
//    str += "<td><input type='checkbox' name='tabInput'/></td>";
//    for (var key in cur) {
//        str += "<td>" + cur[key] + "</td>";
//    }
//    oTr.innerHTML = str;
//    tBody.appendChild(oTr);
//}

















