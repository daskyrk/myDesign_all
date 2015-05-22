/**
 * Created by Jun on 2015/5/22.
 */
define(function (require, exports, module) {

    var partBarChartView = Backbone.View.extend({

        id: "",

        init: function () {
            //this.id = "barChart" + $("div[id^='chart']").length;
        },

        render: function (chartAreaId, xAxis_data, series_name, series_data) {
            //基于准备好的dom，初始化echarts图表
            var myChart = echarts.init(document.getElementById(chartAreaId), 'macarons');

            var temp_series_data = [];
            temp_series_data.push(0);
            temp_series_data.push(series_data[0][0] - series_data[0][1]);
            for (var i = 2; i < series_data[0].length; i++) {
                temp_series_data.push(temp_series_data[i - 1] - series_data[0][i]);
            }
            var option = {
                title: {
                    text: '深圳月最低生活费组成（单位:元）',
                    subtext: 'From ExcelHome',
                    sublink: 'http://e.weibo.com/1341556070/AjQH99che'
                },
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
                        name: '生活费',
                        type: 'bar',
                        stack: '总量',
                        itemStyle: {normal: {label: {show: true, position: 'inside'}}},
                        data: series_data[0]
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

    module.exports = partBarChartView;
});