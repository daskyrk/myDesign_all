/**
 * Created by Jun on 2015/5/22.
 */
define(function (require, exports, module) {

    var ladderBarChartView = Backbone.View.extend({

        render: function (chartAreaId, defaultOption, chartData) {
            //基于准备好的dom，初始化echarts图表
            var myChart = echarts.init(document.getElementById(chartAreaId), 'macarons');

            var temp_series_data = [];
            temp_series_data.push(0);
            for (var i = 0; i < chartData.series_data[0].length - 1; i++) {
                if (chartData.series_data[0][0] != 0) {//如果第一个数组开始不为0，则加第一个数组
                    if (chartData.series_data[0][i + 1] == 0) {//转折
                        temp_series_data.push(temp_series_data[i] + parseInt(chartData.series_data[0][i]) - parseInt(chartData.series_data[1][i + 1]));
                    } else {
                        temp_series_data.push(temp_series_data[i] + parseInt(chartData.series_data[0][i]));
                    }
                } else {//第二个数组开始不为0
                    if (chartData.series_data[1][i + 1] == 0) {//转折
                        temp_series_data.push(temp_series_data[i] + parseInt(chartData.series_data[1][i]) - parseInt(chartData.series_data[0][i + 1]));
                    } else {
                        temp_series_data.push(temp_series_data[i] + parseInt(chartData.series_data[1][i]));
                    }
                }
            }
            for (var j = 0; j < chartData.series_data[0].length; j++) {
                if (chartData.series_data[0][j] == 0) {
                    chartData.series_data[0][j] = "-";
                }
                if (chartData.series_data[1][j] == 0) {
                    chartData.series_data[1][j] = "-";
                }
            }
            var option = {
                title: defaultOption.title,
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                        type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                    },
                    formatter: function (params) {
                        var tar;
                        if (params[1].value != '-') {
                            tar = params[1];
                        }
                        else {
                            tar = params[0];
                        }
                        return tar.name + '<br/>' + tar.seriesName + ' : ' + tar.value;
                    }
                },
                legend: defaultOption.legend,
                toolbox: defaultOption.toolbox,
                xAxis: defaultOption.xAxis,
                yAxis: defaultOption.yAxis,
                series: [
                    {
                        name: '辅助',
                        type: 'bar',
                        stack: '总量',
                        itemStyle: {
                            normal: {
                                barBorderColor: 'rgba(0,0,0,0)',
                                color: 'rgba(0,0,0,0)'
                            },
                            emphasis: {
                                barBorderColor: 'rgba(0,0,0,0)',
                                color: 'rgba(0,0,0,0)'
                            }
                        },
                        data: temp_series_data
                    },
                    {
                        name: chartData.series_name[0],
                        type: 'bar',
                        stack: '总量',
                        itemStyle: {
                            normal: {
                                label: {
                                    show: true, position: 'top'
                                }
                            }
                        },
                        data: chartData.series_data[0]
                    },
                    {
                        name: chartData.series_name[1],
                        type: 'bar',
                        stack: '总量',
                        itemStyle: {
                            normal: {
                                label: {
                                    show: true, position: 'bottom'
                                }
                            }
                        },
                        data: chartData.series_data[1]
                    }
                ]
            };

            //为echarts对象加载数据
            myChart.setOption(option);
            window.charts.push(myChart);
        }

    });

    module.exports = ladderBarChartView;
});