app.controller("quizCtrl", function ($scope, $http, $routeParams) {
    var id = $routeParams.Id;
    var url = "db/Quizs/" + id + ".js";
    $http.get(url).then(function (response) {
        $scope.questions = response.data;

        $scope.begin = 0;
        $scope.page = $scope.questions.length;

        $scope.first = function () {
            $scope.begin = 0;
        }
        $scope.prev = function () {
            if ($scope.begin > 0) {
                $scope.begin -= 1;
            }
        }
        $scope.next = function () {
            if ($scope.begin < ($scope.page - 1)) {
                $scope.begin += 1;
            }
        }
        $scope.last = function () {
            $scope.begin = ($scope.page - 1);
        }
    })
})
