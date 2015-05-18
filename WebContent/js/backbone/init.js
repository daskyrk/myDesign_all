/**
 * Created by Jun on 2015/3/30.
 */
define(function (require, exports, module) {
    var init = $(function () {

        //新增图表区域
        var addChartJs = require("./addChart");
        addChartJs.addChart();

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

        //图表区域的图表选项点击响应
        $(document).on("click", ".chart-options", function () {
            alert("begin");
            changeOption();
            alert("end");
        });
        //拖拽排序
        //$("#sortable").sortable();
        //$("#sortable").disableSelection();

        //PortletDraggable.init();

        //刷新、关闭页面确认
        //window.onbeforeunload = function() {
        //    return "请注意：离开后会导致当前数据丢失"
        //}

        /**
         * 改变图表属性
         */
        function changeOption() {
            _this = $(this);
            var chartAreaDom = _this.parents(".portlet-title").next().children(".chartArea");
            alert(chartAreaDom.id);
            var charts = window.charts;
            for (var i = 0; i < charts.length; i++) {
                if (charts[i].dom.id == chartAreaDom.id) {
                    alert("this");
                    var option = charts[i].chart.getOption();
                    option.toolbox == null;
                    charts[i].chart.setOption(option);
                }
            }
        }

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


    //$(document).on("click", "input.chart-options", function () {
    //    _this = $(this);
    //    var chartAreaDom = _this.parents(".portlet-title").next().children(".chartArea");
    //    alert(chartAreaDom.id);
    //    var charts = window.charts;
    //    for (var i = 0; i < charts.length; i++) {
    //        if (charts[i].dom.id == chartAreaDom.id) {
    //            alert("this");
    //            var option = charts[i].chart.getOption();
    //            option.toolbox == null;
    //            charts[i].chart.setOption(option);
    //        }
    //    }
    //});

    module.exports = init;

});