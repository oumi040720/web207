app.controller("quizCtrl", function ($rootScope, $scope, $http, $routeParams, $location, $timeout) {
    var id = $routeParams.Id;
    var url = "db/Quizs/" + id + ".js";

    // quiz
    $http.get(url).then(function (response) {
        $scope.questions = response.data;

        $scope.mark = 0;
        $scope.flag = 0;

        var arrNo = [];

        while (arrNo.length < 10) {
            var r = Math.floor(Math.random() * $scope.questions.length) + 1;
            if (arrNo.indexOf(r) === -1) {
                arrNo.push(r);
            }
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
        $scope.begin = 0;
        $scope.page = $scope.quizs.length;

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
            if ($scope.flag >= $scope.quizs.length && $scope.begin == $scope.quizs.length - 1) {
                return true
            }
            return false
        }

        $scope.submit = function () {
            for (let i = 0; i < $scope.quizs.length; i++) {
                if ($scope.quizs[i].yourAnswer == $scope.quizs[i].AnswerID) {
                    $scope.mark += 1;
                }
            }

            var result = {
                "ResultID": $rootScope.yourResults.length + 1,
                "SubjectID": id,
                "quizs": $scope.quizs,
                "mark": $scope.mark + " / " + $scope.quizs.length,
                "time": $scope.time
            }

            $rootScope.yourResults.push(result);
            $location.path("/result");
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

    // time
    $scope.ss = 0;
    $scope.time = "00 : 00";
    $scope.onTimeout = function () {
        $scope.ss++;
        if ($scope.ss < 10) {
            $scope.time = "00 : 0" + $scope.ss
        } else if ($scope.ss < 60) {
            $scope.time = "00 : " + $scope.ss
        } else {
            if ($scope.ss % 60 == 0) {
                $scope.time = ($scope.ss / 60) + " : 00"
            } else {
                var m = parseInt($scope.ss / 60);
                var s = $scope.ss % 60;
                if (m < 10) {
                    if (s < 10) {
                        $scope.time = "0" + m + " : 0" + s
                    } else if (s < 60) {
                        $scope.time = "0" + m + " : " + s
                    }
                } else {
                    if (s < 10) {
                        $scope.time = m + " : 0" + s
                    } else if (s < 60) {
                        $scope.time = m + " : " + s
                    }
                }

            }
        }
        mytimeout = $timeout($scope.onTimeout, 1000);
    }
    $timeout($scope.onTimeout, 1000);
})
