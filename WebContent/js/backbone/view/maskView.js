/**
 * Created by Jun on 2015/4/9.
 * 上传遮罩层的view
 */
define(function (require, exports, module) {
    var MaskView = Backbone.View.extend({

        template: _.template(require("../tpl/maskTpl.html")),

        id: "",

        init: function () {

        },

        render: function () {
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        },

        events: {
            "click #closeMask": "removeMask"
        },

        removeMask: function () {
            var maskDiv = $("#maskDiv");
            maskDiv.remove();
        }

    });

    module.exports = MaskView;
});
