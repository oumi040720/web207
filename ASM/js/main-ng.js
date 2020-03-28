var app = angular.module("myapp", []);

app.controller("myctrl", function ($scope) {
});

app.controller("loginCtrl", function ($scope, $http) {
    $scope.students = [];
    $http.get("db/Students.js").then(function (response) {
        $scope.students = response.data;

        $scope.checkLogin = function () {
            $scope.check = false;

            for (let i = 0; i < $scope.students.length; i++) {
                if ($scope.username === $scope.students[i].username && $scope.password === $scope.students[i].password) {
                    $scope.check = true;
                    break;
                }
            }
            alert($scope.check)
        }
    });
});

app.controller("registerCtrl", function ($scope) {
});

app.controller("changeCtrl", function ($scope) {
});

app.controller("changeCtrl", function ($scope) {
});

app.controller("updateCtrl", function ($scope) {
});