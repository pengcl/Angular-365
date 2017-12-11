//map
function Map() {
    var struct = function (key, value) {
        this.key = key;
        this.value = value;
    };
    var put = function (key, value) {
        for (var i = 0; i < this.arr.length; i++) {
            if (this.arr[i].key === key) {
                this.arr[i].value = value;
                return;
            }
        }
        this.arr[this.arr.length] = new struct(key, value);
    };

    var get = function (key) {
        for (var i = 0; i < this.arr.length; i++) {
            if (this.arr[i].key === key) {
                return this.arr[i].value;
            }
        }
        return null;
    };

    var remove = function (key) {
        var v;
        for (var i = 0; i < this.arr.length; i++) {
            v = this.arr.pop();
            if (v.key === key) {
                continue;
            }
            this.arr.unshift(v);
        }
    };
    var size = function () {
        return this.arr.length;
    };

    var isEmpty = function () {
        return this.arr.length <= 0;
    };
    this.arr = new Array();
    this.get = get;
    this.put = put;
    this.remove = remove;
    this.size = size;
    this.isEmpty = isEmpty;
}

//统计
function operation() {
    var pageName = "";
    var productName = "";
    var productId = "";
    var map = null;
    var loc = window.location.href;
    this.init = function (pName, pdName, pdId) {
        pageName = pName;
        productName = pdName;
        productId = pdId;
    };
    this.record = function (type) {
        if (type == null) {
            return false;
        }
        map = new Map();
        map.put('operation', type);
        this.writeOperation();
    };
    this.writeOperation = function () {
        var flag = false;
        var info = "flow=" + loc + "&operation=" + map.get('operation');
        info = info.replace("?", "&");//将链接里的？字符转换为&，可以让后台获取
        var url = "http://m.yfq.cn/record/writeLog.html?" + info + "&s=wap";
        $.ajax({
            type: "get",
            url: url,
            dataType: "jsonp",
            jsonp: "callback",
            jsonpCallback: "callback",
            success: function (json) {

            },
            error: function () {

            }
        });
        return flag;
    };
    this.writeIntentionMsg = function (operationName, operationValue, dataType, opSeq) {
        var url = "http://m.yfq.cn/record/intentionLog.html";
        $.get(url, {operationName: operationName, operationValue: operationValue, dataType: dataType, opSeq: opSeq},
            function (data) {

            }
        );
    }
}

var op = new operation();

function writebdLog(category, action) {//category项目，action统计项目，渠道label，渠道号
    //_hmt.push(['_trackEvent', category, category + action, opt_label, opt_value]);
    op.record(encodeURI(category + action));
}

function getRandomName() {
    var firstNames, lastNames;
    firstNames = ["卢", "钟", "朱", "彭", "梁", "卫", "蒋", "许", "张", "孔", "沈", "郑", "赵", "周", "吕", "韩", "尤", "秦", "楮", "李"];
    lastNames = ["先生", "女士"];
    var fid = Math.round(Math.random() * 19);
    var lid = Math.round(Math.random() * 1);
    return firstNames[fid] + lastNames[lid];
}

var baseTime = 1;

function getRanDomTime() {
    var addTime = Math.round(Math.random() * 1);
    baseTime = baseTime + addTime;
    if (baseTime > 10) {
        baseTime = Math.round(Math.random() * 1) + 1;
    }
    return baseTime;
}

function getRandomPrePhone() {
    var pkgs, pid;
    pkgs = ['130', '131', '132', '138', '139', '150'];
    pid = Math.round(Math.random() * 5);
    return pkgs[pid];
}

function getRandomPhone() {
    return ((("18122XXX" + Math.round(Math.random() * 9)) + Math.round(Math.random() * 9)) + Math.round(Math.random() * 9)) + Math.round(Math.random() * 9);
}

function getRandomReceiverPhone() {
    return (((getRandomPrePhone() + "****" + Math.round(Math.random() * 9)) + Math.round(Math.random() * 9)) + Math.round(Math.random() * 9)) + Math.round(Math.random() * 9);
}

function getRandomProduct(products) {
    var index = Math.round(Math.random() * 5);
    return products[index].productname;
}

function clearCookie() {
    var keys = document.cookie.match(/[^ =;]+(?=\=)/g);
    if (keys) {
        for (var i = keys.length; i--;)
            document.cookie = keys[i] + '=0;expires=' + new Date(0).toUTCString()
    }
}

$(document).ready(function () {
    var $container = $("#container");
    $("html").css("font-size", ($container.width() / 375) * parseInt($("html").css("font-size")));
});