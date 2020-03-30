app.controller("loginCtrl", function ($rootScope, $scope, $http, $location) {
    $http.get("db/Students.js").then(function (response) {
        $scope.students = response.data;

        $scope.checkLogin = function () {
            var username = $scope.username;
            var password = $scope.password;
            var flag = false;

            for (let i = 0; i < $scope.students.length; i++) {
                if (username === $scope.students[i].username && password === $scope.students[i].password) {
                    $rootScope.loggedIn = true;
                    $rootScope.USER = $scope.students[i];
                    flag = true;
                    break;
                }
            }

            if (flag) {
                $location.path("/home");
            } else {
                $scope.resultLogin = "Tài khoản hoặc mật khẩu không chính xác!"
            }
        }
    });
})
