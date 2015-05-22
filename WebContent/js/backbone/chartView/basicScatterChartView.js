/**
 * Created by Jun on 2015/5/4.
 */
define(function (require, exports, module) {

    var basicScatterChartView = Backbone.View.extend({

        id: "",

        init: function () {
            //this.id = "barChart" + $("div[id^='chart']").length;
        },

        render: function (chartAreaId, data) {
            //基于准备好的dom，初始化echarts图表
            var myChart = echarts.init(document.getElementById(chartAreaId), 'macarons');

            var seriesNum = Math.ceil(data.length / 2);//横纵轴算一组，有几组数据
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
                title: {
                    text: '男性女性身高体重分布',
                    subtext: '抽样调查来自: Heinz  2003'
                },
                tooltip: {
                    trigger: 'axis',
                    showDelay: 0,
                    formatter: function (params) {
                        if (params.value.length > 1) {
                            return params.seriesName + ' :<br/>'
                                + params.value[0] + 'cm '
                                + params.value[1] + 'kg ';
                        }
                        else {
                            return params.seriesName + ' :<br/>'
                                + params.name + ' : '
                                + params.value + 'kg ';
                        }
                    },
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
            //return this;
        },

        events: {
//            "click $('div[id^=\'chart\']:last')[0]": "addNew"
        },

        addNew: function () {//新增图表
            alert('new');
        }

    });

    module.exports = basicScatterChartView;
});