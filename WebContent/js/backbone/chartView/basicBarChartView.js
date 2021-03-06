/**
 * Created by Jun on 2015/3/30.
 */
define(function (require, exports, module) {

    var basicBarChartView = Backbone.View.extend({

        render: function (chartAreaId, xAxis_data, series_name, series_data) {
            //基于准备好的dom，初始化echarts图表
            var myChart = echarts.init(document.getElementById(chartAreaId), 'macarons');

            var temp_series = new Array();
            for (var i = 0; i < series_data.length; i++) {
                var seriesItem = {
                    "name": series_name[i],
                    "type": "bar",
                    "data": series_data[i]
                }
                temp_series.push(seriesItem);
            }
            var option = {
                tooltip: {
                    show: true
                },
                legend: {
                    data: series_name
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
                xAxis: [
                    {
                        type: 'category',
                        data: xAxis_data
                    }
                ],
                yAxis: [
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

    module.exports = basicBarChartView;
});