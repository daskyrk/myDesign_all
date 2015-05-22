/**
 * Created by Jun on 2015/5/4.
 */
define(function (require, exports, module) {

    var basicRadarChartView = Backbone.View.extend({

        id: "",

        init: function () {
            //this.id = "barChart" + $("div[id^='chart']").length;
        },

        render: function (chartAreaId, xAxis_data, series_name, series_data) {
            //基于准备好的dom，初始化echarts图表
            var myChart = echarts.init(document.getElementById(chartAreaId), 'macarons');

            var option = {
                title: {
                    text: '预算 vs 开销（Budget vs spending）',
                    subtext: '纯属虚构'
                },
                tooltip: {
                    trigger: 'axis'
                },
                legend: {
                    orient: 'vertical',
                    x: 'right',
                    y: 'bottom',
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
                polar: [
                    {
                        indicator: [
                            {text: '销售（sales）', max: 6000},
                            {text: '管理（Administration）', max: 16000},
                            {text: '信息技术（Information Techology）', max: 30000},
                            {text: '客服（Customer Support）', max: 38000},
                            {text: '研发（Development）', max: 52000},
                            {text: '市场（Marketing）', max: 25000}
                        ]
                    }
                ],
                calculable: true,
                series: [
                    {
                        name: '预算 vs 开销（Budget vs spending）',
                        type: 'radar',
                        data: [
                            {
                                value: series_data[0],
                                name: '预算'
                            },
                            {
                                value: series_data[1],
                                name: '实际'
                            }
                        ]
                    }
                ]
            };


            for (var i = 0; i < series_data[0].length; i++) {
                option.polar[0].indicator[i].text = xAxis_data[i];
                option.polar[0].indicator[i].max = series_data[0][i] > series_data[1][i] ? 1.2 * series_data[0][i] : 1.2 * series_data[1][i];
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

    module.exports = basicRadarChartView;
});