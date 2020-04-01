app.controller("registerCtrl", function ($scope, $http, $location) {

    $scope.register = function () {
        var username = $scope.username;
        var password = $scope.password;
        var fullname = $scope.fullname;
        var email = $scope.email;
        var gender = $scope.gender;
        var birthday = $scope.birthday;
        var schoolfee = 0;
        var marks = 0;

        $scope.data = {
            "username": username,
            "password": password,
            "fullname": fullname,
            "email": email,
            "gender": gender,
            "birthday": birthday,
            "schoolfee": schoolfee,
            "marks": marks
        }
        console.log($scope.data)
    }
})