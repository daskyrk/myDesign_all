/**
 * Created by Jun on 2015/5/4.
 */
define(function (require, exports, module) {

    var stackBarChartView = Backbone.View.extend({

        render: function (chartAreaId, defaultOption) {
            //基于准备好的dom，初始化echarts图表
            var myChart = echarts.init(document.getElementById(chartAreaId), 'macarons');

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
        }

    });

    module.exports = stackBarChartView;
});