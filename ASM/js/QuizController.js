app.controller("quizCtrl", function ($scope, $http, $routeParams) {
    var id = $routeParams.Id;
    var url = "db/Quizs/" + id + ".js";
    $http.get(url).then(function (response) {
        $scope.questions = response.data;
        console.log($scope.questions);

    })
})
