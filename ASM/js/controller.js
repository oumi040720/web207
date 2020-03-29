var app = angular.module("myapp", ["ngRoute"]);

app.config(function ($routeProvider) {
    $routeProvider
        .when("/home", {
            templateUrl: "views/home.html"
        })
        .when("/login", {
            templateUrl: "views/account/login.html"
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

app.controller("myctrl", function ($scope) {
})
