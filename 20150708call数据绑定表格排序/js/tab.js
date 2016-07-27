var oTab = document.getElementById("tab");
var tBody = oTab.tBodies[0];
var rows = tBody.rows; //tBody.getElementsByTagName("tr")
console.log(rows);
var sortBtn = oTab.getElementsByClassName("cursor");

//1、绑定数据
var frg = document.createDocumentFragment();
if (jsonData) {
    for (var i = 0; i < jsonData.length; i++) {
        var cur = jsonData[i];
        var oTr = document.createElement("tr");
        var str = "<td><input type='checkbox' name='tabInput'/></td>";
        for (var key in cur) {
            str += "<td>" + cur[key] + "</td>";
        }
        oTr.innerHTML = str;
        frg.appendChild(oTr);
    }
    tBody.appendChild(frg);
}

//2、隔行变色
function changeBg() {
    for (var i = 0; i < rows.length; i++) {
        rows[i].className = i % 2 === 0 ? "" : "c";
        rows[i].oldBg = rows[i].className;
    }
}
changeBg();

//3、鼠标划过变颜色
for (var i = 0; i < rows.length; i++) {
    rows[i].onmouseover = function () {
        this.className = "cY";
    }
    rows[i].onmouseout = function () {
        this.className = this.oldBg;
    }
}

//4、给具有cursor样式的绑定点击事件，进行排序
for (var i = 0; i < sortBtn.length; i++) {
    sortBtn[i].onclick = (function (i) {
        return function () {
            var rowsAry = utils.listToArray(rows);

            rowsAry.sort(function (a, b) {
                return parseFloat(a.cells[5].innerHTML) - parseFloat(b.cells[5].innerHTML);
            });
            var frg = document.createDocumentFragment();
            for (var z = 0; z < rowsAry.length; z++) {
                frg.appendChild(rowsAry[z]);
            }
            tBody.appendChild(frg);
            changeBg();
        }
    })(i);
}



