/**
 * Created by Jun on 2015/4/9.
 * 上传遮罩层的model
 */
define(function(require, exports, module){

    var mask = Backbone.Model.extend({
        defaults : {
            "uploaderDomId" : "",
            "uploaderTemplateId" : ""
        }
    });
    module.exports = mask;
});