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
    };

    $scope.addLinks = function() {
        if(typeof $scope.access.ns === "undefined" || typeof $scope.access.pw === "undefined") {
            return false;
        }
        window.location.replace('http://fishdrop.xyz/add/' + $scope.access.ns + "/" + $scope.access.pw)
    }
});