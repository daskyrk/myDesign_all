/**
 * Created by Jun on 2015/3/30.
 * 响应按钮新增图表区域
 */
define(function (require, exports, module) {
    var ChartDivModel = require("./model/chartDivModel");
    var ChartDivView = require("./view/chartDivView");
    var ShowMask = require("./showMask");

    var chartSum = $("div[id^='chart']").length;// 图表总数
    var chartType = "";

    /*
     * 给按钮添加点击事件
     *
     */
    var addChartDiv = function () {
        $("a[id^=addChart_]").click(function () {
            var maskDivSum = $(".maskDiv").length;//上传区域总数
            chartType = this.id.substr(9);// 获得ID里图表部分的名字作为图表类型传到后面
            var chartArea = appendChartDiv();//追加图表区域
            var uploadArea = ShowMask.getUploadArea();//获得一个新的上传区域，即html部分代码
            chartArea.view.$(".chartArea").append(uploadArea);//将新上传区域追加到新图表区域的内部
            var uploaderDomId = "uploader" + (maskDivSum + 1);//获得新上传区域的id
            ShowMask.createUploader(chartArea, uploaderDomId, "uploaderTemplate" + maskDivSum);//初始化新上传区域
        });
    };

    /*
     * 初始化图表区域
     *
     */
    function initChart() {
        var chartDivModel = new ChartDivModel();
        chartDivModel.set({
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
                    check: "checked"
                },
                "four": {
                    name: "显示工具箱",
                    check: "checked"
                },
                "five": {
                    name: "显示动画",
                    check: "checked"
                }
            }
        });
        var chartView = new ChartDivView({
            model: chartDivModel
        });
        return chartView;
    }

    /*
     * 追加图表区域
     *
     */
    function appendChartDiv() {
        var chartDivView = initChart();
        $("#sortable_portlets").append(chartDivView.render().$el);
        chartSum++;
        var newChartDiv = {
            id: chartDivView.model.get("id"),
            view: chartDivView,
            type: chartType
        }
        return newChartDiv;
    }


    module.exports = {
        addChartDiv: addChartDiv
    };
});