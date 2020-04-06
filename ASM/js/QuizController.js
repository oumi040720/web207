app.controller("quizCtrl", function ($rootScope, $scope, $http, $routeParams, $location) {
    var id = $routeParams.Id;
    var url = "db/Quizs/" + id + ".js";
    $http.get(url).then(function (response) {
        $scope.questions = response.data;

        $scope.mark = 0;
        $scope.flag = 0;

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

        $scope.onSelect = function (quiz, option) {
            $scope.flag += 1;
            for (let i = 0; i < $scope.quizs.length; i++) {
                if ($scope.quizs[i].Id == quiz.Id) {
                    $scope.quizs[i].yourAnswer = option.Id;
                    break;
                }
            }
        }

        $scope.isDoneAnswer = function () {
            if ($scope.flag >= $scope.quizs.length) {
                return false;
            }
            return true;
        }

        $scope.submit = function () {
            for (let i = 0; i < $scope.quizs.length; i++) {
                if ($scope.quizs[i].yourAnswer == $scope.quizs[i].AnswerID) {
                    $scope.mark += 1;
                }
            }

            var result = {
                "ResultID": $rootScope.yourResults.length + 1,
                "quizs": $scope.quizs,
                "mark": $scope.mark
            }

            $rootScope.yourResults.push(result);
            $location.path("/result");

            console.log($rootScope.yourResults);
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
