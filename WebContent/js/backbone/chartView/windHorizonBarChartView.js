/**
 * Created by Jun on 2015/3/30.
 */
define(function (require, exports, module) {

    var windHorizonBarChartView = Backbone.View.extend({

        render: function (chartAreaId, defaultOption, chartData) {
            //基于准备好的dom，初始化echarts图表
            var myChart = echarts.init(document.getElementById(chartAreaId), 'macarons');

            var temp_series = [];
            for (var i = 0; i < chartData.series_data.length; i++) {
                var seriesItem = {
                    name: chartData.series_name[i],
                    type: "bar",
                    stack: '总量',
                    itemStyle: {normal: {label: {show: true, position: 'inside'}}},
                    data: chartData.series_data[i]
                };
                temp_series.push(seriesItem);
            }
            var option = {
                tooltip: defaultOption.tooltip,
                legend: defaultOption.legend,
                toolbox: defaultOption.toolbox,
                calculable: true,
                xAxis: [
                    {
                        type: 'value'
                    }
                ],
                yAxis: [
                    {
                        type: 'category',
                        axisTick: {show: false},
                        data: chartData.xAxis_data
                    }
                ],
                series: temp_series
            };

            //为echarts对象加载数据
            myChart.setOption(option);
            window.charts.push(myChart);
        }

    });

    module.exports = windHorizonBarChartView;
});