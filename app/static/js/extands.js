$(document).ready(function () {
    var $container = $("#container");
    $("html").css("font-size", ($container.width() / 375) * parseInt($("html").css("font-size")));
});