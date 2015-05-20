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

    /************************散点图************************/
    var BasicScatterChartView = require("./chartView/basicScatterChartView");


    var option = {
        title: {
            text: "标题",
            subtext: "副标题"
        },
        timeline: null,
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
        tooltip: {
            show: true
        },
        legend: null,
        dataRange: null,
        dataZoom: null,
        roamController: null,
        grid: null,
        xAxis: null,
        yAxis: null
    }


    /**
     * 解析返回的json数据
     * 参数为目标图表区域和返回的json
     */
    function parseRtData(chartArea, data) {
        var xAxis_data, series_name = [], series_data = [];
        var title = '标题', subtitle = '副标题';
        xAxis_data = data[0].slice(1);
        for (var i = 1; i < data.length; i++) {
            if (data[i][0] != '标题') {
                series_name[i - 1] = data[i][0];
                series_data[i - 1] = data[i].slice(1);
            } else {
                title = data[i][1];
                data[i][2] == null ? subtitle = '' : subtitle = data[i][2];
            }
        }

        var temp_series = new Array();
        for (var i = 0; i < series_data.length; i++) {
            var seriesItem = {
                name: series_name[i],
                type: "bar",
                smooth: true,
                itemStyle: {normal: {areaStyle: {type: 'default'}}},
                data: series_data[i]
            }
            temp_series.push(seriesItem);
        }
        option = {
            title: {
                text: title,
                subtext: subtitle
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
        }
        switch (chartArea.type) {
            //*******************************标准柱状图*******************************
            case 'BasicBar':
                var basicBarChart = new AllChartView.basicBarChartView;
                basicBarChart.render(chartArea.id, option);
                //new BasicBarChartView().render(chartArea.id, xAxis_data, series_name, series_data);
                break;
            //*******************************堆积柱状图*******************************
            case 'StackBar':
                new StackBarChartView().render(chartArea.id, xAxis_data, series_name, series_data);
                break;
            //*******************************温度计柱状图*******************************
            case 'ThermometerBar':
                new ThermometerBarChartView().render(chartArea.id, xAxis_data, series_name, series_data);
                break;


            //*******************************标准条形图*******************************
            case 'BasicHorizonBar':
                new BasicHorizonBarChartView().render(chartArea.id, xAxis_data, series_name, series_data);
                break;
            //*******************************堆积条形图*******************************
            case 'StackHorizonBar':
                new StackHorizonBarChartView().render(chartArea.id, xAxis_data, series_name, series_data);
                break;
            //*******************************旋风条形图*******************************
            case 'WindHorizonBar':
                new WindHorizonBarChartView().render(chartArea.id, xAxis_data, series_name, series_data);
                break;
            //*******************************多维条形图*******************************
            case 'MultiHorizonBar':
                new MultiHorizonBarChartView().render(chartArea.id, xAxis_data, series_name, series_data);
                break;
            //*******************************不等距条形图*******************************
            case 'UnEqualHorizonBar':
                new UnEqualHorizonBarChartView().render(chartArea.id, xAxis_data, series_name, series_data);
                break;


            //*******************************标准折线图*******************************
            case 'BasicLine':
                new BasicLineChartView().render(chartArea.id, xAxis_data, series_name, series_data);
                break;
            //*******************************堆积折线图*******************************
            case 'StackLine':
                new StackLineChartView().render(chartArea.id, xAxis_data, series_name, series_data);
                break;
            //*******************************不等距折线图*******************************
            case 'UnEqualLine':
                new UnEqualLineChartView().render(chartArea.id, xAxis_data, series_name, series_data);
                break;


            //*******************************标准饼图*******************************
            case 'BasicPie':
                series_data = [];
                var temp_data;

                xAxis_data = data[0].slice(1);
                series_name = data[0][0];
                temp_data = data[1].slice(1);
                for (var i = 0; i < temp_data.length; i++) {
                    var pieItem = {
                        name: xAxis_data[i],
                        value: temp_data[i]
                    }
                    series_data.push(pieItem);
                }

                new BasicPieChartView().render(chartArea.id, xAxis_data, series_name, series_data);
                break;
            //*******************************嵌套饼图*******************************
            case 'NestPie':
                series_data = [];
                temp_data = '';

                xAxis_data = data[0].slice(1);
                series_name = data[0][0];
                temp_data = data[1].slice(1);
                for (var i = 0; i < temp_data.length; i++) {
                    var pieItem = {
                        name: xAxis_data[i],
                        value: temp_data[i]
                    }
                    series_data.push(pieItem);
                }

                new NestPieChartView().render(chartArea.id, xAxis_data, series_name, series_data);
                break;
            //*******************************标准环形图*******************************
            case 'BasicRing':
                series_data = [];
                temp_data = '';

                xAxis_data = data[0].slice(1);
                series_name = data[0][0];
                temp_data = data[1].slice(1);
                for (var i = 0; i < temp_data.length; i++) {
                    var pieItem = {
                        name: xAxis_data[i],
                        value: temp_data[i]
                    }
                    series_data.push(pieItem);
                }

                new BasicRingChartView().render(chartArea.id, xAxis_data, series_name, series_data);
                break;


            //*******************************标准面积图*******************************
            case 'BasicArea':
                var basicAreaChart = new AllChartView.basicAreaChartView;
                basicAreaChart.render(chartArea.id, option);
                //new BasicAreaChartView().render(chartArea.id, xAxis_data, series_name, series_data);
                break;
            //*******************************堆积面积图*******************************
            case 'StackArea':
                new StackAreaChartView().render(chartArea.id, xAxis_data, series_name, series_data);
                break;


            //*******************************标准雷达图*******************************
            case 'BasicRadar':
                new BasicRadarChartView().render(chartArea.id, xAxis_data, series_name, series_data);
                break;
            //*******************************填充雷达图*******************************
            case 'FillRadar':
                new FillRadarChartView().render(chartArea.id, xAxis_data, series_name, series_data);
                break;


            //*******************************标准散点图*******************************
            case 'BasicScatter':

                new BasicScatterChartView().render(chartArea.id, xAxis_data, series_name, series_data);
                break;
        }

    }


    module.exports = {
        parseRtData: parseRtData
    };
});