app.controller("registerCtrl", function ($scope, $firebase, $location) {
    $scope.register = function () {
        var username = $scope.username;
        var password = $scope.password;
        var fullname = $scope.fullname;
        var email = $scope.email;
        var gender = $scope.gender;
        var birthday = $scope.birthday;

        var data = {
            "username": username,
            "password": password,
            "fullname": fullname,
            "email": email,
            "gender": gender,
            "birthday": birthday
        }

        var ref = new Firebase("https://web207-asm-ps10180.firebaseio.com/");
        var sync = $firebase(ref);
        sync.$asArray().$add(data);

        $scope.message = "Đăng ký thành công!"
        $location.path("/register");
    }

})