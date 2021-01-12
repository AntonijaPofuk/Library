vartestApp = angular
    .module("testModule", [])
    .controller("testController", function ($scope, $http) {
        $http.get('https://localhost:44347/api/Department').then(function (response) {
            $scope.departmens = response.data;
        });
    }); 