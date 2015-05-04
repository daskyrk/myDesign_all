/**
 * Created by Jun on 2015/3/30.
 */
define(function (require, exports, module) {
    $(document).ready(function () {
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

        //缩放所有图表
        function resizeAllCharts() {
            setTimeout(function () {
                for (var i = 0; i < window.charts.length; i++) {
                    window.charts[i].resize();
                }
            }, 10)
        }
    });

});