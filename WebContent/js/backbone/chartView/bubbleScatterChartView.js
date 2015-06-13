/**
 * Created by Jun on 2015/5/4.
 */
define(function (require, exports, module) {

    var bubbleScatterChartView = Backbone.View.extend({

        render: function (chartAreaId, defaultOption, data) {
            //基于准备好的dom，初始化echarts图表
            var myChart = echarts.init(document.getElementById(chartAreaId), 'macarons');

            var seriesNum = Math.floor(data.length / 2);//横纵轴算一组，有几组数据
            var maxLength = 0;//最长的一组数据的长度
            var legend = [];
            var seriesData = [];
            for (var i = 0; i < data.length; i++) {
                maxLength = maxLength > data[i].length ? maxLength : data[i].length;
            }
            for (var i = 0; i < seriesNum; i++) {
                legend.push(data[i * 2][0]);
            }
            for (var j = 0; j < seriesNum; j++) {
                var seriesItem = [];
                for (var i = 2; i < maxLength; i++) {
                    var temp = [];//每一个数据组
                    if (data[2 * j][i] == null)break;
                    temp.push(data[2 * j][i]);//数据组横轴值
                    temp.push(data[2 * j + 1][i]);//数据组纵轴值
                    seriesItem.push(temp);
                }
                seriesData.push(seriesItem);
            }
            var option = {
                title: defaultOption.title,
                tooltip: {
                    trigger: 'axis',
                    showDelay: 0,
                    axisPointer: {
                        show: true,
                        type: 'cross',
                        lineStyle: {
                            type: 'dashed',
                            width: 1
                        }
                    }
                },
                legend: {
                    data: legend
                },
                toolbox: {
                    show: true,
                    orient: 'vertical',
                    feature: {
                        mark: {show: true},
                        dataZoom: {show: true},
                        dataView: {show: true, readOnly: false},
                        restore: {show: true},
                        saveAsImage: {show: true}
                    }
                },
                xAxis: [
                    {
                        type: 'value',
                        scale: true,
                        axisLabel: {
                            formatter: '{value} cm'
                        }
                    }
                ],
                yAxis: [
                    {
                        type: 'value',
                        scale: true,
                        axisLabel: {
                            formatter: '{value} kg'
                        }
                    }
                ],
                series: []
            };

            for (var i = 0; i < seriesNum; i++) {
                option.series[i] = {
                    name: legend[i],
                    type: 'scatter',
                    symbolSize: function (value) {
                        return Math.round(3 * (value[0] / value[1]));
                    },
                    data: seriesData[i],
                    markPoint: {
                        data: [
                            {type: 'max', name: '最大值'},
                            {type: 'min', name: '最小值'}
                        ]
                    },
                    markLine: {
                        data: [
                            {type: 'average', name: '平均值'}
                        ]
                    }
                }
            }

            //为echarts对象加载数据
            myChart.setOption(option);
            window.charts.push(myChart);
        }

    });

    module.exports = bubbleScatterChartView;
});