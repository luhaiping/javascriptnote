//获取最大值和最小值
//var ary = [12, 23, 34, 45, 56];
//1、
//Math.max.apply(null, ary);
//Math.min.apply(null, ary);

//2、
//var max = min = ary[0];
//for (var i = 1; i < ary.length; i++) {
//    var cur = ary[i];
//    max = cur > max ? cur : max;
//    min = cur < min ? cur : min;
//}
//console.log(max, min);


var utils = {
    listToArray: function (likeAry) {
        var ary = [];
        try {
            ary = Array.prototype.slice.call(likeAry, 0);
        } catch (e) {
            for (var i = 0; i < likeAry.length; i++) {
                ary[i] = likeAry[i];
            }
        }
        return ary;
    },
    isType: function (value, type) {
        //return Object.prototype.toString.call(value) === "[object " + type + "]";
        var getVal = Object.prototype.toString.call(value);
        var tarVal = "[object " + type + "]";
        return getVal.toLowerCase() === tarVal.toLowerCase();
    }
};


////求平局数
//function sum() {
//    var ary = utils.listToArray(arguments);
//    ary.sort(function (a, b) {
//        return a - b;
//    });
//    ary.shift();
//    ary.pop();
//    //ary.length = ary.length - 1;
//    //ary[0] = ary[ary.length - 1];
//    //ary.length = ary.length - 1;
//
//    //var avg = Math.round((eval(ary.join("+"))) / ary.length);
//    var avg = (eval(ary.join("+"))) / ary.length;
//    console.log(avg.toFixed(2));//保留两位有效数字
//}
//sum(98, 87, 95, 96, 94, 90, 88, 80);