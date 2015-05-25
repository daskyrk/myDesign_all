/**
 * Created by Jun on 2015/5/4.
 */
define(function (require, exports, module) {

    var basicAreaChartView = Backbone.View.extend({

        render: function (chartAreaId, defaultOption, chartData) {
            //基于准备好的dom，初始化echarts图表
            var myChart = echarts.init(document.getElementById(chartAreaId), 'macarons');

            var temp_series = [];
            for (var i = 0; i < chartData.series_data.length; i++) {
                var seriesItem = {
                    name: chartData.series_name[i],
                    type: "line",
                    smooth: true,
                    itemStyle: {normal: {areaStyle: {type: 'default'}}},
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
                toolbox: {
                    show: true,
                    orient: 'vertical',
                    feature: {
                        mark: {show: true},
                        dataView: {show: true, readOnly: false},
                        magicType: {show: true, type: ['line', 'bar', 'stack', 'tiled']},
                        restore: {show: true},
                        saveAsImage: {show: true}
                    }
                },
                calculable: true,
                xAxis: [
                    {
                        type: 'category',
                        boundaryGap: false,
                        data: chartData.xAxis_data
                    }
                ],
                yAxis: defaultOption.yAxis,
                series: temp_series
            };

            //为echarts对象加载数据
            myChart.setOption(option);
            window.charts.push(myChart);
        }

    });

    module.exports = basicAreaChartView;
});