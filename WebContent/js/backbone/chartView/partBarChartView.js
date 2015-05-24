/**
 * Created by Jun on 2015/5/22.
 */
define(function (require, exports, module) {

    var partBarChartView = Backbone.View.extend({

        render: function (chartAreaId, defaultOption, chartData) {
            //基于准备好的dom，初始化echarts图表
            var myChart = echarts.init(document.getElementById(chartAreaId), 'macarons');

            var temp_series_data = [];
            temp_series_data.push(0);
            temp_series_data.push(chartData.series_data[0][0] - chartData.series_data[0][1]);
            for (var i = 2; i < chartData.series_data[0].length; i++) {
                temp_series_data.push(temp_series_data[i - 1] - chartData.series_data[0][i]);
            }
            var option = {
                title: chartData.title,
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                        type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                    },
                    formatter: function (params) {
                        var tar = params[0];
                        return tar.name + '<br/>' + tar.seriesName + ' : ' + tar.value;
                    }
                },
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
                        itemStyle: {normal: {label: {show: true, position: 'inside'}}},
                        data: chartData.series_data[0]
                    }
                ]
            };

            //为echarts对象加载数据
            myChart.setOption(option);
            window.charts.push(myChart);
        }

    });

    module.exports = partBarChartView;
});