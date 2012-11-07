var app = angular.module("grid-spike", ["ui"]);

app.filter("paginate", function () {
    return function (rows, page, pageSize) {
        return rows.slice((page - 1) * pageSize, page * pageSize);
    }
});

app.directive("braxisGrid", function () {
    return {
        priority:0,
        templateUrl:'partials/grid-widget.html',
        replace:true,
        transclude:false,
        restrict:'EA',
        controller:GridCtrl,
        scope:{
            "data":"=gridData"
        }
    };
});

function GridCtrl($scope) {
    $scope.totalPages = function () {
        return Math.ceil($scope.data.body.rows.length / $scope.pageSize);
    };
    $scope.previousPage = function () {
        if ($scope.page > 1) {
            $scope.page--;
        }
    };
    $scope.nextPage = function () {
        if (Math.floor(($scope.page) * $scope.pageSize) < $scope.data.body.rows.length) {
            $scope.page++;
        }
    };
    $scope.changePage = function (page) {
        $scope.page = page;
    };
    $scope.pages = function () {
        return _.range(1, $scope.totalPages() + 1);
    }

}

