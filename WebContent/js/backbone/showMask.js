/**
 * Created by Jun on 2015/4/9. 显示上传遮罩层
 */
define(function (require, exports, module) {
    var MaskModel = require("./model/maskModel");
    var MaskView = require("./view/maskView");

    var maskDivSum = $("div.maskDiv").length;//上传区域总数

    /*
     * 显示上传遮罩层 参数为图表类型
     */
    function showMask(chartType) {
        var maskModel = new MaskModel();
        maskModel.set({
            "uploaderDomId": "uploader" + (maskDivSum + 1)
        });
        var maskView = new MaskView({
            model: maskModel
        });
        $("body").append(maskView.render().$el);
        createUploader(chartType);
    };

    function getUploadArea(chartType) {
        var maskModel = new MaskModel();
        maskModel.set({
            "uploaderDomId": "uploader" + (maskDivSum + 1),
            "uploaderTemplateId" : "uploaderTemplate"+maskDivSum
        });
        var maskView = new MaskView({
            model: maskModel
        });
        var tempDiv = maskView.render().$el;
        return tempDiv;
    }

    /*
     * 创建上传实例 参数为上传文件区域id
     */
    function createUploader(chartArea,uploaderDomId,uploaderTemplateId) {//FIXME：uploaderTemplateId暂时没用，script的id有重复现象
        var thumbnailuploader = new qq.FineUploader({
            element: document.getElementById(uploaderDomId),
            template: "qq-simple-thumbnails-template",
            validation: {
                allowedExtensions: ['xls'],
                sizeLimit: 1048576 // 100 M = 100 * 1024 bytes*1024
            },
            request: {
                endpoint: 'UploadReceiver'
            },
            callbacks: {
                onComplete: function (id, fileName, responseJSON) {
                    console.log(responseJSON.uuid);
                    // 上传完成后发送解析数据请求
                    $.ajax({
                        type: "POST",
                        url: "ChartParse",
                        dataType: "json",
                        data: "filePath=" + responseJSON.uuid,
                        // timeout : 20000,
                        // cache : false,
                        beforeSend: function (XMLHttpRequest) {
                        },
                        success: function (data, textStatus) {
                            var parseRtData = require("./parseRtData");
                            parseRtData.parseRtData(chartArea,data);
                            //$("").remove();
                        },
                        // complete : function(XMLHttpRequest, textStatus) {
                        //
                        // },
                        error: function () {
                            alert("ajax失败！");
                        }
                    });
//					alert(response.getParmeter("filePath"));
                },
                onSubmit: function (id, fileName) {
                    // alert("uploading");
                }
            }
        });
    }

    module.exports = {
        showMask: showMask,
        getUploadArea: getUploadArea,
        createUploader: createUploader
    };
});
