/**
 * Created by Jun on 2015/5/4.
 */
define(function (require, exports, module) {

    var basicAreaChartView = Backbone.View.extend({

        id: "",

        init: function () {
            //this.id = "barChart" + $("div[id^='chart']").length;
        },

        render: function (xAxis_data,series_name,series_data) {
            var lastId = $("div[id^='chart']").length;
            //基于准备好的dom，初始化echarts图表
            var myChart = echarts.init(document.getElementById('chart' + lastId));

            var option = {
                title : {
                    text: '某楼盘销售情况',
                    subtext: '纯属虚构'
                },
                tooltip : {
                    trigger: 'axis'
                },
                legend: {
                    data:['意向','预购','成交']
                },
                toolbox: {
                    show : true,
                    feature : {
                        mark : {show: true},
                        dataView : {show: true, readOnly: false},
                        magicType : {show: true, type: ['line', 'bar', 'stack', 'tiled']},
                        restore : {show: true},
                        saveAsImage : {show: true}
                    }
                },
                calculable : true,
                xAxis : [
                    {
                        type : 'category',
                        boundaryGap : false,
                        data : ['周一','周二','周三','周四','周五','周六','周日']
                    }
                ],
                yAxis : [
                    {
                        type : 'value'
                    }
                ],
                series : [
                    {
                        name:'成交',
                        type:'line',
                        smooth:true,
                        itemStyle: {normal: {areaStyle: {type: 'default'}}},
                        data:[10, 12, 21, 54, 260, 830, 710]
                    },
                    {
                        name:'预购',
                        type:'line',
                        smooth:true,
                        itemStyle: {normal: {areaStyle: {type: 'default'}}},
                        data:[30, 182, 434, 791, 390, 30, 10]
                    },
                    {
                        name:'意向',
                        type:'line',
                        smooth:true,
                        itemStyle: {normal: {areaStyle: {type: 'default'}}},
                        data:[1320, 1132, 601, 234, 120, 90, 20]
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

    module.exports = basicAreaChartView;
});