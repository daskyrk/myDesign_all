/**
 * Created by Jun on 2015/3/30.
 */
define(function (require, exports, module) {

    var timeAxisLineChartView = Backbone.View.extend({

        id: "",

        init: function () {
            //this.id = "barChart" + $("div[id^='chart']").length;
        },

        render: function (chartAreaId, xAxis_data, series_name, series_data) {
            //基于准备好的dom，初始化echarts图表
            var myChart = echarts.init(document.getElementById(chartAreaId), 'macarons');

            var temp_series = new Array();
            for (var i = 0; i < series_data.length; i++) {
                var seriesItem = {
                    name: series_name[i],
                    type: "bar",
                    stack: '总量',
                    data: series_data[i]
                }
                temp_series.push(seriesItem);
            }
            var option = {
                title: {
                    text: '时间坐标折线图',
                    subtext: 'dataZoom支持'
                },
                tooltip: {
                    trigger: 'item',
                    formatter: function (params) {
                        var date = new Date(params.value[0]);
                        data = date.getFullYear() + '-'
                            + (date.getMonth() + 1) + '-'
                            + date.getDate() + ' '
                            + date.getHours() + ':'
                            + date.getMinutes();
                        return data + '<br/>'
                            + params.value[1] + ', '
                            + params.value[2];
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
                dataZoom: {
                    show: true,
                    start: 70
                },
                legend: {
                    data: ['series1']
                },
                grid: {
                    y2: 80
                },
                xAxis: [
                    {
                        type: 'time',
                        splitNumber: 10
                    }
                ],
                yAxis: [
                    {
                        type: 'value'
                    }
                ],
                series: [
                    {
                        name: 'series1',
                        type: 'line',
                        showAllSymbol: true,
                        symbolSize: function (value) {
                            return Math.round(value[2] / 10) + 2;
                        },
                        data: (function () {
                            var d = [];
                            var len = 0;
                            var now = new Date();
                            var value;
                            while (len++ < 200) {
                                d.push([
                                    new Date(2014, 9, 1, 0, len * 10000),
                                    (Math.random() * 30).toFixed(2) - 0,
                                    (Math.random() * 100).toFixed(2) - 0
                                ]);
                            }
                            return d;
                        })()
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

    module.exports = timeAxisLineChartView;
});