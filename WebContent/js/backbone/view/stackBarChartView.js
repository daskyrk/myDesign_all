/**
 * Created by Jun on 2015/5/4.
 */
define(function (require, exports, module) {

    var stackBarChartView = Backbone.View.extend({

        id: "",

        init: function () {
            //this.id = "barChart" + $("div[id^='chart']").length;
        },

        render: function (xAxis_data,series_name,series_data) {
            var lastId = $("div[id^='chart']").length;
            //基于准备好的dom，初始化echarts图表
            var myChart = echarts.init(document.getElementById('chart' + lastId));

            var option = {
                tooltip : {
                    trigger: 'axis',
                    axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                        type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                    }
                },
                legend: {
                    data:series_name//['直接访问','邮件营销','联盟广告','视频广告','搜索引擎','百度','谷歌','必应','其他']
                },
                toolbox: {
                    show : true,
                    orient: 'vertical',
                    x: 'right',
                    y: 'center',
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
                        data : xAxis_data//['周一','周二','周三','周四','周五','周六','周日']
                    }
                ],
                yAxis : [
                    {
                        type : 'value'
                    }
                ],
                series : [
                    {
                        "name": series_name[0],
                        "type": "bar",
                        "data": series_data[0]
                    },
                    {
                    	"name": series_name[1],
                    	"type": "bar",
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

    module.exports = stackBarChartView;
});