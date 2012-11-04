function Eg2Ctrl($scope) {
    $scope.eg2 = {
        options:[
            {label:"Option 1"},
            {label:"Option 2"},
            {label:"Option 3"}
        ],
        input:null,
        output:null
    }
}

function Eg3Ctrl($scope) {
    $scope.eg3 = {
        texts:[
            {from:"initial text 1", to:"done!"},
            {from:"initial text 2", to:"changed!"},
            {from:"initial text 3", to:"updated!"}
        ]
    }
}

function Eg4Ctrl($scope) {
    $scope.eg4 = {
        rows:[
            {
                field1:"a 1",
                field2:"a 2"
            },
            {
                field1:"b 1",
                field2:"b 2"
            },
            {
                field1:"c 1",
                field2:"c 2"
            }
        ]
    }
    $scope.concatenate = function(row) {
        row.concat = row.field1 + " " + row.field2;
    }

}