/**
 * Created by Jun on 2015/3/30. 
 * 响应按钮新增图表区域
 */
define(function(require, exports, module) {
	var ChartModel = require("./model/chartDivModel");
	var ChartView = require("./view/chartDivView");
	var ShowMask = require("./showMask");
	
	var chartSum = $("div[id^='chart']").length;// 图表总数
	var chartType = "";

	/*
	 * 给按钮添加点击事件
	 * 
	 */
	var addChart = function() {
		$("a[id^=addChart_]").click(function() {
			// 获得ID里图表部分的名字
			chartType = this.id.substr(9);
			var mask = new ShowMask(chartType);

		});
	};

	/*
	 * 初始化图表区域
	 * 
	 */
	function initChart() {
		var chartModel = new ChartModel();
		chartModel.set({
			"id" : "chart" + (chartSum + 1),
			"name" : chartType,
			"filterName" : "过滤器",
			"filter" : {
				"one" : "1",
				"two" : "3",
				"three" : "4",
				"four" : "5",
				"five" : "6"
			}
		});
		var chartView = new ChartView({
			model : chartModel
		});
		return chartView;
	}
	
	/*
	 * 追加图表区域
	 * 
	 */
	function appendChartArea() {
		var chartView = initChart();
		if ($(".row:last > div").length < 2) {//如果最后一行图表数不到2个则追加图表
            $(".row:last").append(chartView.render().$el);
        } else {//最后一行图表数达到2个则追加一行再追加图表
            $(".page-content").append("<div class='row'></div>");
            $(".row:last").append(chartView.render().$el);
        }
        chartSum++;
        return chartType;
	}


	module.exports = {
		addChart : addChart,
		appendChartArea : appendChartArea
	};
});