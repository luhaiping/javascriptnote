$(function () {
    //�����̨������(jsonp��������)��������չʾ�����ǵ�ҳ����
    function callBack(data) {
        //console.dir(data);
        if (data && data.code === 0) {
            var ary = data.data.pre;
            var str = "";
            for (var i = 0; i < ary.length; i++) {
                var cur = ary[i];
                str += "<div class='list' mid='" + cur.mid + "'>";
                str += "<div class='home'>";
                str += "<img src='" + cur.leftBadge + "'/>";
                str += "<span>" + cur.leftName + "</span>"
                str += "</div>";
                str += "<div class='score'>" + cur.leftGoal + " : " + cur.rightGoal + "</div>";
                str += "<div class='away'>";
                str += "<img src='" + cur.rightBadge + "'/>";
                str += "<span>" + cur.rightName + "</span>"
                str += "</div>";
                str += "</div>";
            }
            $(".box").html(str);

            //�����е��б�󶨵���¼�
            $(".box>.list").click(function () {
                var mid = $(this).attr("mid");
                window.location.href = "xx.html?mid=" + mid;
            });
        }
    }

    $.ajax({
        url: "http://sportswebapi.qq.com/kbs/hotMatchList",
        type: "get",
        dataType: "jsonp",
        success: callBack
    });

});