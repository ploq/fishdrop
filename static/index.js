var accessApp = angular.module("accessApp", []);
accessApp.controller("accessFormController", function($scope, $http) {
    $scope.access = {};
    $scope.wrong_pw = false;
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