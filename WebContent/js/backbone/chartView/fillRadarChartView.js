/**
 * Created by Jun on 2015/5/4.
 */
define(function (require, exports, module) {

    var fillRadarChartView = Backbone.View.extend({

        id: "",

        init: function () {
            //this.id = "barChart" + $("div[id^='chart']").length;
        },

        render: function (chartAreaId, xAxis_data, series_name, series_data) {
            //基于准备好的dom，初始化echarts图表
            var myChart = echarts.init(document.getElementById(chartAreaId));

            var option = {
                title: {
                    text: '罗纳尔多 vs 舍普琴科',
                    subtext: '完全实况球员数据'
                },
                tooltip: {
                    trigger: 'axis'
                },
                legend: {
                    x: 'center',
                    data: ['罗纳尔多', '舍普琴科']
                },
                toolbox: {
                    show: true,
                    feature: {
                        mark: {show: true},
                        dataView: {show: true, readOnly: false},
                        restore: {show: true},
                        saveAsImage: {show: true}
                    }
                },
                calculable: true,
                polar: [
                    {
                        indicator: [
                            {text: '进攻', max: 100},
                            {text: '防守', max: 100},
                            {text: '体能', max: 100},
                            {text: '速度', max: 100},
                            {text: '力量', max: 100},
                            {text: '技巧', max: 100}
                        ],
                        radius: 130
                    }
                ],
                series: [
                    {
                        name: '完全实况球员数据',
                        type: 'radar',
                        itemStyle: {
                            normal: {
                                areaStyle: {
                                    type: 'default'
                                }
                            }
                        },
                        data: [
                            {
                                value: [97, 42, 88, 94, 90, 86],
                                name: '舍普琴科'
                            },
                            {
                                value: [97, 32, 74, 95, 88, 92],
                                name: '罗纳尔多'
                            }
                        ]
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

    module.exports = fillRadarChartView;
});