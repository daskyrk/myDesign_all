/**
 * Created by Jun on 2015/5/4.
 */
define(function (require, exports, module) {

    var multiRadarChartView = Backbone.View.extend({

        render: function (chartAreaId, chartData) {
            //基于准备好的dom，初始化echarts图表
            var myChart = echarts.init(document.getElementById(chartAreaId), 'macarons');

            var series_data = [], indicator_data = [];
            var seriesNum = chartData.series_name.length;
            var serieItemNum = chartData.series_data[0].length;
            var itemMax = [];//每个方面的最大值
            for (var i = 0; i < seriesNum; i++) {//每个系列
                var item = {
                    name: chartData.series_name[i],
                    value: chartData.series_data[i]
                };
                series_data.push(item);
            }
            for (var i = 0; i < serieItemNum; i++) {//每个系列的方面
                var temp = [];
                for (var j = 0; j < seriesNum; j++) {
                    temp.push(chartData.series_data[j][i]);
                }
                itemMax.push(Math.max.apply(null, temp));
                var indicator_item = {
                    text: chartData.xAxis_data[i],
                    max: itemMax[i] * 1.1
                };
                indicator_data.push(indicator_item);
            }
            var option = {
                color: (function () {
                    var zrColor = require('ref/zrender/color');
                    return zrColor.getStepColors('yellow', 'red', series_data.length);
                })(),
                title: chartData.title,
                tooltip: {
                    trigger: 'item',
                    backgroundColor: 'rgba(0,0,250,0.2)'
                },
                legend: {
                    orient: 'vertical',
                    x: 'left',
                    y: 'center',
                    data: chartData.series_name
                },
                toolbox: {
                    show: true,
                    orient: 'vertical',
                    y: 'center',
                    feature: {
                        mark: {show: true},
                        dataView: {show: true, readOnly: false},
                        restore: {show: true},
                        saveAsImage: {show: true}
                    }
                },
                polar: [
                    {
                        indicator: indicator_data,
                        center: ['65%', 150],
                        radius: 120
                    }
                ],
                calculable: false,
                series: (function () {
                    var series = [];
                    for (var i = 0; i < series_data.length; i++) {
                        series.push({
                            name: chartData.title,
                            type: 'radar',
                            symbol: 'none',
                            itemStyle: {
                                normal: {
                                    lineStyle: {
                                        width: 1
                                    }
                                },
                                emphasis: {
                                    areaStyle: {color: 'rgba(0,250,0,0.3)'}
                                }
                            },
                            data: [
                                {
                                    value: series_data[i].value,
                                    name: series_data[i].name
                                }
                            ]
                        })
                    }
                    return series;
                })()
            };

            //为echarts对象加载数据
            myChart.setOption(option);
            window.charts.push(myChart);
        }

    });

    module.exports = multiRadarChartView;
});