/**
 * Created by Jun on 2015/3/30. 
 * 响应按钮新增图表区域
 */
define(function(require, exports, module) {
	var AddChart = require("./addChart");
	
	var BarChartView = require("./view/barChartView");
	var StackBarChartView = require("./view/stackBarChartView");
	var ThermometerBarChartView = require("./view/thermometerBarChartView");
	var LineChartView = require("./view/lineChartView");
	var PieChartView = require("./view/pieChartView");
	var BasicRadarChartView = require("./view/basicRadarChartView");
	var BasicScatterChartView = require("./view/basicScatterChartView");

	/*
     * 解析返回的json数据
     * 参数为返回的json
     */
    function parseRtData(data) {
        
        var chartType = AddChart.appendChartArea();//追加一个图标区域
        switch(chartType){
            case 'BasicBar'://基本柱状图
            	//******************数据处理*****************
            	var xAxis_data, series_name = new Array(), series_data = new Array();

                xAxis_data = data[0].slice(1);
                for(var i=1; i<data.length; i++){
                    series_name[i-1] = data[i][0];
                    series_data[i-1] = data[i].slice(1);
                }
                
                //*******************绘图*******************
                var barChartView = new BarChartView();
                barChartView.render(xAxis_data,series_name,series_data);
                break;
                
            case 'StackBar'://堆积柱状图
            	//******************数据处理*****************
            	var xAxis_data, series_name = new Array(), series_data = new Array();

                xAxis_data = data[0].slice(1);
                for(var i=1; i<data.length; i++){
                    series_name[i-1] = data[i][0];
                    series_data[i-1] = data[i].slice(1);
                }
                
            	//*******************绘图*******************
                var stackBarChartView = new StackBarChartView();
                stackBarChartView.render(xAxis_data,series_name,series_data);
                break;
                
            case 'ThermometerBar'://温度计柱状图
            	//******************数据处理*****************
            	var xAxis_data, series_name = new Array(), series_data = new Array();

                xAxis_data = data[0].slice(1);
                for(var i=1; i<data.length; i++){
                    series_name[i-1] = data[i][0];
                    series_data[i-1] = data[i].slice(1);
                }
                
            	//*******************绘图*******************
                var thermometerBarChartView = new ThermometerBarChartView();
                thermometerBarChartView.render(xAxis_data,series_name,series_data);
                break;
                
            case 'BasicPie'://标准饼图
            	//******************数据处理*****************
            	var xAxis_data, series_name , series_data = new Array();
            	var temp_data;

                xAxis_data = data[0].slice(1);
                series_name = data[0][0];
                temp_data = data[1].slice(1);
                for(var i=0; i<temp_data.length; i++){
                	var pieItem = {
                			name : xAxis_data[i],
                			value : temp_data[i]
                	}
                	series_data.push(pieItem);
                }
                
                //*******************绘图*******************
            	var pieChartView = new PieChartView();
                pieChartView.render(xAxis_data,series_name,series_data);
            	break;
            	   
            case 'BasicLine'://标准折线图
            	//******************数据处理*****************
            	var xAxis_data, series_name = new Array(), series_data = new Array();

                xAxis_data = data[0].slice(1);
                for(var i=1; i<data.length; i++){
                    series_name[i-1] = data[i][0];
                    series_data[i-1] = data[i].slice(1);
                }
                
                //*******************绘图*******************
            	var lineChartView = new LineChartView();
            	lineChartView.render(xAxis_data,series_name,series_data);
                break;
                
            case 'BasicArea'://标准面积图
            	//******************数据处理*****************
            	var xAxis_data, series_name = new Array(), series_data = new Array();
            	
            	xAxis_data = data[0].slice(1);
            	for(var i=1; i<data.length; i++){
            		series_name[i-1] = data[i][0];
            		series_data[i-1] = data[i].slice(1);
            	}
            	
            	//*******************绘图*******************
            	var lineChartView = new LineChartView();
            	lineChartView.render(xAxis_data,series_name,series_data);
            	break;
            
            case 'BasicRadar'://标准雷达图
            	//******************数据处理*****************
            	
            	//*******************绘图*******************
            	var basicRadar = new BasicRadarChartView();
                basicRadar.render(xAxis_data,series_name,series_data);
            	break;
            	
            case 'BasicScatter'://标准散点图
            	//******************数据处理*****************
            	
            	//*******************绘图*******************
            	var basicScatter = new BasicScatterChartView();
                basicScatter.render(xAxis_data,series_name,series_data);
            	break;
        }

    }
    

	module.exports = {
		parseRtData : parseRtData
	};
});