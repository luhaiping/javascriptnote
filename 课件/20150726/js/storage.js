var storage = (function () {
    var flag = window.localStorage ? true : false;
    return {
        set: function (name, value, expires, path, domain) {
            if (flag) {
                localStorage.setItem(name, escape(value));
                return;
            }
            var time = new Date(new Date().getTime() + 2592000000);
            expires = expires || time;
            path = path || "/";
            domain = domain || "";
            document.cookie = name + "=" + escape(value) + ";expires=" + expires.toGMTString() + ";path=" + path + ";domain=" + domain;
        },
        get: function (name) {
            if (flag) {
                return unescape(localStorage.getItem(name));
            }
            var arr = document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
            if (arr != null) {
                return unescape(arr[2]);
            }
            return null;
        },
        clear: function (name, path, domain) {
            if (this.get(name)) {
                if (flag) {
                    localStorage.removeItem(name);
                    return;
                }
                path = path || "/";
                domain = domain || "";
                document.cookie = name + "=;" + path + ";" + domain + ";expires=Fri, 02-Jan-1970 00:00:00 GMT";
            }
        }
    };
})();