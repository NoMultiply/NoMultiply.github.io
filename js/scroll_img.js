///<reference path='jquery-3.2.1.min.js' />
/**
 * Created by Jsy on 2017/7/24.
 */

$(function () {
    /*未元素的首尾添加补白*/
    var $panels = $('#slider .scrollContainer > li');
    var $parent = $panels.parent();
    var $length = $panels.length;
    var $first = $panels.eq(0).clone().addClass("panel cloned").attr("id", 'panel_' + ($length + 1));
    var $last = $panels.eq($length - 1).clone().addClass("cloned").attr("id", 'panel_0');
    $parent.append($first);
    $parent.prepend($last);
    var totalPanels = $(".scrollContainer").get(0).children.length;
    /*var regWidth = $(".panel").css("width");
    var regImgWidth = $(".panel img").css("width");*/
    var length;
    var movingDistance;
    var curWidth;
    var curHeight;
    var curImgWidth;
    var curImgHeight;
    var othersW;
    var othersH;
    var othersImgW;
    var othersImgH;
    var updata_size = () => {
        length = document.body.clientHeight < document.body.clientWidth ? document.body.clientHeight : document.body.clientWidth;
        movingDistance = 195 * length / 1080;
        curWidth = 230 * length / 1080;
        curHeight = 312 * length / 1080;
        curImgWidth = 230 * length / 1080;
        curImgHeight = 288 * length / 1080;
        othersW = 170 * length / 1080;
        othersH = 235 * length / 1080;
        othersImgW = 170 * length / 1080;
        othersImgH = 213 * length / 1080;
        $panels.css({ width: othersW, height: othersH }).find('img').css({ width: othersImgW, height: othersImgH });
        $('#panel_' + curPanel).css({ width: curWidth, height: curHeight }).find('img').css({ width: curImgWidth, height: curImgHeight });
        var movement = -(curPanel - 1) * movingDistance;
        $(".scrollContainer").css({ "left": movement });
    }
    window.addEventListener('resize', updata_size);
    var $panels = $('#slider .scrollContainer > li');
    var $container = $('#slider .scrollContainer');
    $panels.css({ 'float': 'left', 'position': 'relative' });
    $("#slider").data("currentlyMoving", false);
    //$container.css('width', 1815);
    //(($panels[0].offsetWidth+25) * $panels.length) + 60 ).css('left','0')
    var scroll = $('#slider .scroll').css('overflow', 'hidden');
    function returnToNormal(element) {
        $(element).animate({ width: othersW, height: othersH }).find("img").animate({ width: othersImgW, height: othersImgH });
    };
    function growBigger(element) {
        $(element).addClass("current").animate({ width: curWidth, height: curHeight }).siblings().removeClass("current")
          .end().find("img").animate({ width: curImgWidth, height: curImgHeight })
    }
    //direction true = right, false = left
    function change(direction) {
        //if not at the first or last panel
        if ((direction && !(curPanel < totalPanels - 2)) || (!direction && (curPanel <= 1))) {
            return false;
        }
        //if not currently moving
        if (($("#slider").data("currentlyMoving") == false)) {
            $("#slider").data("currentlyMoving", true);
            var next = direction ? curPanel + 1 : curPanel - 1;
            var leftValue = $(".scrollContainer").css("left");
            var movement = direction ? parseFloat(leftValue, 10) - movingDistance : parseFloat(leftValue, 10) + movingDistance;
            $(".scrollContainer").stop().animate({ "left": movement }, function () {
                $("#slider").data("currentlyMoving", false);
            });
            returnToNormal("#panel_" + curPanel);
            growBigger("#panel_" + next);
            curPanel = next;
            //remove all previous bound functions
            $("#panel_" + (curPanel + 1)).unbind();
            //go forward
            $("#panel_" + (curPanel + 1)).click(function () { change(true); });
            //remove all previous bound functions
            $("#panel_" + (curPanel - 1)).unbind();
            //go back
            $("#panel_" + (curPanel - 1)).click(function () { change(false); });
            //remove all previous bound functions
            $("#panel_" + curPanel).unbind();
        }
    }
    // Set up "Current" panel and next and prev 设置当前元素和上下
    var curPanel = 1;
    updata_size();
    growBigger('#panel_1');
    $("#panel_" + (curPanel + 1)).click(function () { change(true); return false; });
    $("#panel_" + (curPanel - 1)).click(function () { change(false); return false; });
    //when the prev/next arrows are clicked
    $("#slider .next").click(function () { change(true); });
    $("#slider .prev").click(function () { change(false); });
    $(window).keydown(function (event) {//键盘方向键控制
        switch (event.keyCode) {
            case 13: //enter
                $(".next").click();
                break;
            case 37: //prev arrow
                $(".prev").click();
                break;
            case 39: //next arrow
                $(".next").click();
                break;
        }
    });
});
