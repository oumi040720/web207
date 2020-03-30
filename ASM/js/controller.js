var app = angular.module("myapp", ["ngRoute"]);

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
        .when("/login", {
            templateUrl: "views/account/login.html",
            controller: "loginCtrl"
        })
        .when("/register", {
            templateUrl: "views/account/register.html"
        })
        .when("/forgot", {
            templateUrl: "views/account/forgot.html"
        })
        .when("/update", {
            templateUrl: "views/account/update.html"
        })
        .when("/change", {
            templateUrl: "views/account/change.html"
        })
        .otherwise({
            redirectTo: "/home"
        })
})

app.controller("myctrl", function ($rootScope, $scope, $location) {
    $scope.logout = function ($rootScope, $location) {
        $scope.loggedIn = false
        $scope.USER = {}
    }
})
