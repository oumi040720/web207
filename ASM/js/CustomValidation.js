app.directive('confirm', function () {
    return {
        require: 'ngModel',
        link: function (scope, element, attr, mCtrl) {
            function myValidation(value) {
                if (value === scope.password) {
                    mCtrl.$setValidity('charE', true);
                } else {
                    mCtrl.$setValidity('charE', false);
                }
                return value;
            }
            mCtrl.$parsers.push(myValidation);
        }
    };
});

app.directive('existed', function ($http) {
    return {
        require: 'ngModel',
        link: function (scope, element, attr, mCtrl) {
            function myValidation(value) {
                $http.get("db/Students.js").then(function (response) {
                    scope.students = response.data;
                    var flag = true;

                    if (value.length > 0) {
                        for (let i = 0; i < scope.students.length; i++) {
                            if (value === scope.students[i].username) {
                                flag = false;
                                break;
                            }
                        }
                    }

                    mCtrl.$setValidity('charE', flag);
                })
                return value;
            }
            mCtrl.$parsers.push(myValidation);
        }
    };
});