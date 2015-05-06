var PortletDraggable = function () {

    return {
        //main function to initiate the module
        init: function () {

            if (!jQuery().sortable) {
                return;
            }

            $("#sortable_portlets").sortable({
                //connectWith: ".column",
                //items: ".portlet",
                //opacity: 0.8,
                //coneHelperSize: true,
                //placeholder: 'portlet-sortable-placeholder',
                //forcePlaceholderSize: true,
                //tolerance: "pointer",
                //helper: "clone",
                //cancel: ".portlet-sortable-empty",
                //revert: 250, // animation in milliseconds
                //update: function(b, c) {
                //    if (c.item.prev().hasClass("portlet-sortable-empty")) {
                //        c.item.prev().before(c.item);
                //    }
                //}
            });
        }
    };
}();