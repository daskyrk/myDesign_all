/**
 * Created by Jun on 2015/3/30.
 * 响应按钮新增图表区域
 */
define(function (require, exports, module) {
    var ChartModel = require("./model/chartDivModel");
    var ChartView = require("./view/chartDivView");
    var ShowMask = require("./showMask");

    var chartSum = $("div[id^='chart']").length;// 图表总数
    var maskDivSum = $("div.maskDiv").length;//上传区域总数
    var chartType = "";

    /*
     * 给按钮添加点击事件
     *
     */
    var addChart = function () {
        $("a[id^=addChart_]").click(function () {
            // 获得ID里图表部分的名字
            chartType = this.id.substr(9);
            //new ShowMask(chartType);
            //追加图表区域
            var chartArea = appendChartArea();
            //如果区域里没有图表，说明未上传数据，显示图表类型提示
            var uploadArea = ShowMask.getUploadArea(chartType);
            chartArea.view.$(".chartArea").append(uploadArea);
            var uploaderDomId = "uploader" + (maskDivSum + 1);
            ShowMask.createUploader(chartArea,uploaderDomId,"uploaderTemplate"+chartSum);
        });
    };

    /*
     * 初始化图表区域
     *
     */
    function initChart() {
        var chartModel = new ChartModel();
        chartModel.set({
            "id": "chart" + (chartSum + 1),
            "name": chartType,
            "filterName": "图表属性",
            "filter": {
                "one": {
                    name: "显示标题",
                    check: "checked"
                },
                "two": {
                    name: "显示图例",
                    check: "checked"
                },
                "three": {
                    name: "显示提示",
                    check: ""
                },
                "four": {
                    name: "显示工具箱",
                    check: "checked"
                },
                "five": {
                    name: "显示网格",
                    check: "checked"
                }
            }
        });
        var chartView = new ChartView({
            model: chartModel
        });
        return chartView;
    }

    /*
     * 追加图表区域
     *
     */
    function appendChartArea() {
        var chartView = initChart();
        $("#sortable_portlets").append(chartView.render().$el);
        chartSum++;
        var newChartArea = {
            id:chartView.model.get("id"),
            view:chartView,
            type:chartType
        }
        return newChartArea;
    }


    module.exports = {
        addChart: addChart,
        appendChartArea: appendChartArea
    };
});