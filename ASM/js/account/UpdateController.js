app.controller("updateCtrl", function ($rootScope, $scope, $firebase) {
    $scope.fullname = $rootScope.USER.fullname;
    $scope.email = $rootScope.USER.email;
    $scope.gender = $rootScope.USER.gender;
    $scope.birthday = $rootScope.USER.birthday;

    $scope.update = function () {
        var fullname = $scope.fullname;
        var email = $scope.email;
        var gender = $scope.gender;
        var birthday = $scope.birthday;

        var ref = new Firebase("https://web207-asm-ps10180.firebaseio.com/");
        var sync = $firebase(ref);
        $scope.students = sync.$asArray();
        $scope.students.$loaded().then(function () {
            for (let i = 0; i < $scope.students.length; i++) {
                if ($rootScope.USER.username === $scope.students[i].username) {
                    var data = {
                        "username": $rootScope.USER.username,
                        "password": $rootScope.USER.password,
                        "fullname": fullname,
                        "email": email,
                        "gender": gender,
                        "birthday": birthday
                    }

                    sync.$update($scope.students[i].$id, data);
                    $scope.message = "Cập nhật thành công!"
                    $scope.alert = "success";

                    $scope.fullname = fullname;
                    $scope.email = email;
                    $scope.gender = gender;
                    $scope.birthday = birthday;

                    $rootScope.USER.fullname = fullname;
                    $rootScope.USER.email = email;
                    $rootScope.USER.gender = gender
                    $rootScope.USER.birthday = birthday;
                    break;
                } else {
                    $scope.message = "Cập nhật thất bại!"
                    $scope.alert = "danger";
                }
            }
        });
    }
})