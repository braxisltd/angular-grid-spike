'use strict';

describe('GridCtrl', function () {

    var scope, ctrl;

    beforeEach(inject(function ($rootScope, $controller) {
        scope = $rootScope.$new();
        scope.data = {
            "body":{
                "rows":[0, 1, 2, 3, 4, 5, 6, 7, 8]
            }
        };
        ctrl = $controller(GridCtrl, {$scope:scope});
    }));

    describe("Incrementing the page", function () {
        it('should increment page even if the next page is not full.', function () {
            scope.pageSize = 7;
            scope.page = 1;
            scope.nextPage();
            expect(scope.page).toEqual(2);
        });

        it('should not increment page if current page is last and incomplete', function () {
            scope.pageSize = 7;
            scope.page = 2;
            scope.nextPage();
            expect(scope.page).toEqual(2);
        });

        it('should not increment page if current page is last and incomplete', function () {
            scope.pageSize = 3;
            scope.page = 3;
            scope.nextPage();
            expect(scope.page).toEqual(3);
        });
    });

    describe("Deccrementing the page", function () {
        it('should decrement page even if the next page is not full.', function () {
            scope.page = 2;
            scope.previousPage();
            expect(scope.page).toEqual(1);
        });

        it('should not decrement page if current page is the first', function () {
            scope.page = 1;
            scope.previousPage();
            expect(scope.page).toEqual(1);
        });

    });

    it ('should calculate the total pages', function() {
       scope.pageSize = 7;
        expect(scope.totalPages()).toEqual(2);
    });

});
