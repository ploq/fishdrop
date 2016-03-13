var addApp = angular.module("addApp",[],function($locationProvider){
    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });
});

addApp.controller("addController", function($scope, $http, $location) {
    $scope.access = {};
    $scope.wrong_pw = false;

    $scope.submitAccessForm = function() {
        var path = $location.path().split("/");
        $scope.access.ns = path[path.length-2];
        $scope.access.pw = path[path.length-1];
        $scope.access.links = $scope.access.links.split("\n");
        $http({
            method  : 'POST',
            url     : 'http://fishdrop.xyz/api/add',
            data    : $scope.access,
            headers : {'Content-Type': 'application/json'}
        }).success(function(data) {
            window.location.replace("http://fishdrop.xyz")
        });
    }
});