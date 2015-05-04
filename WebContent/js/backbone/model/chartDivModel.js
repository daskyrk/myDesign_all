/**
 * Created by Jun on 2015/3/30.
 * 图表div的model
 */
define(function(require, exports, module){

    var ChartDiv = Backbone.Model.extend({
        defaults : {
            "id" : "",
            "name":"",
            "filterName":"",
            "filter" : {}
        }
    });
    module.exports = ChartDiv;
});