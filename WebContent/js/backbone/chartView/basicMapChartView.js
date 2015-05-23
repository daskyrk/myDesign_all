/**
 * Created by Jun on 2015/5/23.
 */
define(function (require, exports, module) {

    var basicMapChartView = Backbone.View.extend({

        id: "",

        init: function () {
            //this.id = "barChart" + $("div[id^='chart']").length;
        },

        render: function (chartAreaId, data) {
            //基于准备好的dom，初始化echarts图表
            var myChart = echarts.init(document.getElementById(chartAreaId), 'macarons');

            //省份坐标数据
            var mapData = [
                {'北京': [116.57, 40.82]},
                {'江苏': [120.13, 33.38]},
                {'西藏': [89.01, 32.17]},
                {'上海': [121.68, 32.02]},
                {'云南': [101.71, 25.58]},
                {'台湾': [121.1, 24.16]},
                {'香港': [115.27, 22.18]},
                {'福建': [118.4, 26.58]},
                {'广东': [113.75, 24.15]},
                {'河北': [115.23, 38.47]},
                {'甘肃': [95.48, 40.67]},
                {'陕西': [109.57, 36.2]},
                {'山西': [112.33, 38.27]},
                {'海南': [109.95, 19.82]},
                {'辽宁': [122.28, 41.68]},
                {'宁夏': [106.07, 37.87]},
                {'江西': [115.89, 27.68]},
                {'广西': [108.3, 24.33]},
                {'吉林': [126.27, 44.2]},
                {'澳门': [112.05, 21.45]},
                {'青海': [96.05, 35.86]},
                {'四川': [103.06, 30.67]},
                {'贵州': [106.7, 27.47]},
                {'浙江': [120.18, 29.51]},
                {'重庆': [107.74, 30.59]},
                {'新疆': [85.06, 42.28]},
                {'安徽': [117.25, 32.79]},
                {'山东': [118.6, 36.95]},
                {'天津': [117.9, 39.63]},
                {'湖北': [112.29, 31.75]},
                {'河南': [113.44, 34.2]},
                {'湖南': [111.46, 28.03]},
                {'黑龙江': [127.93, 47.85]},
                {'内蒙古': [117.77, 44.88]}
            ];

            var seriesData = [], markPointData = [];
            var maxData = Math.max.apply(null, data[1].slice(1)) * 1.1;
            for (var i = 1; i < data[0].length; i++) {
                var item = {
                    name: data[0][i],
                    value: data[1][i]
                };
                seriesData.push(item);
                for (var j = 0; j < mapData.length; j++) {
                    for (var key in mapData[j]) {
                        if (item.name == key) {
                            item.geoCoord = mapData[j][key];
                            item.value += '';
                            markPointData.push(item);
                        }
                    }
                }
            }

            var option = {
                title: {
                    text: '小马车险注册用户数分布图',
                    subtext: '绝对真实',
                    x: 'center'
                },
                tooltip: {
                    trigger: 'item',
                    textStyle: {
                        fontSize: 15,
                        color: '#fff'
                    }
                },
                dataRange: {
                    min: 0,
                    max: maxData,
                    x: 'left',
                    y: 'bottom',
                    text: ['多', '少'],
                    calculable: true
                    //color: ['#006EDD', '#80C1F0']
                },
                toolbox: {
                    show: true,
                    orient: 'vertical',
                    x: 'right',
                    y: 'center',
                    feature: {
                        mark: {show: true},
                        dataView: {show: true, readOnly: false},
                        restore: {show: true},
                        saveAsImage: {show: true}
                    }
                },
                roamController: {
                    show: true,
                    x: 'left',
                    mapTypeControl: {
                        'china': true
                    }
                },
                series: [
                    {
                        name: '用户数',
                        type: 'map',
                        mapType: 'china',
                        itemStyle: {
                            normal: {
                                label: {
                                    show: true,
                                    textStyle: {
                                        //color: '#fff'
                                    }
                                },
                                borderWidth: 1,
                                borderColor: 'lightgreen',
                                backgroundColor: '#666',
                                color: '#fab27b'
                            },
                            emphasis: {
                                label: {
                                    show: true,
                                    textStyle: {
                                        color: '#fff',
                                        fontWeight: 'bold'
                                    }
                                },
                                borderWidth: 2,
                                borderColor: '#fff',
                                color: 'rgba(255,255,0,0.1)'
                            }
                        },
                        data: seriesData,
                        markPoint: {
                            symbol: 'pin',
                            //large:true,
                            symbolSize: 15,
                            effect: {
                                //show:true,
                                color: '#FF1F1F',
                                label: {show: true}
                            },
                            itemStyle: {
                                normal: {
                                    color: '#f3704b',
                                    label: {show: true, textStyle: {fontSize: 14, color: '#FFF38D'}}
                                },
                                emphasis: {
                                    color: 'red',
                                    label: {show: true, position: 'bottom', textStyle: {fontSize: 16, color: '#CCEEFF'}}
                                }
                            },
                            data: markPointData
                        }
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

    module.exports = basicMapChartView;
});