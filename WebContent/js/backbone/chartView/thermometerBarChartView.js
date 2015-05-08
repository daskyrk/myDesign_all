/**
 * Created by Jun on 2015/5/4.
 */
define(function (require, exports, module) {

    var thermometerBarChartView = Backbone.View.extend({

        id: "",

        init: function () {
            //this.id = "barChart" + $("div[id^='chart']").length;
        },

        render: function (chartAreaId, xAxis_data, series_name, series_data) {
            //基于准备好的dom，初始化echarts图表
            var myChart = echarts.init(document.getElementById(chartAreaId));

            var option = {
                title: {
                    text: '温度计式图表',
                    subtext: 'From ExcelHome',
                    sublink: 'http://e.weibo.com/1341556070/AizJXrAEa'
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                        type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                    }
//                    formatter: function (params){
//                        return params[0].name + '<br/>'
//                            + params[0].seriesName + ' : ' + params[0].value + '<br/>'
//                            + params[1].seriesName + ' : ' + (params[1].value + params[0].value);
//                    }
                },
                legend: {
                    selectedMode: false,
                    data: series_name//['Acutal', 'Forecast']
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
                xAxis: [
                    {
                        type: 'category',
                        data: xAxis_data//['Cosco','CMA','APL','OOCL','Wanhai','Zim']
                    }
                ],
                yAxis: [
                    {
                        type: 'value',
                        boundaryGap: [0, 0.1]
                    }
                ],
                series: [
                    {
                        name: series_name[0],
                        type: 'bar',
                        stack: 'sum',
                        barCategoryGap: '50%',
                        itemStyle: {
                            normal: {
                                color: 'tomato',
                                barBorderColor: 'tomato',
                                barBorderWidth: 3,
                                barBorderRadius: 0,
                                label: {
                                    show: true, position: 'insideTop'
                                }
                            }
                        },
                        data: series_data[0]
                    },
                    {
                        name: series_name[1],
                        type: 'bar',
                        stack: 'sum',
                        itemStyle: {
                            normal: {
                                color: '#fff',
                                barBorderColor: 'tomato',
                                barBorderWidth: 3,
                                barBorderRadius: 0,
                                label: {
                                    show: true,
                                    position: 'top',
//                                    formatter: function (params) {
//                                        for (var i = 0, l = option.xAxis[0].data.length; i < l; i++) {
//                                            if (option.xAxis[0].data[i] == params.name) {
//                                                return option.series[0].data[i] + params.value;
//                                            }
//                                        }
//                                    },
                                    textStyle: {
                                        color: 'tomato'
                                    }
                                }
                            }
                        },
                        data: series_data[1]
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

    module.exports = thermometerBarChartView;
});