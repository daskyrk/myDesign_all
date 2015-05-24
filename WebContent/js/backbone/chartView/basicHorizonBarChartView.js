/**
 * Created by Jun on 2015/3/30.
 */
define(function (require, exports, module) {

    var basicHorizonBarChartView = Backbone.View.extend({

        render: function (chartAreaId, defaultOption, chartData) {
            //基于准备好的dom，初始化echarts图表
            var myChart = echarts.init(document.getElementById(chartAreaId), 'macarons');

            var option = {
                title: defaultOption.title,
                tooltip: {
                    trigger: 'axis'
                },
                legend: defaultOption.legend,
                toolbox: defaultOption.toolbox,
                calculable: true,
                xAxis: [
                    {
                        type: 'value',
                        boundaryGap: [0, 0.01]
                    }
                ],
                yAxis: [
                    {
                        type: 'category',
                        data: chartData.xAxis_data
                    }
                ],
                series: defaultOption.series
            };

            //为echarts对象加载数据
            myChart.setOption(option);
            window.charts.push(myChart);
        }

    });

    module.exports = basicHorizonBarChartView;
});