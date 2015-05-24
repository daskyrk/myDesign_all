/**
 * Created by Jun on 2015/3/30.
 */
define(function (require, exports, module) {

    var unEqualLineChartView = Backbone.View.extend({

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
                if (data[i * 2][0] != "标题") {
                    legend.push(data[i * 2][0]);
                }
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
                    axisPointer: {
                        show: true,
                        type: 'cross',
                        lineStyle: {
                            type: 'dashed',
                            width: 1
                        }
                    },
                    formatter: function (params) {
                        return params.seriesName + ' : [ '
                            + params.value[0] + ', '
                            + params.value[1] + ' ]';
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
                        magicType: {show: true, type: ['line', 'bar']},
                        restore: {show: true},
                        saveAsImage: {show: true}
                    }
                },
                calculable: true,
                xAxis: [
                    {
                        type: 'value'
                    }
                ],
                yAxis: [
                    {
                        type: 'value',
                        axisLine: {
                            lineStyle: {
                                color: '#dc143c'
                            }
                        }
                    }
                ],
                series: [
                    {
                        name: legend[0],
                        type: 'line',
                        data: seriesData[0],
                        markPoint: {
                            data: [
                                // 纵轴，默认
                                {
                                    type: 'max',
                                    name: '最大值',
                                    symbol: 'emptyCircle',
                                    itemStyle: {normal: {color: '#dc143c', label: {position: 'top'}}}
                                },
                                {
                                    type: 'min',
                                    name: '最小值',
                                    symbol: 'emptyCircle',
                                    itemStyle: {normal: {color: '#dc143c', label: {position: 'bottom'}}}
                                },
                                // 横轴
                                {
                                    type: 'max',
                                    name: '最大值',
                                    valueIndex: 0,
                                    symbol: 'emptyCircle',
                                    itemStyle: {normal: {color: '#1e90ff', label: {position: 'right'}}}
                                },
                                {
                                    type: 'min',
                                    name: '最小值',
                                    valueIndex: 0,
                                    symbol: 'emptyCircle',
                                    itemStyle: {normal: {color: '#1e90ff', label: {position: 'left'}}}
                                }
                            ]
                        },
                        markLine: {
                            data: [
                                // 纵轴，默认
                                {type: 'max', name: '最大值', itemStyle: {normal: {color: '#dc143c'}}},
                                {type: 'min', name: '最小值', itemStyle: {normal: {color: '#dc143c'}}},
                                {type: 'average', name: '平均值', itemStyle: {normal: {color: '#dc143c'}}},
                                // 横轴
                                {type: 'max', name: '最大值', valueIndex: 0, itemStyle: {normal: {color: '#1e90ff'}}},
                                {type: 'min', name: '最小值', valueIndex: 0, itemStyle: {normal: {color: '#1e90ff'}}},
                                {type: 'average', name: '平均值', valueIndex: 0, itemStyle: {normal: {color: '#1e90ff'}}}
                            ]
                        }
                    },
                    {
                        name: legend[1],
                        type: 'line',
                        data: seriesData[1]
                    }
                ]
            };

            //为echarts对象加载数据
            myChart.setOption(option);
            window.charts.push(myChart);
        }

    });

    module.exports = unEqualLineChartView;
});