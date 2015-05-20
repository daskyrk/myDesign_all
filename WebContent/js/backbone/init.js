/**
 * Created by Jun on 2015/3/30.
 */
define(function (require, exports, module) {
    var init = $(function () {

        //引导程序
        $("#intro").click(function () {
            var Intro = require("./intro");
            var tour = Intro.introJs();
            tour.setOption('tooltipPosition', 'auto');
            tour.setOption('tooltipClass', 'customDefault');
            tour.setOption('positionPrecedence', ['left', 'right', 'bottom', 'top']);
            tour.start();
            $("#intro_example").show();
        });

        //封装了点击后新增图表区域的方法
        var AddChartDiv = require("./addChartDiv");
        AddChartDiv.addChartDiv();

        /***********************图表动态缩放************************/
            //将所有图表实例对象放入全局空间
        window.charts = [];
        //点击左侧边栏切换按钮时重新缩放所有图表
        $(".sidebar-toggler").click(function () {
            resizeAllCharts();
        });
        //窗口大小变化时重新缩放所有图表
        $(window).resize(function () {
            resizeAllCharts();
        });

        /***********************单个图表区域刷新、缩放及关闭响应************************/
            //点击某个图表的刷新按钮时
        $(document).on("click", ".reload", function () {

        });

        //点击某个图表的删除按钮时，因为remove类已添加移除div的响应，所以只要移除空div外壳即可
        $(document).on("click", ".remove", function () {
            var divList = $("div.float-left");
            for (var i = 0; i < divList.length; i++) {
                if (divList[i].children.length < 1) {
                    divList[i].remove();
                }
            }
        });

        //点击某个图表的全屏按钮时重新缩放所有图表
        $(document).on("click", ".fullscreen", function () {
            if ($(this).parents(".portlet").hasClass("portlet-fullscreen")) {
                $("div[id^=chart]").height(600);
            } else {
                $("div[id^=chart]").height(300);
            }
            resizeAllCharts();
        });


        /***********************左侧菜单搜索响应************************/
            //左侧菜单搜索按钮点击响应
        $("#searchBtn").click(function () {
            serarchMenu();
        });
        //菜单搜索按钮回车键响应
        $("#searchMenu").focus().keydown(function (event) {
            switch (event.keyCode) {
                case 13:
                    serarchMenu();
            }
        });

        /********************图表区域的图表选项点击响应********************/
        $(document).on("click", ".btn-group a", function () {
            var checks = $(this).next().find(".chart-options");
            checks.click(function () {
                var option = [];
                for (var i = 0; i < checks.length; i++) {
                    option.push(checks[i].checked);//把checkbox的值放入数组
                }
                changeOption(this, option);//改变图表属性
            })
        });

        //拖拽排序
        PortletDraggable.init();

        //刷新、关闭页面确认
        //window.onbeforeunload = function () {
        //    return "请注意：离开后会导致当前数据丢失"
        //}

    });

    /**
     * 缩放所有图表
     */
    function resizeAllCharts() {
        $("div.portlet-fullscreen div[id^=chart]").height($(window).height() * 0.9);
        setTimeout(function () {
            for (var i = 0; i < window.charts.length; i++) {
                window.charts[i].resize();
            }
        }, 10)
    }


    /**
     * 搜索菜单
     */
    function serarchMenu() {
        var keyWord = $("#searchMenu").val();
        var menuList = [];
        var menus = $(".sub-menu > li");
        //隐藏所有列表项
        menus.removeClass("searchResult").parent().hide();
        if (keyWord == '') {
            //显示第一个列表项
            $(".start > ul").slideDown("fast");
            setTimeout(function () {
                $(".page-content").height($(".page-sidebar").height());
            }, 200);
            return;
        }
        for (var i = 0; i < menus.length; i++) {
            //取得每一个匹配的列表项放入数组
            menuList.push($(menus[i]).text().trim());
            //如果匹配
            if (menuList[i].indexOf(keyWord) > -1) {
                //增加样式，显示列表项
                $(menus[i]).addClass("searchResult").parent().slideDown();
            }
        }
        setTimeout(function () {
            $(".page-content").height($(".page-sidebar").height());
        }, 400);
    }

    /**
     * 改变图表属性
     */
    function changeOption(thisCheck, option) {
        var chartAreaDomId = $(thisCheck).parents(".portlet-title")//向上找祖先元素--标题
            .next().find(".chartArea").//找到标题部分后面内容里的绘图区域
            attr("id");//找到绘图区域的id
        var charts = window.charts;//获得所有已绘制的图表
        for (var i = 0; i < charts.length; i++) {
            if (charts[i].dom.id == chartAreaDomId) {
                window.charts[i].setOption({
                        title: {
                            show: option[0]
                        },
                        legend: {
                            show: option[1]
                        },
                        tooltip: {
                            show: option[2]
                        },
                        toolbox: {
                            show: option[3]
                        },
                        animation: option[4]
                    }
                );
            }
        }
    }


    module.exports = init;

})
;