/**
 * Created by Jun on 2015/3/30.
 * 解析返回的数据并初始化相应的图表
 */
define(function (require, exports, module) {

    var AllChartView = require("./chartView/allChartView");
    /************************柱状图************************/
    var BasicBarChartView = require("./chartView/basicBarChartView");
    var StackBarChartView = require("./chartView/stackBarChartView");
    var ThermometerBarChartView = require("./chartView/thermometerBarChartView");
    var PartBarChartView = require("./chartView/partBarChartView");
    var LadderBarChartView = require("./chartView/ladderBarChartView");
    var TimeAxisBarChartView = require("./chartView/timeAxisBarChartView");

    /************************条形图************************/
    var BasicHorizonBarChartView = require("./chartView/basicHorizonBarChartView");
    var StackHorizonBarChartView = require("./chartView/stackHorizonBarChartView");
    var WindHorizonBarChartView = require("./chartView/windHorizonBarChartView");
    var MultiHorizonBarChartView = require("./chartView/multiHorizonBarChartView");
    var UnEqualHorizonBarChartView = require("./chartView/unEqualHorizonBarChartView");

    /************************折线图************************/
    var BasicLineChartView = require("./chartView/basicLineChartView");
    var StackLineChartView = require("./chartView/stackLineChartView");
    var UnEqualLineChartView = require("./chartView/unEqualLineChartView");
    var TimeAxisLineChartView = require("./chartView/timeAxisLineChartView");

    /************************面积图************************/
    var BasicAreaChartView = require("./chartView/basicAreaChartView");
    var StackAreaChartView = require("./chartView/stackAreaChartView");

    /************************饼图************************/
    var BasicPieChartView = require("./chartView/basicPieChartView");
    var NestPieChartView = require("./chartView/nestPieChartView");
    var BasicRingChartView = require("./chartView/basicRingChartView");

    /************************雷达图************************/
    var BasicRadarChartView = require("./chartView/basicRadarChartView");
    var FillRadarChartView = require("./chartView/fillRadarChartView");
    var MultiRadarChartView = require("./chartView/multiRadarChartView");

    /************************散点图************************/
    var BasicScatterChartView = require("./chartView/basicScatterChartView");

    /************************地图************************/
    var BasicMapChartView = require("./chartView/basicMapChartView");


    /************************仪表盘图************************/
    var BasicBoardChartView = require("./chartView/basicBoardChartView");


    /**
     * 解析返回的json数据
     * 参数为目标图表区域和返回的json
     */
    function parseRtData(chartArea, data) {
        var defaultOption;//默认选项
        var xAxis_data, series_name = [], series_data = [];
        var text = '', subtext = '';
        xAxis_data = data[0].slice(1);
        for (var i = 1; i < data.length; i++) {
            if (data[i][0] != '标题') {
                series_name[i - 1] = data[i][0];
                series_data[i - 1] = data[i].slice(1);
            } else {
                text = data[i][1];
                data[i][2] == null ? subtext = '' : subtext = data[i][2];
            }
        }

        var default_series = [];
        for (var i = 0; i < series_data.length; i++) {
            var seriesItem = {
                name: series_name[i],
                type: "bar",
                smooth: true,
                itemStyle: {normal: {areaStyle: {type: 'default'}}},
                data: series_data[i]
            };
            default_series.push(seriesItem);
        }


        /************************option属性*************************/
        var title = {
            show: true,
            text: text,//主标题文本
            link: '',//主标题文本超链接
            subtext: subtext,//副标题文本
            sublink: '',//副标题文本超链接
            x: 'left',//水平安放位置
            y: 'top'//垂直安放位置
        };
        var timeline = {
            data: [
                '2002-01-01', '2003-01-01', '2004-01-01', '2005-01-01', '2006-01-01',
                '2007-01-01', '2008-01-01', '2009-01-01', '2010-01-01', '2011-01-01'
            ],
            label: {
                formatter: function (s) {
                    return s.slice(0, 4);
                }
            },
            autoPlay: true,
            playInterval: 1000
        };
        var toolbox = {
            show: true,
            orient: 'vertical',//布局方式'horizontal' | 'vertical'
            x: 'right',//水平安放位置
            y: 'top',//垂直安放位置
            itemSize: 15,//工具箱icon大小，单位（px）
            feature: {
                mark: {
                    show: true,
                    title: {
                        mark: '辅助线开关',
                        markUndo: '删除辅助线',
                        markClear: '清空辅助线'
                    },
                    lineStyle: {
                        width: 2,
                        color: '#1e90ff',
                        type: 'dashed'
                    }
                },
                dataZoom: {
                    show: true,
                    title: {
                        dataZoom: '区域缩放',
                        dataZoomReset: '区域缩放后退'
                    }
                },
                dataView: {
                    show: true,
                    title: '数据视图',
                    readOnly: false,
                    lang: ['数据视图', '关闭', '刷新']
                },
                magicType: {
                    show: true,
                    title: {
                        line: '折线图切换',
                        bar: '柱形图切换',
                        stack: '堆积',
                        tiled: '平铺',
                        force: '力导向布局图切换',
                        chord: '和弦图切换',
                        pie: '饼图切换',
                        funnel: '漏斗图切换'
                    },
                    option: {
                        // line: {...},
                        // bar: {...},
                        // stack: {...},
                        // tiled: {...},
                        // force: {...},
                        // chord: {...},
                        // pie: {...},
                        // funnel: {...}
                    },
                    type: ['line', 'bar', 'stack', 'tiled']
                },
                restore: {
                    show: true,
                    title: '还原'
                },
                saveAsImage: {
                    show: true,
                    title: '保存为图片',
                    type: 'png',
                    lang: ['点击保存']
                }
            }

        };
        var tooltip = {//默认显示
            trigger: 'axis',//item,axis,
            axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                type: 'shadow'        // 默认为直线，可选为：'line' | 'cross' | 'shadow' | 'none'(无)
            }
        };
        var legend = {//默认位置顶部水平正中
            data: series_name
        };
        var dataRange = {
            show: true,
            orient: 'vertical',
            x: 'left',//水平安放位置
            y: 'bottom',//垂直安放位置
            min: 0,
            max: 10
        };
        var dataZoom = {
            show: true,
            realtime: true,//是否实时显示
            start: 0,//默认选择范围起始值（%）
            end: 10//默认选择范围结束值（%）
        };
        var roamController = {
            show: true,
            x: 'right',
            y: 'top',
            width: 60,
            height: 80,
            mapTypeControl: {
                'china': true
            }
        };
        var xAxis = [
            {
                boundaryGap: true,//类目起始和结束两端空白策略
                data: xAxis_data
            }
        ];
        var yAxis = [
            {
                type: 'value'
            }
        ];
        defaultOption = {
            title: title,
            timeline: timeline,
            toolbox: toolbox,
            tooltip: tooltip,
            legend: legend,
            dataRange: dataRange,
            dataZoom: dataZoom,
            roamController: roamController,
            xAxis: xAxis,
            yAxis: yAxis,
            series: default_series,
            calculable: true//拖拽重计算
        };
        /*******************初步解析的数据*********************/
        var chartData = {
            title: title,
            xAxis_data: xAxis_data,
            series_name: series_name,
            series_data: series_data
        };
        switch (chartArea.type) {
            //*******************************标准柱状图*******************************
            case 'BasicBar':
                var basicBarChart = new AllChartView.basicBarChartView;
                basicBarChart.render(chartArea.id, defaultOption);
                //new BasicBarChartView().render(chartArea.id, xAxis_data, series_name, series_data);
                break;
            //*******************************堆积柱状图*******************************
            case 'StackBar':
                new StackBarChartView().render(chartArea.id, defaultOption);
                break;
            //*******************************温度计柱状图*******************************
            case 'ThermometerBar':
                new ThermometerBarChartView().render(chartArea.id, defaultOption, chartData);
                break;
            //*******************************组成柱状图*******************************
            case 'PartBar':
                new PartBarChartView().render(chartArea.id, defaultOption, chartData);
                break;
            //*******************************阶梯柱状图*******************************
            case 'LadderBar':
                new LadderBarChartView().render(chartArea.id, defaultOption, chartData);
                break;
            //*******************************时间轴柱状图*******************************
            case 'TimeAxisBar':
                new TimeAxisBarChartView().render(chartArea.id, defaultOption, data, chartData);
                break;


            //*******************************标准条形图*******************************
            case 'BasicHorizonBar':
                new BasicHorizonBarChartView().render(chartArea.id, defaultOption, chartData);
                break;
            //*******************************堆积条形图*******************************
            case 'StackHorizonBar':
                new StackHorizonBarChartView().render(chartArea.id, defaultOption, chartData);
                break;
            //*******************************旋风条形图*******************************
            case 'WindHorizonBar':
                new WindHorizonBarChartView().render(chartArea.id, defaultOption, chartData);
                break;
            //*******************************多维条形图*******************************
            case 'MultiHorizonBar':
                new MultiHorizonBarChartView().render(chartArea.id, defaultOption, chartData);
                break;
            //*******************************不等距条形图*******************************
            case 'UnEqualHorizonBar':
                new UnEqualHorizonBarChartView().render(chartArea.id, defaultOption, data);
                break;


            //*******************************标准折线图*******************************
            case 'BasicLine':
                new BasicLineChartView().render(chartArea.id, defaultOption, chartData);
                break;
            //*******************************堆积折线图*******************************
            case 'StackLine':
                new StackLineChartView().render(chartArea.id, defaultOption, chartData);
                break;
            //*******************************不等距折线图*******************************
            case 'UnEqualLine':
                new UnEqualLineChartView().render(chartArea.id, defaultOption, data);
                break;
            //*******************************时间轴折线图*******************************
            case 'TimeAxisLine':
                new TimeAxisLineChartView().render(chartArea.id, defaultOption, chartData);
                break;


            //*******************************标准饼图*******************************
            case 'BasicPie':
                new BasicPieChartView().render(chartArea.id, data);
                break;
            //*******************************嵌套饼图*******************************
            case 'NestPie':
                new NestPieChartView().render(chartArea.id, data);
                break;
            //*******************************标准环形图*******************************
            case 'BasicRing':
                new BasicRingChartView().render(chartArea.id, data);
                break;


            //*******************************标准面积图*******************************
            case 'BasicArea':
                new BasicAreaChartView().render(chartArea.id, defaultOption, chartData);
                break;
            //*******************************堆积面积图*******************************
            case 'StackArea':
                new StackAreaChartView().render(chartArea.id, defaultOption, chartData);
                break;


            //*******************************标准雷达图*******************************
            case 'BasicRadar':
                new BasicRadarChartView().render(chartArea.id, chartData);
                break;
            //*******************************填充雷达图*******************************
            case 'FillRadar':
                new FillRadarChartView().render(chartArea.id, chartData);
                break;
            //*******************************填充雷达图*******************************
            case 'MultiRadar':
                new MultiRadarChartView().render(chartArea.id, chartData);
                break;


            //*******************************标准散点图*******************************
            case 'BasicScatter':
                new BasicScatterChartView().render(chartArea.id, defaultOption, data);
                break;


            //*******************************标准地图*******************************
            case 'BasicMap':
                new BasicMapChartView().render(chartArea.id, data);
                break;


            //*******************************仪表盘*******************************
            case 'BasicBoard':
                new BasicBoardChartView().render(chartArea.id, data);
                break;
        }

    }


    module.exports = {
        parseRtData: parseRtData
    };
});