/**
 * Created by Jun on 2015/4/9.
 * 显示上传遮罩层、初始化上传区域
 */
define(function (require, exports, module) {
    var MaskModel = require("./model/maskModel");
    var MaskView = require("./view/maskView");

    /*
     * 获得一个新上传区域
     */
    function getUploadArea() {
        var maskDivSum = $("div.maskDiv").length;//上传区域总数
        var maskModel = new MaskModel();
        maskModel.set({
            "uploaderDomId": "uploader" + (maskDivSum + 1),
            "uploaderTemplateId": "uploaderTemplate" + maskDivSum
        });
        var maskView = new MaskView({
            model: maskModel
        });
        var tempDiv = maskView.render().$el;
        return tempDiv;
    }

    /*
     * 创建上传实例
     * 参数为图表区域区域dom，上传区域Domid和scriptId
     */
    function createUploader(chartArea, uploaderDomId, uploaderTemplateId) {
        new qq.FineUploader({
            element: document.getElementById(uploaderDomId),
            template: uploaderTemplateId,
            validation: {
                allowedExtensions: ['xls', 'xlsx'],
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
                        beforeSend: function (XMLHttpRequest) {
                        },
                        success: function (data, textStatus) {
                            var parseRtData = require("./parseRtData");
                            parseRtData.parseRtData(chartArea, data);
                        },
                        // complete : function(XMLHttpRequest, textStatus) {
                        //
                        // },
                        error: function () {
                            alert("ajax失败！");
                        }
                    });
                },
                onSubmit: function (id, fileName) {
                    // alert("uploading");
                }
            }
        });
    }

    module.exports = {
        getUploadArea: getUploadArea,
        createUploader: createUploader
    };
});
