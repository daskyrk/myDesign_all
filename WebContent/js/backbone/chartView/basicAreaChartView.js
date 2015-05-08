/**
 * Created by Jun on 2015/5/4.
 */
define(function (require, exports, module) {

    var basicAreaChartView = Backbone.View.extend({

        id: "",

        init: function () {
            //this.id = "barChart" + $("div[id^='chart']").length;
        },

        render: function (chartAreaId, xAxis_data, series_name, series_data) {
            //基于准备好的dom，初始化echarts图表
            var myChart = echarts.init(document.getElementById(chartAreaId));

            var temp_series = new Array();
            for (var i = 0; i < series_data.length; i++) {
                var seriesItem = {
                    name: series_name[i],
                    type: "line",
                    smooth: true,
                    itemStyle: {normal: {areaStyle: {type: 'default'}}},
                    data: series_data[i]
                }
                temp_series.push(seriesItem);
            }
            var option = {
                title: {
                    text: '某楼盘销售情况',
                    subtext: '纯属虚构'
                },
                tooltip: {
                    trigger: 'axis'
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
                        magicType: {show: true, type: ['line', 'bar', 'stack', 'tiled']},
                        restore: {show: true},
                        saveAsImage: {show: true}
                    }
                },
                calculable: true,
                xAxis: [
                    {
                        type: 'category',
                        boundaryGap: false,
                        data: xAxis_data
                    }
                ],
                yAxis: [
                    {
                        type: 'value'
                    }
                ],
                series: temp_series
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