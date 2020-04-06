app.controller("resultCtrl", function ($rootScope, $scope) {
    $scope.results = $rootScope.yourResults;
    console.log($scope.results);

})