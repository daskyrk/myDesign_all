/**
 * Created by Jun on 2015/5/4.
 */
define(function (require, exports, module) {

    var nestPieChartView = Backbone.View.extend({

        render: function (chartAreaId, data) {
            //基于准备好的dom，初始化echarts图表
            var myChart = echarts.init(document.getElementById(chartAreaId), 'macarons');

            var length = data.length - 1, title = '', subtitle = '';
            if (data[length][0] == '标题') {
                title = data[length][1];
                data[length][2] == null ? subtitle = '' : subtitle = data[length][2];
                length--;
            }
            var center_series = [], outer_series = [], legend_data = [], inner_maxValue = 10, outer_maxValue = 10;
            for (var i = 0; i < length; i += 2) {
                var sum = 0;
                for (var j = 1; j < data[i].length; j++) {
                    if (data[i][j] != null) {
                        //外围每一块
                        var outer_item = {
                            name: data[i][j],
                            value: data[i + 1][j]
                        };
                        outer_series.push(outer_item);
                        sum += parseInt(data[i + 1][j]);
                        legend_data.push(data[i][j]);
                        outer_maxValue = outer_maxValue > outer_item.value ? outer_maxValue : outer_item.value;
                    }
                }
                //中心部分每一块
                var center_item = {
                    name: data[i][0],
                    value: sum
                };
                center_series.push(center_item);
                inner_maxValue = inner_maxValue > sum ? inner_maxValue : sum;
            }

            var option = {
                title: {
                    show: true,
                    text: title,//主标题文本
                    subtext: subtitle//副标题文本
                },
                tooltip: {
                    trigger: 'item',
                    formatter: "{a} <br/>{b} : {c} ({d}%)"
                },
                legend: {
                    orient: 'vertical',
                    x: 'left',
                    data: legend_data
                },
                toolbox: {
                    show: true,
                    feature: {
                        mark: {show: true},
                        dataView: {show: true, readOnly: false},
                        magicType: {
                            show: true,
                            type: ['pie', 'funnel']
                        },
                        restore: {show: true},
                        saveAsImage: {show: true}
                    }
                },
                calculable: false,
                series: [
                    {
                        name: '访问来源',
                        type: 'pie',
                        selectedMode: 'single',
                        radius: [0, 60],

                        // for funnel
                        x: '20%',
                        width: '30%',
                        funnelAlign: 'right',
                        max: inner_maxValue,

                        itemStyle: {
                            normal: {
                                label: {
                                    position: 'inner'
                                },
                                labelLine: {
                                    show: false
                                }
                            }
                        },
                        data: center_series
                    },
                    {
                        name: '访问来源',
                        type: 'pie',
                        radius: [80, 110],

                        // for funnel
                        x: '50%',
                        width: '10%',
                        funnelAlign: 'left',
                        max: outer_maxValue,
                        data: outer_series
                    }
                ]
            };
            //var ecConfig = require('echarts/config');
            //myChart.on(ecConfig.EVENT.PIE_SELECTED, function (param){
            //    var selected = param.selected;
            //    var serie;
            //    var str = '当前选择： ';
            //    for (var idx in selected) {
            //        serie = option.series[idx];
            //        for (var i = 0, l = serie.data.length; i < l; i++) {
            //            if (selected[idx][i]) {
            //                str += '【系列' + idx + '】' + serie.name + ' : ' +
            //                '【数据' + i + '】' + serie.data[i].name + ' ';
            //            }
            //        }
            //    }
            //    document.getElementById('wrong-message').innerHTML = str;
            //})

            //为echarts对象加载数据
            myChart.setOption(option);
            window.charts.push(myChart);
        }

    });

    module.exports = nestPieChartView;
});