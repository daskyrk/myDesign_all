/**
 * Created by Jun on 2015/5/4.
 */
define(function (require, exports, module) {

    var basicRadarChartView = Backbone.View.extend({

        id: "",

        init: function () {
            //this.id = "barChart" + $("div[id^='chart']").length;
        },

        render: function (xAxis_data,series_name,series_data) {
            var lastId = $("div[id^='chart']").length;
            //基于准备好的dom，初始化echarts图表
            var myChart = echarts.init(document.getElementById('chart' + lastId));

            var
                option = {
                    title : {
                        text: '预算 vs 开销（Budget vs spending）',
                        subtext: '纯属虚构'
                    },
                    tooltip : {
                        trigger: 'axis'
                    },
                    legend: {
                        orient : 'vertical',
                        x : 'right',
                        y : 'bottom',
                        data:['预算分配（Allocated Budget）','实际开销（Actual Spending）']
                    },
                    toolbox: {
                        show : true,
                        feature : {
                            mark : {show: true},
                            dataView : {show: true, readOnly: false},
                            restore : {show: true},
                            saveAsImage : {show: true}
                        }
                    },
                    polar : [
                        {
                            indicator : [
                                { text: '销售（sales）', max: 6000},
                                { text: '管理（Administration）', max: 16000},
                                { text: '信息技术（Information Techology）', max: 30000},
                                { text: '客服（Customer Support）', max: 38000},
                                { text: '研发（Development）', max: 52000},
                                { text: '市场（Marketing）', max: 25000}
                            ]
                        }
                    ],
                    calculable : true,
                    series : [
                        {
                            name: '预算 vs 开销（Budget vs spending）',
                            type: 'radar',
                            data : [
                                {
                                    value : [4300, 10000, 28000, 35000, 50000, 19000],
                                    name : '预算分配（Allocated Budget）'
                                },
                                {
                                    value : [5000, 14000, 28000, 31000, 42000, 21000],
                                    name : '实际开销（Actual Spending）'
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

    module.exports = basicRadarChartView;
});