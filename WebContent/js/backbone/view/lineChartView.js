/**
 * Created by Jun on 2015/5/4.
 */
define(function (require, exports, module) {

    var lineChartView = Backbone.View.extend({

        id: "",

        init: function () {
            //this.id = "barChart" + $("div[id^='chart']").length;
        },

        render: function (xAxis_data,series_name,series_data) {
            var lastId = $("div[id^='chart']").length;
            //基于准备好的dom，初始化echarts图表
            var myChart = echarts.init(document.getElementById('chart' + lastId));

            var option = {
                tooltip: {
                    show: true
                },
                legend: {
                    data: series_name
                },
                xAxis: [
                    {
                        type: 'category',
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
                        "name": series_name[0],
                        "type": "line",
                        "data": series_data[0]
                    },
                    {
                    	"name": series_name[1],
                    	"type": "line",
                    	"data": series_data[1]
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

    module.exports = lineChartView;
});