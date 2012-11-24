var app = angular.module("fixed-grid", []);

$(document).ready(function () {
//            sh_highlightDocument();

    //default options defined in $.fn.fixedTable.defaults - at the bottom of this file.
    window.setTimeout(setItUp, 500);


//    $(".tableDiv").each(function () {
//        var Id = $(this).get(0).id;
//        var maintbheight = 350;
//        var maintbwidth = 760;
//
//        $("#" + Id + " .FixedTables").fixedTable({
//            width:maintbwidth,
//            height:maintbheight,
//            fixedColumns:0,
//            classHeader:"fixedHead",
//            classFooter:"fixedFoot",
//            classColumn:"fixedColumn",
//            fixedColumnWidth:0,
//            outerId:Id
//        });
//    });

//    console.log($("#container").html());
//    window.setTimeout(function() {
//
//        $("output").val($("container").html());
//    }, 1000);
});

var setItUp = function () {
    var Id = $(".tableDiv").get(0).id;
    var maintbheight = 350;
    var maintbwidth = 760;

    var options = $.extend({}, $.fn.fixedTable.defaults, {
        width:maintbwidth,
        height:maintbheight,
        fixedColumns:0,
        classHeader:"fixedHead",
        classFooter:"fixedFoot",
        //        classColumn:"fixedColumn",
        fixedColumnWidth:0,
        outerId:Id
    });
    var mainid = "#" + options.outerId;
    var tbl = this;
    var layout = $(".fixedArea");
    //            var layout = buildLayout(tbl, opts);
    //see the buildLayout() function below

    //we need to set the width (in pixels) for each of the tables in the fixedContainer area
    //but, we need to subtract the width of the fixedColumn area.
    var w = options.width - options.fixedColumnWidth;
    //sanity check
    if (w <= 0) {
        w = options.width;
    }

    $(".fixedContainer", layout).width(w);

    $(".fixedContainer ." + options.classHeader, layout).css({
        width:(w) + "px",
        "float":"left",
        "overflow":"hidden"
    });

    $(".fixedContainer .fixedTable", layout).css({
        "float":"left",
        width:(w + 16) + "px",
        "overflow":"auto"
    });
    $(".fixedContainer", layout).css({
        width:w - 1,
        "float":"left"
    });    //adjust the main container to be just larger than the fixedTable

    $(".fixedContainer ." + options.classFooter, layout).css({
        width:(w) + "px",
        "float":"left",
        "overflow":"hidden"
    });
    $("." + options.classColumn + " > .fixedTable", layout).css({
        "width":options.fixedColumnWidth,
        "overflow":"hidden",
        //        "border-collapse":$(tbl).css("border-collapse"),
        "padding":"0"
    });

    $("." + options.classColumn, layout).width(options.fixedColumnWidth);
    $("." + options.classColumn, layout).height(options.height);
    $("." + options.classColumn + " ." + options.classHeader + " table tbody tr td", layout).width(options.fixedColumnWidth);
    $("." + options.classColumn + " ." + options.classFooter + " table tbody tr td", layout).width(options.fixedColumnWidth);

    //adjust the table widths in the fixedContainer area
    var fh = $(".fixedContainer > ." + options.classHeader + " > table", layout);
    var ft = $(".fixedContainer > .fixedTable > table", layout);
    var ff = $(".fixedContainer > ." + options.classFooter + " > table", layout);

    var maxWidth = fh.width();
    if (ft.length > 0 && ft.width() > maxWidth) {
        maxWidth = ft.width();
    }
    if (ff.length > 0 && ff.width() > maxWidth) {
        maxWidth = ff.width();
    }


    if (fh.length) {
        fh.width(maxWidth);
    }
    if (ft.length) {
        ft.width(maxWidth);
    }
    if (ff.length) {
        ff.width(maxWidth);
    }

    //adjust the widths of the fixedColumn header/footer to match the fixed columns themselves
    $("." + options.classColumn + " > ." + options.classHeader + " > table > tbody > tr:first > td", layout).each(function (pos) {
        var tblCell = $("." + options.classColumn + " > .fixedTable > table > tbody > tr:first > td:eq(" + pos + ")", layout);
        var tblFoot = $("." + options.classColumn + " > ." + options.classFooter + " > table > tbody > tr:first > td:eq(" + pos + ")", layout);
        var maxWidth = $(this).width();
        if (tblCell.width() > maxWidth) {
            maxWidth = tblCell.width();
        }
        if (tblFoot.length && tblFoot.width() > maxWidth) {
            maxWidth = tblFoot.width();
        }
        $(this).width(maxWidth);
        $(tblCell).width(maxWidth);
        if (tblFoot.length) {
            $(tblFoot).width(maxWidth);
        }
    });


    //set the height of the table area, minus the heights of the header/footer.
    // note: we need to do this after the other adjustments, otherwise these changes would be overwrote
    var h = options.height - parseInt($(".fixedContainer > ." + options.classHeader, layout).height()) - parseInt($(".fixedContainer > ." + options.classFooter, layout).height());
    //sanity check
    if (h < 0) {
        h = options.height;
    }
    $(".fixedContainer > .fixedTable", layout).height(h);
    $("." + options.classColumn + " > .fixedTable", layout).height(h);

    //Adjust the fixed column area if we have a horizontal scrollbar on the main table
    // - specifically, make sure our fixedTable area matches the main table area minus the scrollbar height,
    //   and the fixed column footer area lines up with the main footer area (shift down by the scrollbar height)
    var h = $(".fixedContainer > .fixedTable", layout)[0].offsetHeight - 16;
    $("." + options.classColumn + " > .fixedTable", layout).height(h);  //make sure the row area of the fixed column matches the height of the main table, with the scrollbar

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

//                  $(mainid + " ." + options.classColumn + " > .fixedTable")[0].scrollTop = y;
        $(mainid + " .fixedContainer > ." + options.classHeader)[0].scrollLeft = x;
//                  $(mainid + " .fixedContainer > ." + options.classFooter)[0].scrollLeft = x;
    }

    function adjustSizes(options) {

        var Id = options.outerId;
        var maintbheight = options.height;
        var backcolor = options.Contentbackcolor;
        var hovercolor = options.Contenthovercolor;
        var fixedColumnbackcolor = options.fixedColumnbackcolor;
        var fixedColumnhovercolor = options.fixedColumnhovercolor;

        // row height
        $("#" + Id + " ." + options.classColumn + " .fixedTable table tbody tr").each(function (i) {
            var maxh = 0;
            var fixedh = $(this).height();
            var contenth = $("#" + Id + " .fixedContainer .fixedTable table tbody tr").eq(i).height();
            if (contenth > fixedh) {
                maxh = contenth;
            }
            else {
                maxh = fixedh;
            }
            //$(this).height(contenth);
            $(this).children("td").height(maxh);
            $("#" + Id + " .fixedContainer .fixedTable table tbody tr").eq(i).children("td").height(maxh);
        });

        //adjust the cell widths so the header/footer and table cells line up
        var htbale = $("#" + Id + " .fixedContainer ." + options.classHeader + " table");
        var ttable = $("#" + Id + " .fixedContainer .fixedTable table");
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
        $("#" + Id + " .fixedContainer ." + options.classFooter + " table").width(totall + 100);
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

            $("#" + Id + " .fixedContainer ." + options.classFooter + " table tr td").each(function (j) {
                if (j % ccount == i) {
                    $(this).attr("width", widthArray[i] + "px");
                }
            });
        }

        var contenttbH = $("#" + Id + " .fixedContainer .fixedTable table").height();
        if (contenttbH < maintbheight) {
            $("#" + Id + " ." + options.classColumn + " .fixedTable").height(contenttbH + 20);
            $("#" + Id + " .fixedContainer .fixedTable").height(contenttbH + 20);

            $("#" + Id + " .fixedContainer ." + options.classHeader).width($("#" + Id + " .fixedContainer ." + options.classHeader).width() + 16);
            $("#" + Id + " .fixedContainer ." + options.classFooter).width($("#" + Id + " .fixedContainer ." + options.classHeader).width());
        }
        else {
            //offset the footer by the height of the scrollbar so that it lines up right.
            $("#" + Id + " ." + options.classColumn + " > ." + options.classFooter).css({
                "position":"relative",
                "top":16
            });
        }
    }
};


function FixedGridCtrl($scope) {
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
        window.setTimeout(setItUp, 500);
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