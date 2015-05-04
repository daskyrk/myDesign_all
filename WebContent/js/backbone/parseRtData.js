/**
 * Created by Jun on 2015/3/30.
 * 响应按钮新增图表区域
 */
define(function (require, exports, module) {
    var AddChart = require("./addChart");

    /************************柱状图************************/
    var BasicBarChartView = require("./chartView/basicBarChartView");
    var StackBarChartView = require("./chartView/stackBarChartView");
    var ThermometerBarChartView = require("./chartView/thermometerBarChartView");

    /************************折线图************************/
    var BasicLineChartView = require("./chartView/basicLineChartView");
    var StackLineChartView = require("./chartView/stackLineChartView");

    /************************面积图************************/
    var BasicAreaChartView = require("./chartView/basicAreaChartView");
    var StackAreaChartView = require("./chartView/stackAreaChartView");

    /************************饼图************************/
    var BasicPieChartView = require("./chartView/basicPieChartView");
    var NestPieChartView = require("./chartView/nestPieChartView");
    var BasicRingChartView = require("./chartView/basicRingChartView");

    /************************雷达图************************/
    var BasicRadarChartView = require("./chartView/basicRadarChartView");

    /************************散点图************************/
    var BasicScatterChartView = require("./chartView/basicScatterChartView");

    /*
     * 解析返回的json数据
     * 参数为返回的json
     */
    function parseRtData(data) {
        var xAxis_data, series_name = [], series_data = [];

        xAxis_data = data[0].slice(1);
        for (var i = 1; i < data.length; i++) {
            series_name[i - 1] = data[i][0];
            series_data[i - 1] = data[i].slice(1);
        }
        var chartType = AddChart.appendChartArea();//追加一个图标区域
        switch (chartType) {
            //*******************************基本柱状图*******************************
            case 'BasicBar':
                new BasicBarChartView().render(xAxis_data, series_name, series_data);
                break;
            //*******************************堆积柱状图*******************************
            case 'StackBar':
                new StackBarChartView().render(xAxis_data, series_name, series_data);
                break;
            //*******************************温度计柱状图*******************************
            case 'ThermometerBar':
                new ThermometerBarChartView().render(xAxis_data, series_name, series_data);
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

                new BasicPieChartView().render(xAxis_data, series_name, series_data);
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

                new NestPieChartView().render(xAxis_data, series_name, series_data);
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

                new BasicRingChartView().render(xAxis_data, series_name, series_data);
                break;
            //*******************************标准折线图*******************************
            case 'BasicLine':
                new BasicLineChartView().render(xAxis_data, series_name, series_data);
                break;
            //*******************************堆积折线图*******************************
            case 'StackLine':
                new StackLineChartView().render(xAxis_data, series_name, series_data);
                break;
            //*******************************标准面积图*******************************
            case 'BasicArea':
                new BasicAreaChartView().render(xAxis_data, series_name, series_data);
                break;
            //*******************************堆积面积图*******************************
            case 'StackArea':
                new StackAreaChartView().render(xAxis_data, series_name, series_data);
                break;
            //*******************************标准雷达图*******************************
            case 'BasicRadar':

                new BasicRadarChartView().render(xAxis_data, series_name, series_data);
                break;
            //*******************************标准散点图*******************************
            case 'BasicScatter':

                new BasicScatterChartView().render(xAxis_data, series_name, series_data);
                break;
        }

    }


    module.exports = {
        parseRtData: parseRtData
    };
});