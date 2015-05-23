/**
 * Created by Jun on 2015/5/4.
 */
define(function (require, exports, module) {

    var basicLineChartView = Backbone.View.extend({

        render: function (chartAreaId, defaultOption, chartData) {
            //基于准备好的dom，初始化echarts图表
            var myChart = echarts.init(document.getElementById(chartAreaId), 'macarons');

            var temp_series = [];
            for (var i = 0; i < chartData.series_data.length; i++) {
                var seriesItem = {
                    name: chartData.series_name[i],
                    type: "line",
                    stack: '总量',
                    smooth: true,
                    data: chartData.series_data[i]
                };
                temp_series.push(seriesItem);
            }

            var option = {
                title: defaultOption.title,
                tooltip: {
                    trigger: 'axis'
                },
                legend: defaultOption.legend,
                toolbox: defaultOption.toolbox,
                xAxis: defaultOption.xAxis,
                yAxis: defaultOption.yAxis,
                series: temp_series,
                calculable: true
            };

            //为echarts对象加载数据
            myChart.setOption(option);
            window.charts.push(myChart);
        }

    });

    module.exports = basicLineChartView;
});