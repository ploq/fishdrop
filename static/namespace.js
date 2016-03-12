var accessApp = angular.module("nsApp",[],function($locationProvider){
    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });
});

accessApp.controller("nsController", function($scope, $http, $location) {
    $scope.access = {};
    $scope.access.ns = $location.path().split("/")[-1];
    $scope.wrong_pw = false;
    var path = $location.path().split("/");
    $scope.access.ns = path[path.length-1];

    $scope.submitAccessForm = function() {
        $http({
            method  : 'POST',
            url     : 'http://fishdrop.xyz/api/access',
            data    : $scope.access,
            headers : {'Content-Type': 'application/json'}
        }).success(function(data) {
            $scope.links = data;
            $scope.nsinput = true;
        });
    }
});