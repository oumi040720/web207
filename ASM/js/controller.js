var app = angular.module("myapp", ["ngRoute", 'firebase']);

app.config(function ($routeProvider) {
    $routeProvider
        .when("/home", {
            resolve: {
                "check": function ($rootScope, $location) {
                    if (!$rootScope.loggedIn) {
                        $rootScope.notLogin = "Bạn chưa đăng nhập!"
                        $location.path("/login");
                    }
                }
            },
            templateUrl: "views/home.html"
        })
        .when("/result", {
            resolve: {
                "check": function ($rootScope, $location) {
                    if (!$rootScope.loggedIn) {
                        $rootScope.notLogin = "Bạn chưa đăng nhập!"
                        $location.path("/login");
                    }
                }
            },
            templateUrl: "views/result.html",
            controller: "resultCtrl"
        })
        .when("/login", {
            templateUrl: "views/account/login.html",
            controller: "loginCtrl"
        })
        .when("/register", {
            templateUrl: "views/account/register.html",
            controller: "registerCtrl"
        })
        .when("/forgot", {
            templateUrl: "views/account/forgot.html",
            controller: "forgotCtrl"
        })
        .when("/update", {
            resolve: {
                "check": function ($rootScope, $location) {
                    if (!$rootScope.loggedIn) {
                        $rootScope.notLogin = "Bạn chưa đăng nhập!"
                        $location.path("/login");
                    }
                }
            },
            templateUrl: "views/account/update.html",
            controller: "updateCtrl"
        })
        .when("/change", {
            resolve: {
                "check": function ($rootScope, $location) {
                    if (!$rootScope.loggedIn) {
                        $rootScope.notLogin = "Bạn chưa đăng nhập!"
                        $location.path("/login");
                    }
                }
            },
            templateUrl: "views/account/change.html",
            controller: "changeCtrl"
        })
        .when("/quiz/:Id", {
            resolve: {
                "check": function ($rootScope, $location) {
                    if (!$rootScope.loggedIn) {
                        $rootScope.notLogin = "Bạn chưa đăng nhập!"
                        $location.path("/login");
                    }
                }
            },
            templateUrl: "views/quiz.html",
            controller: "quizCtrl"
        })
        .when("/about", {
            templateUrl: "views/about.html",
        })
        .when("/contact", {
            templateUrl: "views/contact.html",
        })
        .when("/feedback", {
            templateUrl: "views/feedback.html",
        })
        .when("/logout", {
            redirectTo: "/login"
        })
        .otherwise({
            redirectTo: "/home"
        })
})

app.controller("myctrl", function ($rootScope, $scope, $http, $location) {
    $scope.logout = function () {
        delete $rootScope.USER;
        $rootScope.loggedIn = false;
    }

    $http.get("db/Subjects.js").then(function (response) {
        $scope.subjects = response.data;

        $scope.begin = 0;
        $scope.page = Math.ceil($scope.subjects.length / 4);

        $scope.first = function () {
            $scope.begin = 0;
        }
        $scope.prev = function () {
            if ($scope.begin > 0) {
                $scope.begin -= 4;
            }
        }
        $scope.next = function () {
            if ($scope.begin < (($scope.page - 1) * 4)) {
                $scope.begin += 4;
            }
        }
        $scope.last = function () {
            $scope.begin = ($scope.page - 1) * 4;
        }
    })
})
