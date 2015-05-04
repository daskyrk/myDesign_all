/**
 * Created by Jun on 2015/4/9. 显示上传遮罩层
 */
define(function(require, exports, module) {
	var MaskModel = require("./model/maskModel");
	var MaskView = require("./view/maskView");

	/*
	 * 显示上传遮罩层 参数为图表类型
	 */
	var showMask = function(chartType) {
		var maskModel = new MaskModel();
		var maskView = new MaskView({
			model : maskModel
		});
		$("body").append(maskView.render().$el);
		createUploader(chartType);
	};

	/*
	 * 创建上传实例 参数为图表类型
	 */
	function createUploader(chartType) {
		var thumbnailuploader = new qq.FineUploader({
			element : document.getElementById('thumbnail-fine-uploader'),
			template : "qq-simple-thumbnails-template",
            validation:   {
                allowedExtensions: ['xls'],
                sizeLimit: 1048576 // 100 M = 100 * 1024 bytes*1024
            },
			request : {
				endpoint : 'UploadReceiver'
			},
			callbacks : {
				onComplete : function(id, fileName, responseJSON) {
					console.log(responseJSON.uuid);
					// 上传完成后发送解析数据请求
					$.ajax({
						type : "POST",
						url : "ChartParse",
						dataType : "json",
						data : "filePath=" + responseJSON.uuid,
						// timeout : 20000,
						// cache : false,
						beforeSend : function(XMLHttpRequest) {
						},
						success : function(data, textStatus) {
							var parseRtData = require("./parseRtData");
							parseRtData.parseRtData(data);
							$("#maskDiv").remove();
						},
						// complete : function(XMLHttpRequest, textStatus) {
						//
						// },
						error : function() {
							alert("ajax失败！");
						}
					});
//					alert(response.getParmeter("filePath"));
				},
				onSubmit : function(id, fileName) {
					// alert("uploading");
				}
			}
		});
	}

	module.exports = showMask;
});
