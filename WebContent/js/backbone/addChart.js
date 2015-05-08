/**
 * Created by Jun on 2015/3/30.
 * 响应按钮新增图表区域
 */
define(function (require, exports, module) {
    var ChartModel = require("./model/chartDivModel");
    var ChartView = require("./view/chartDivView");
    var ShowMask = require("./showMask");

    var chartSum = $("div[id^='chart']").length;// 图表总数
    var chartType = "";

    /*
     * 给按钮添加点击事件
     *
     */
    var addChart = function () {
        $("a[id^=addChart_]").click(function () {
            var maskDivSum = $(".maskDiv").length;//上传区域总数
            // 获得ID里图表部分的名字
            chartType = this.id.substr(9);
            //new ShowMask(chartType);
            //追加图表区域
            var chartArea = appendChartArea();
            //获得一个新的上传区域，即html部分代码
            var uploadArea = ShowMask.getUploadArea(chartType);
            //将上传区域追加到新图标区域的内部
            chartArea.view.$(".chartArea").append(uploadArea);
            //获得新上传区域的id
            var uploaderDomId = "uploader" + (maskDivSum + 1);
            //初始化新上传区域
            ShowMask.createUploader(chartArea, uploaderDomId, "uploaderTemplate" + maskDivSum);
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
            id: chartView.model.get("id"),
            view: chartView,
            type: chartType
        }
        return newChartArea;
    }


    module.exports = {
        addChart: addChart,
        appendChartArea: appendChartArea
    };
});