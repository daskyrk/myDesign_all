/**
 * Created by Jun on 2015/5/22.
 */
define(function (require, exports, module) {

    var ladderBarChartView = Backbone.View.extend({

        id: "",

        init: function () {
            //this.id = "barChart" + $("div[id^='chart']").length;
        },

        render: function (chartAreaId, xAxis_data, series_name, series_data) {
            //基于准备好的dom，初始化echarts图表
            var myChart = echarts.init(document.getElementById(chartAreaId), 'macarons');

            var temp_series_data = [];
            var toggleArray = [];//辅助bar切换上下边
            temp_series_data.push(0);
            for (var i = 0; i < series_data[0].length - 1; i++) {
                if (series_data[0][0] != 0) {//如果第一个数组开始不为0，则加第一个数组
                    if (series_data[0][i + 1] == 0) {//转折
                        temp_series_data.push(temp_series_data[i] + parseInt(series_data[0][i]) - parseInt(series_data[1][i + 1]));
                    } else {
                        temp_series_data.push(temp_series_data[i] + parseInt(series_data[0][i]));
                    }
                } else {//第二个数组开始不为0
                    if (series_data[1][i + 1] == 0) {//转折
                        temp_series_data.push(temp_series_data[i] + parseInt(series_data[1][i]) - parseInt(series_data[0][i + 1]));
                    } else {
                        temp_series_data.push(temp_series_data[i] + parseInt(series_data[1][i]));
                    }
                }
            }
            for (var j = 0; j < series_data[0].length; j++) {
                if (series_data[0][j] == 0) {
                    series_data[0][j] = "-";
                }
                if (series_data[1][j] == 0) {
                    series_data[1][j] = "-";
                }
            }
            var option = {
                title: {
                    text: '阶梯瀑布图',
                    subtext: 'From ExcelHome',
                    sublink: 'http://e.weibo.com/1341556070/Aj1J2x5a5'
                },
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
                legend: {
                    data: series_name
                },
                toolbox: {
                    show: true,
                    orient: 'vertical',
                    feature: {
                        mark: {show: true},
                        dataView: {show: true, readOnly: false},
                        restore: {show: true},
                        saveAsImage: {show: true}
                    }
                },
                xAxis: [
                    {
                        type: 'category',
                        splitLine: {show: false},
                        data: xAxis_data
                    }
                ],
                yAxis: [
                    {
                        type: 'value'
                    }
                ],
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
                        name: '收入',
                        type: 'bar',
                        stack: '总量',
                        itemStyle: {
                            normal: {
                                label: {
                                    show: true, position: 'top'
                                }
                            }
                        },
                        data: series_data[0]
                    },
                    {
                        name: '支出',
                        type: 'bar',
                        stack: '总量',
                        itemStyle: {
                            normal: {
                                label: {
                                    show: true, position: 'top'
                                }
                            }
                        },
                        data: series_data[1]
                    }
                ]
            };


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

    module.exports = ladderBarChartView;
});