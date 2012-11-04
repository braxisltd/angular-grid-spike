var app = angular.module("grid-spike", ["ui"]);

function BaseCtrl($scope) {
    $scope.gridData = {
        "head":{
            "columns":[
                {"label":"Sortable and Filterable", "sortable":true, "filterable":true},
                {"label":"Sortable, NOT Filterable", "sortable":true, "filterable":false},
                {"label":"Filterable, NOT Sortable", "sortable":false, "filterable":true}
            ]
        },
        "body":{
            "rows":[
                {
                    "entity":"entity",
                    "cells":[
                        {"value":"row 1 column1", "field":"field1"},
                        {"value":"row 1 column2", "field":"field2"},
                        {"value":"row 1 column3", "field":"field3"}
                    ]
                },
                {
                    "entity":"entity",
                    "cells":[
                        {"value":"row 2 column1", "field":"field1"},
                        {"value":"row 2 column2", "field":"field2"},
                        {"value":"row 2 column3", "field":"field3"}
                    ]
                },
                {
                    "entity":"entity",
                    "cells":[
                        {"value":"row 3 column1", "field":"field1"},
                        {"value":"row 3 column2", "field":"field2"},
                        {"value":"row 3 column3", "field":"field3"}
                    ]
                },
                {
                    "entity":"entity",
                    "cells":[
                        {"value":"row 4 column1", "field":"field1"},
                        {"value":"row 4 column2", "field":"field2"},
                        {"value":"row 4 column3", "field":"field3"}
                    ]
                },
                {
                    "entity":"entity",
                    "cells":[
                        {"value":"row 5 column1", "field":"field1"},
                        {"value":"row 5 column2", "field":"field2"},
                        {"value":"row 5 column3", "field":"field3"}
                    ]
                },
                {
                    "entity":"entity",
                    "cells":[
                        {"value":"row 6 column1", "field":"field1"},
                        {"value":"row 6 column2", "field":"field2"},
                        {"value":"row 6 column3", "field":"field3"}
                    ]
                },
                {
                    "entity":"entity",
                    "cells":[
                        {"value":"row 7 column1", "field":"field1"},
                        {"value":"row 7 column2", "field":"field2"},
                        {"value":"row 7 column3", "field":"field3"}
                    ]
                },
                {
                    "entity":"entity",
                    "cells":[
                        {"value":"row 8 column1", "field":"field1"},
                        {"value":"row 8 column2", "field":"field2"},
                        {"value":"row 8 column3", "field":"field3"}
                    ]
                },
                {
                    "entity":"entity",
                    "cells":[
                        {"value":"row 9 column1", "field":"field1"},
                        {"value":"row 9 column2", "field":"field2"},
                        {"value":"row 9 column3", "field":"field3"}
                    ]
                }
            ]
        }
    }
}
