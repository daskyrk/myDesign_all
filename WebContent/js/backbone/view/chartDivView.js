/**
 * Created by Jun on 2015/3/30.
 * 图表div的view
 */
define(function (require, exports, module) {
    var ChartDivView = Backbone.View.extend({

        template: _.template(require("../tpl/chartDivTpl.html")),

        id: "",

        className: "col-md-6 col-sm-6 sortable float-left",

        init: function () {

        },

        render: function () {
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        }

    });

    module.exports = ChartDivView;
});