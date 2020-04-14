app.controller("changeCtrl", function ($rootScope, $scope, $firebase) {
    $scope.change = function () {
        var ref = new Firebase("https://web207-asm-ps10180.firebaseio.com/");
        var sync = $firebase(ref);
        $scope.students = sync.$asArray();
        $scope.students.$loaded().then(function () {
            for (let i = 0; i < $scope.students.length; i++) {
                if ($rootScope.USER.username == $scope.students[i].username && $scope.students[i].password == $scope.oldPassword) {
                    var data = {
                        "username": $rootScope.USER.username,
                        "password": $scope.password,
                        "fullname": $rootScope.USER.fullname,
                        "email": $rootScope.USER.email,
                        "gender": $rootScope.USER.gender,
                        "birthday": $rootScope.USER.birthday
                    }

                    sync.$update($scope.students[i].$id, data);
                    $scope.message = "Đổi mật khẩu thành công!"
                    $scope.alert = "success";
                    break;
                } else {
                    $scope.message = "Mật khẩu cũ không chính xác. Đổi mật khẩu thất bại!"
                    $scope.alert = "danger";
                }
            }
        });
    }
})