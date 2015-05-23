/**
 * Created by 骏 on 2015/5/16.
 */
define(function (require, exports, module) {

    function render(chartAreaId, defaultOption) {
        //基于准备好的dom，初始化echarts图表
        var myChart = echarts.init(document.getElementById(chartAreaId));
        var option = {
            title: defaultOption.title,
            tooltip: defaultOption.tooltip,
            legend: defaultOption.legend,
            toolbox: defaultOption.toolbox,
            xAxis: defaultOption.xAxis,
            yAxis: defaultOption.yAxis,
            series: defaultOption.series,
            calculable: true
        };
        //为echarts对象加载数据
        myChart.setOption(option);
        window.charts.push(myChart);
        //return this;
    }

    var allChartView = {
        basicBarChartView: Backbone.View.extend({
            render: render
        }),
        basicAreaChartView: Backbone.View.extend({
            render: render
        })
    };

    module.exports = allChartView;
});