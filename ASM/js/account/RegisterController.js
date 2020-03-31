app.controller("loginCtrl", function ($scope, $http, $location) {
    var username = $scope.username;
    var password = $scope.password;
    var fullname = $scope.fullname;
    var email = $scope.email;
    var gender = $scope.gender;
    var birthday = $scope.birthday;
    var schoolfee = 0;
    var marks = 0;

    $scope.register = function () {
        var data = {
            "username": username,
            "password": password,
            "fullname": fullname,
            "email": email,
            "gender": gender,
            "birthday": birthday,
            "schoolfee": schoolfee,
            "marks": marks
        }
        console.log(data)
        $http.post("/db/Students.js", JSON.stringify(data)).then(function (response) {
            if (response.data) {
                $scope.msg = "Post Data Submitted Successfully!";
            }
        }, function (response) {
            $scope.msg = "Service not Exists";
            $scope.statusval = response.status;
            $scope.statustext = response.statusText;
            $scope.headers = response.headers();
        });
    }
})
