app.controller("loginCtrl", function ($rootScope, $scope, $firebase, $location) {
    var ref = new Firebase("https://web207-asm-ps10180.firebaseio.com/");
    var sync = $firebase(ref);
    $scope.students = sync.$asArray();

    $scope.students.$loaded().then(function () {
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
                $rootScope.yourResults = [];
            } else {
                $scope.resultLogin = "Tài khoản hoặc mật khẩu không chính xác!"
            }
        }
    });
})
