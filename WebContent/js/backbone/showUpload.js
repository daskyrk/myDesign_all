/**
 * Created by Jun on 2015/4/12.
 * 显示上传区域
 */
define(function (require, exports, module) {
    var showUpload = function () {
        var UploadModel = require("./model/uploadModel");
        var UploadView = require("./view/uploadView");

        $("#showMask").click(function () {
            var uploadModel = new UploadModel();
            var uploadView = new UploadView({
                model: uploadModel
            });
            $("#maskDiv").append(uploadView.render().$el);
        });
    };

    module.exports = showUpload;
});
