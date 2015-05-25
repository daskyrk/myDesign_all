/**
 * Created by Jun on 2015/5/4.
 */
define(function (require, exports, module) {

    var basicPieChartView = Backbone.View.extend({

        render: function (chartAreaId, data) {
            //基于准备好的dom，初始化echarts图表
            var myChart = echarts.init(document.getElementById(chartAreaId), 'macarons');

            //标题
            var length = data.length - 1, title = '', subtitle = '';
            if (data[length][0] == '标题') {
                title = data[length][1];
                data[length][2] == null ? subtitle = '' : subtitle = data[length][2];
                length--;
            }
            //内容
            var names = data[0].slice(1), values = data[1].slice(1), series_data = [];
            var maxValue = 10;
            for (var i = 0; i < names.length; i++) {
                var pieItem = {
                    name: names[i],
                    value: values[i]
                };
                series_data.push(pieItem);
                maxValue = maxValue > values[i] ? maxValue : values[i];
            }
            var option = { 
                title: {
                    show: true,
                    text: title,//主标题文本
                    subtext: subtitle,//副标题文本
                    x: 'center',//水平安放位置
                    y: 'top'//垂直安放位置
                },
                tooltip: {
                    trigger: 'item',
                    formatter: "{a} <br/>{b} : {c} ({d}%)"
                },
                legend: {
                    orient: 'vertical',
                    x: 'left',
                    y: 'center',
                    data: names
                },
                toolbox: {
                    show: true,
                    orient: 'vertical',
                    feature: {
                        mark: {show: true},
                        dataView: {show: true, readOnly: false},
                        magicType: {
                            show: true,
                            type: ['pie', 'funnel'],
                            option: {
                                funnel: {
                                    x: '25%',
                                    width: '50%',
                                    funnelAlign: 'left',
                                    max: maxValue
                                }
                            }
                        },
                        restore: {show: true},
                        saveAsImage: {show: true}
                    }
                },
                calculable: true,
                series: [
                    {
                        name: data[0][0],
                        type: 'pie',
                        radius: '55%',
                        center: ['50%', '50%'],
                        data: series_data
                    }
                ]
            };

            //为echarts对象加载数据
            myChart.setOption(option);
            window.charts.push(myChart);
        }

    });

    module.exports = basicPieChartView;
});