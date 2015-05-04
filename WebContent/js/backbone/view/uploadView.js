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
            "click #closeMask": "removeMask",
            "click #maskDiv": "removeMask"
        },
        
        removeMask: function() {
        	var maskDiv = $("#maskDiv");
        	maskDiv.remove();
        	
//        	var Modernizr = require("../../modernizr.custom");
//        	
//        	triggerBttn = $("#showMask"),
//        	overlay = $("#maskDiv"),
//        	closeBttn = $("#closeMask");
//        	transEndEventNames = {
//        		'WebkitTransition': 'webkitTransitionEnd',
//        		'MozTransition': 'transitionend',
//        		'OTransition': 'oTransitionEnd',
//        		'msTransition': 'MSTransitionEnd',
//        		'transition': 'transitionend'
//        	},
//        	transEndEventName = transEndEventNames[ Modernizr.prefixed( 'transition' ) ],
//        	support = { transitions : Modernizr.csstransitions };
//        	var Classie = require("../../classie");
//        	var classie = new Classie();
//        	if( classie.has( overlay, 'open' ) ) {
//        		classie.remove( overlay, 'open' );
//        		classie.add( overlay, 'close' );
//        		var onEndTransitionFn = function( ev ) {
//        			if( support.transitions ) {
//        				if( ev.propertyName !== 'visibility' ) return;
//        				this.removeEventListener( transEndEventName, onEndTransitionFn );
//        			}
//        			classie.remove( overlay, 'close' );
//        		};
//        		if( support.transitions ) {
//        			overlay.addEventListener( transEndEventName, onEndTransitionFn );
//        		}else {
//        			onEndTransitionFn();
//        		};
//        	}else if( !classie.has( overlay, 'close' ) ) {
//        		classie.add( overlay, 'open' );
//        	};
        }

    });

    module.exports = MaskView;
});
