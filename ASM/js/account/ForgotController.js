app.controller("forgotCtrl", function ($scope, $firebase) {
    var ref = new Firebase("https://web207-asm-ps10180.firebaseio.com/");
    var sync = $firebase(ref);
    $scope.students = sync.$asArray();
    $scope.message = ""
    $scope.alert = ""

    $scope.students.$loaded().then(function () {
        $scope.getPassword = function () {
            var username = $scope.username;
            var email = $scope.email;

            for (let i = 0; i < $scope.students.length; i++) {
                if (username == $scope.students[i].username && email == $scope.students[i].email) {
                    $scope.message = "Mật khẩu của bạn là: " + $scope.students[i].password;
                    $scope.alert = "success"
                    break;
                } else if (username != $scope.students[i].username || email != $scope.students[i].email) {
                    $scope.message = "Tên tài khoản hoặc Email không chính xác!";
                    $scope.alert = "danger";
                }
            }
        }
    })
});
