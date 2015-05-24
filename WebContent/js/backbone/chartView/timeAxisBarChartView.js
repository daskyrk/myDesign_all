/**
 * Created by Jun on 2015/3/30.
 */
define(function (require, exports, module) {

    var timeAxisLineChartView = Backbone.View.extend({

        render: function (chartAreaId, defaultOption, data, chartData) {
            //基于准备好的dom，初始化echarts图表
            var myChart = echarts.init(document.getElementById(chartAreaId), 'macarons');

            /*********************************数据处理*****************************/
            var dataMap = {}, maxData = 10;
            var series_name = [], series_data = chartData.series_data, seriesData = [], xAxis_data = chartData.xAxis_data.slice(1);
            var series_num = 1;
            //处理标题
            for (var i = 0; i < chartData.series_name.length; i++) {
                var itemTitle = chartData.series_name[i];
                if (itemTitle != '') {
                    series_name.push(itemTitle);
                }
            }
            series_num = Math.floor(data.length - 2) / series_name.length;
            var years = [];//每年的标题
            //处理内容数据
            for (var i = 0, j = 0; i < series_name.length; i++) {
                var series_item = {};
                years = [];
                for (; j < series_num * i + series_num; j++) {
                    var temp_series_item = {};
                    var key = parseInt(series_data[j][0]) + '';
                    var val = series_data[j].slice(1);

                    years.push(key);
                    tempMax = Math.max.apply(null, val);
                    maxData = maxData > tempMax ? maxData : tempMax;
                    temp_series_item[key] = val;
                    $.extend(series_item, temp_series_item);
                }

                dataMap[series_name[i]] = dataFormatter(series_item);
                //合成目标系列对象
                var seriesItem = {
                    'name': series_name[i],
                    'type': 'bar',
                    'markLine': {
                        symbol: ['arrow', 'none'],
                        symbolSize: [4, 2],
                        itemStyle: {
                            normal: {
                                lineStyle: {color: 'orange'},
                                barBorderColor: 'orange',
                                label: {
                                    position: 'left',
                                    formatter: function (params) {
                                        return Math.round(params.value);
                                    },
                                    textStyle: {color: 'orange'}
                                }
                            }
                        },
                        'data': [{'type': 'average', 'name': '平均值'}]
                    },
                    'data': dataMap[series_name[i]][[years[years.length - 1]]]
                };
                seriesData.push(seriesItem);
            }
            //后几年的数据
            var addData = [];
            years.reverse();//颠倒顺序

            for (var i = 0; i < series_num; i++) {
                var temp_series = [];
                for (var j = 0; j < series_name.length; j++) {
                    temp_series.push({'data': dataMap[series_name[j]][years[i]]});
                }
                var temp = {
                    title: {'text': years[i] + '全国宏观经济指标'},
                    series: temp_series
                };
                addData.push(temp);
            }
            //处理地区名
            for (var i = 0; i < xAxis_data.length; i++) {
                if (i % 2 != 0) {
                    xAxis_data[i] = '\n' + xAxis_data[i];//偶数换行显示
                }
            }

            /******************************官方处理过程**********************************/
            function dataFormatter(obj) {
                var pList = ['北京', '天津', '河北', '山西', '内蒙古', '辽宁', '吉林', '黑龙江', '上海', '江苏', '浙江', '安徽', '福建', '江西', '山东', '河南', '湖北', '湖南', '广东', '广西', '海南', '重庆', '四川', '贵州', '云南', '西藏', '陕西', '甘肃', '青海', '宁夏', '新疆'];
                var temp;
                var max = 0;
                for (var year = 2002; year <= 2011; year++) {
                    temp = obj[year];
                    for (var i = 0, l = temp.length; i < l; i++) {
                        max = Math.max(max, temp[i]);
                        obj[year][i] = {
                            name: pList[i],
                            value: temp[i]
                        }
                    }
                    obj[year + 'max'] = Math.floor(max / 100) * 100;
                }
                return obj;
            }

            function dataMix(list) {
                var mixData = {};
                for (var i = 0, l = list.length; i < l; i++) {
                    for (var key in list[i]) {
                        if (list[i][key] instanceof Array) {
                            mixData[key] = mixData[key] || [];
                            for (var j = 0, k = list[i][key].length; j < k; j++) {
                                mixData[key][j] = mixData[key][j]
                                    || {name: list[i][key][j].name, value: []};
                                mixData[key][j].value.push(list[i][key][j].value);
                            }
                        }
                    }
                }
                return mixData;
            }


            dataMap.dataGDP_Estate = dataMix([dataMap.dataEstate, dataMap.dataGDP]);

            var option = {
                timeline: {
                    data: years,
                    autoPlay: true,
                    playInterval: 1000
                },
                options: [
                    {
                        title: defaultOption.title,
                        tooltip: {'trigger': 'axis'},
                        legend: {
                            x: 'right',
                            'data': series_name
                        },
                        toolbox: {
                            'show': true,
                            orient: 'vertical',
                            x: 'right',
                            y: 'center',
                            'feature': {
                                'mark': {'show': true},
                                'dataView': {'show': true, 'readOnly': false},
                                'magicType': {'show': true, 'type': ['line', 'bar', 'stack', 'tiled']},
                                'restore': {'show': true},
                                'saveAsImage': {'show': true}
                            }
                        },
                        calculable: true,
                        grid: {'y': 80, 'y2': 100},
                        xAxis: [{
                            'type': 'category',
                            'axisLabel': {'interval': 0},
                            'data': xAxis_data
                        }],
                        yAxis: [
                            {
                                'type': 'value',
                                'name': 'GDP（亿元）',
                                'max': maxData * 1.1
                            },
                            {
                                'type': 'value',
                                'name': '其他（亿元）'
                            }
                        ],
                        series: seriesData
                    }
                ]
            };

            for (var i = 1; i < addData.length; i++) {//因为第一组数据已经存在，所以从1开始
                option.options.push(addData[i]);
                console.log(option.options);
            }


            //为echarts对象加载数据
            myChart.setOption(option);
            window.charts.push(myChart);
        }

    });

    module.exports = timeAxisLineChartView;
});