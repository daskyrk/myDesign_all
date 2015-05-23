/**
 * Created by Jun on 2015/5/4.
 */
define(function (require, exports, module) {

    var basicBoardChartView = Backbone.View.extend({

        id: "",

        init: function () {
            //this.id = "barChart" + $("div[id^='chart']").length;
        },

        render: function (chartAreaId, data) {
            //基于准备好的dom，初始化echarts图表
            var myChart = echarts.init(document.getElementById(chartAreaId), 'macarons');

            var seriesData = [];
            for (var i = 1; i < data[0].length; i++) {
                var item = {
                    name: data[0][i],
                    value: data[1][i]
                };
                seriesData.push(item);
            }
            var option = {
                tooltip: {
                    formatter: "{a} <br/>{b} : {c}%"
                },
                toolbox: {
                    show: true,
                    feature: {
                        mark: {show: true},
                        restore: {show: true},
                        saveAsImage: {show: true}
                    }
                },
                series: [
                    {
                        name: data[0][0],
                        type: 'gauge',
                        detail: {formatter: '{value}%'},
                        data: [seriesData[0]]
                    }
                ]
            };


            myChart.timer = setInterval(function () {
                var index = Math.ceil(Math.random() * seriesData.length) - 1;
                option.series[0].data[0] = seriesData[index];
                myChart.setOption(option, true);
            }, 2000);

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

    module.exports = basicBoardChartView;
});