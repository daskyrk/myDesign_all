/**
 * Created by Jun on 2015/5/4.
 */
define(function (require, exports, module) {

    var thermometerBarChartView = Backbone.View.extend({

        render: function (chartAreaId, defaultOption, chartData) {
            //基于准备好的dom，初始化echarts图表
            var myChart = echarts.init(document.getElementById(chartAreaId), 'macarons');

            var option = {
                title: chartData.title,
                tooltip: defaultOption.tooltip,
                legend: defaultOption.legend,
                toolbox: defaultOption.toolbox,
                calculable: true,
                xAxis: defaultOption.xAxis,
                yAxis: [
                    {
                        type: 'value',
                        boundaryGap: [0, 0.1]
                    }
                ],
                series: [
                    {
                        name: chartData.series_name[0],
                        type: 'bar',
                        stack: 'sum',
                        barCategoryGap: '50%',
                        itemStyle: {
                            normal: {
                                color: 'tomato',
                                barBorderColor: 'tomato',
                                barBorderWidth: 3,
                                barBorderRadius: 0,
                                label: {
                                    show: true, position: 'insideTop'
                                }
                            }
                        },
                        data: chartData.series_data[0]
                    },
                    {
                        name: chartData.series_name[1],
                        type: 'bar',
                        stack: 'sum',
                        itemStyle: {
                            normal: {
                                color: '#fff',
                                barBorderColor: 'tomato',
                                barBorderWidth: 3,
                                barBorderRadius: 0,
                                label: {
                                    show: true,
                                    position: 'top',
//                                    formatter: function (params) {
//                                        for (var i = 0, l = option.xAxis[0].data.length; i < l; i++) {
//                                            if (option.xAxis[0].data[i] == params.name) {
//                                                return option.series[0].data[i] + params.value;
//                                            }
//                                        }
//                                    },
                                    textStyle: {
                                        color: 'tomato'
                                    }
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
            //return this;
        }

    });

    module.exports = thermometerBarChartView;
});