var app = angular.module("lists", []);

app.directive("myList", function () {
    return {
        priority:0,
        template:'partials/grid-widget.html',
        replace:true,
        transclude:false,
        restrict:'EA',
        controller:GridCtrl,
        scope:{
            "data":"=gridData"
        }
    };
});