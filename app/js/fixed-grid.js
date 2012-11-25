var app = angular.module("fixed-grid", []);

//$(document).ready(function () {
////            sh_highlightDocument();
//
//    //default options defined in $.fn.fixedTable.defaults - at the bottom of this file.
//    window.setTimeout(setItUp, 500);
//
//
//});


app.factory('FixedGrid', function ($window) {
    var $ = $window.$;
    return {
        setup:function () {
            var Id = $(".tableDiv").get(0).id;
            var maintbheight = 350;
            var maintbwidth = 760;

            var options = {
                width:maintbwidth,
                height:maintbheight,
                fixedColumns:0,
                classHeader:"fixedHead",
                fixedColumnWidth:0,
                outerId:Id
            };
            var mainid = "#" + options.outerId;
            var tbl = $(mainid + " table");
            var layout = $(".fixedArea");

            var width = options.width;

            $(".fixedContainer", layout).width(width);

            $(".fixedContainer ." + options.classHeader, layout).css({
                width:(width) + "px",
                "float":"left",
                "overflow":"hidden"
            });

            $(".fixedContainer .fixedTable", layout).css({
                "float":"left",
                width:(width + 16) + "px",
                "overflow":"auto"
            });
            $(".fixedContainer", layout).css({
                width:width - 1,
                "float":"left"
            });    //adjust the main container to be just larger than the fixedTable

            //adjust the table widths in the fixedContainer area
            var fh = $(".fixedContainer > ." + options.classHeader + " > table", layout);
            var ft = $(".fixedContainer > .fixedTable > table", layout);

            var maxWidth = fh.width();
            if (ft.length > 0 && ft.width() > maxWidth) {
                maxWidth = ft.width();
            }

            if (fh.length) {
                fh.width(maxWidth);
            }
            if (ft.length) {
                ft.width(maxWidth);
            }

            //set the height of the table area, minus the heights of the header/footer.
            // note: we need to do this after the other adjustments, otherwise these changes would be overwrote
            var h = options.height - parseInt($(".fixedContainer > ." + options.classHeader, layout).height());
            //sanity check
            if (h < 0) {
                h = options.height;
            }

            $(".fixedContainer > .fixedTable", layout).height(h);

            // Apply the scroll handlers
            $(".fixedContainer > .fixedTable", layout).scroll(function () {
                handleScroll(mainid, options);
            });
            //the handleScroll() method is defined near the bottom of this file.

            //$.fn.fixedTable.adjustSizes(mainid);
            adjustSizes(options);
            return tbl;

            function handleScroll(mainid, options) {
                //Find the scrolling offsets
                var tblarea = $(mainid + " .fixedContainer > .fixedTable");
                var x = tblarea[0].scrollLeft;
                var y = tblarea[0].scrollTop;

                $(mainid + " .fixedContainer > ." + options.classHeader)[0].scrollLeft = x;
            }

            function adjustSizes(options) {

                var Id = options.outerId;
                var maintbheight = options.height;
                var backcolor = options.Contentbackcolor;
                var hovercolor = options.Contenthovercolor;
                var fixedColumnbackcolor = options.fixedColumnbackcolor;
                var fixedColumnhovercolor = options.fixedColumnhovercolor;

                //adjust the cell widths so the header/footer and table cells line up
                var ccount = $("#" + Id + " .fixedContainer ." + options.classHeader + " table tr:first td").size();
                var widthArray = new Array();
                var totall = 0;

                $("#" + Id + " .fixedContainer ." + options.classHeader + " table tr:first td").each(function (pos) {
                    var cwidth = $(this).width();
                    $("#" + Id + " .fixedContainer .fixedTable table tbody td").each(function (i) {
                        if (i % ccount == pos) {
                            if ($(this).width() > cwidth) {
                                cwidth = $(this).width();
                            }
                        }
                    });
                    widthArray[pos] = cwidth;
                    totall += (cwidth + 2);
                });

                $("#" + Id + " .fixedContainer ." + options.classHeader + " table").width(totall + 100);
                $("#" + Id + " .fixedContainer .fixedTable table").width(totall + 100);
                for (i = 0; i < widthArray.length; i++) {
                    $("#" + Id + " .fixedContainer ." + options.classHeader + " table tr td").each(function (j) {
                        if (j % ccount == i) {
                            $(this).attr("width", widthArray[i] + "px");
                        }
                    });

                    $("#" + Id + " .fixedContainer .fixedTable table tr td").each(function (j) {
                        if (j % ccount == i) {
                            $(this).attr("width", widthArray[i] + "px");
                        }
                    });
                }

                var contenttbH = $("#" + Id + " .fixedContainer .fixedTable table").height();
                if (contenttbH < maintbheight) {
                    $("#" + Id + " .fixedContainer .fixedTable").height(contenttbH + 20);

                    $("#" + Id + " .fixedContainer ." + options.classHeader).width($("#" + Id + " .fixedContainer ." + options.classHeader).width() + 16);
                }
            }
        }
    };
});


function FixedGridCtrl($scope, FixedGrid) {
    $scope.headers = [
        {"label":"column 1"},
        {"label":"column 2"},
        {"label":"column 3"},
        {"label":"column 4"},
        {"label":"column 5"},
        {"label":"column 6"},
        {"label":"column 7"},
        {"label":"column 8"}
    ];

    $scope.rows = [
        {
            "cells":[
                {"value":"This is some big text"},
                {"value":"This is some even bigger text"},
                {"value":"small text"},
                {"value":"123"},
                {"value":"9th May 1980"},
                {"value":"just text"},
                {"value":"something"},
                {"value":"another thing"}
            ]
        },
        {
            "cells":[
                {"value":"This is some even bigger text"},
                {"value":"9th May 1980"},
                {"value":"small text"},
                {"value":"something"},
                {"value":"just text"},
                {"value":"This is some big text"},
                {"value":"123"},
                {"value":"another thing"}
            ]
        },
        {
            "cells":[
                {"value":"This is some big text"},
                {"value":"small text"},
                {"value":"just text"},
                {"value":"123"},
                {"value":"9th May 1980"},
                {"value":"This is some even bigger text"},
                {"value":"something"},
                {"value":"another thing"}
            ]
        }
    ];

    $scope.$watch('rows', function () {
        window.setTimeout(FixedGrid.setup, 500);
    }, function (a, b) {
        return a.length = b.length;
    });

    $scope.addRows = function () {
        $scope.rows.push({
                    "cells":[
                        {"value":"This is some even bigger text"},
                        {"value":"small text"},
                        {"value":"9th May 1980"},
                        {"value":"123"},
                        {"value":"This is some big text"},
                        {"value":"something"},
                        {"value":"just text"},
                        {"value":"another thing"}
                    ]
                },
                {
                    "cells":[
                        {"value":"small text"},
                        {"value":"This is some big text"},
                        {"value":"This is some even bigger text"},
                        {"value":"123"},
                        {"value":"9th May 1980"},
                        {"value":"something"},
                        {"value":"just text"},
                        {"value":"another thing"}
                    ]
                },
                {
                    "cells":[
                        {"value":"This is some even bigger text"},
                        {"value":"This is some big text"},
                        {"value":"123"},
                        {"value":"9th May 1980"},
                        {"value":"just text"},
                        {"value":"small text"},
                        {"value":"something"},
                        {"value":"another thing"}
                    ]
                },
                {
                    "cells":[
                        {"value":"just text"},
                        {"value":"This is some even bigger text"},
                        {"value":"small text"},
                        {"value":"123"},
                        {"value":"9th May 1980"},
                        {"value":"something"},
                        {"value":"This is some big text"},
                        {"value":"another thing"}
                    ]
                },
                {
                    "cells":[
                        {"value":"123"},
                        {"value":"This is some even bigger text"},
                        {"value":"small text"},
                        {"value":"This is some big text"},
                        {"value":"9th May 1980"},
                        {"value":"something"},
                        {"value":"just text"},
                        {"value":"another thing"}
                    ]
                },
                {
                    "cells":[
                        {"value":"This is some big text"},
                        {"value":"This is some even bigger text"},
                        {"value":"small text"},
                        {"value":"123"},
                        {"value":"9th May 1980"},
                        {"value":"just text"},
                        {"value":"something"},
                        {"value":"another thing"}
                    ]
                },
                {
                    "cells":[
                        {"value":"This is some even bigger text"},
                        {"value":"9th May 1980"},
                        {"value":"small text"},
                        {"value":"something"},
                        {"value":"just text"},
                        {"value":"This is some big text"},
                        {"value":"123"},
                        {"value":"another thing"}
                    ]
                },
                {
                    "cells":[
                        {"value":"This is some big text"},
                        {"value":"small text"},
                        {"value":"just text"},
                        {"value":"123"},
                        {"value":"9th May 1980"},
                        {"value":"This is some even bigger text"},
                        {"value":"something"},
                        {"value":"another thing"}
                    ]
                },
                {
                    "cells":[
                        {"value":"This is some even bigger text"},
                        {"value":"small text"},
                        {"value":"9th May 1980"},
                        {"value":"123"},
                        {"value":"This is some big text"},
                        {"value":"something"},
                        {"value":"just text"},
                        {"value":"another thing"}
                    ]
                },
                {
                    "cells":[
                        {"value":"small text"},
                        {"value":"This is some big text"},
                        {"value":"This is some even bigger text"},
                        {"value":"123"},
                        {"value":"9th May 1980"},
                        {"value":"something"},
                        {"value":"just text"},
                        {"value":"another thing"}
                    ]
                },
                {
                    "cells":[
                        {"value":"This is some even bigger text"},
                        {"value":"This is some big text"},
                        {"value":"123"},
                        {"value":"9th May 1980"},
                        {"value":"just text"},
                        {"value":"small text"},
                        {"value":"something"},
                        {"value":"another thing"}
                    ]
                },
                {
                    "cells":[
                        {"value":"just text"},
                        {"value":"This is some even bigger text"},
                        {"value":"small text"},
                        {"value":"123"},
                        {"value":"9th May 1980"},
                        {"value":"something"},
                        {"value":"This is some big text"},
                        {"value":"another thing"}
                    ]
                },
                {
                    "cells":[
                        {"value":"123"},
                        {"value":"This is some even bigger text"},
                        {"value":"small text"},
                        {"value":"This is some big text"},
                        {"value":"9th May 1980"},
                        {"value":"something"},
                        {"value":"just text"},
                        {"value":"another thing"}
                    ]
                });
//        $scope.$digest();
    };
}