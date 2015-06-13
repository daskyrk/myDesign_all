/**
 * Created by Jun on 2015/5/4.
 */
define(function (require, exports, module) {

    var barAndLineChartView = Backbone.View.extend({

        render: function (chartAreaId, defaultOption, chartData) {
            //基于准备好的dom，初始化echarts图表
            var myChart = echarts.init(document.getElementById(chartAreaId), 'macarons');

            var temp_series = [];
            var dataLength = chartData.series_data.length;
            for (var i = 0; i < dataLength; i++) {
                var seriesItem = {
                    name: chartData.series_name[i],
                    type: "bar",
                    data: chartData.series_data[i]
                };
                temp_series.push(seriesItem);
            }
            temp_series[dataLength - 1].type = "line";
            temp_series[dataLength - 1].yAxisIndex = 1;
            var option = {
                tooltip: {
                    trigger: 'axis'
                },
                toolbox: {
                    show: true,
                    orient: 'vertical',
                    feature: {
                        mark: {show: true},
                        dataView: {show: true, readOnly: false},
                        magicType: {show: true, type: ['line', 'bar']},
                        restore: {show: true},
                        saveAsImage: {show: true}
                    }
                },
                calculable: true,
                legend: {data: chartData.series_name},
                xAxis: [
                    {
                        type: 'category',
                        data: chartData.xAxis_data
                    }
                ],
                yAxis: [
                    {
                        type: 'value'
                    },
                    {
                        type: 'value'
                    }
                ],
                series: temp_series
            };

            //为echarts对象加载数据
            myChart.setOption(option);
            window.charts.push(myChart);
        }

    });

    module.exports = barAndLineChartView;
});