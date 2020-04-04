app.controller("quizCtrl", function ($scope, $http, $routeParams) {
    var id = $routeParams.Id;
    var url = "db/Quizs/" + id + ".js";
    $http.get(url).then(function (response) {
        $scope.questions = response.data;

        $scope.begin = 0;
        $scope.page = 10;

        var arrNo = [];
        for (let i = 0; i < 10; i++) {
            arrNo.push(parseInt(Math.floor(Math.random() * $scope.questions.length) + 1));
        }

        $scope.quizs = [];

        for (let i = 0; i < $scope.questions.length; i++) {
            for (let j = 0; j < arrNo.length; j++) {
                if (i == arrNo[j]) {
                    var quiz = {
                        "No": $scope.quizs.length + 1,
                        "Id": $scope.questions[i].Id,
                        "Text": $scope.questions[i].Text,
                        "Answers": $scope.questions[i].Answers,
                        "AnswerID": $scope.questions[i].AnswerId,
                        "yourAnswer": "",
                    };
                    $scope.quizs.push(quiz);
                }
            }
        }
        console.log($scope.quizs);

        $scope.clickAnswer = function () {

        }

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
