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

app.directive('existed', function ($firebase) {
    return {
        require: 'ngModel',
        link: function (scope, element, attr, mCtrl) {
            function myValidation(value) {
                var ref = new Firebase("https://web207-asm-ps10180.firebaseio.com/");
                var sync = $firebase(ref);
                scope.students = sync.$asArray();

                scope.students.$loaded().then(function () {
                    var flag = true;

                    if (value.length > 0) {
                        for (let i = 0; i < scope.students.length; i++) {
                            if (value == scope.students[i].username) {
                                flag = false;
                                break;
                            }
                        }
                    }

                    mCtrl.$setValidity('charE', flag);
                });
                return value;
            }
            mCtrl.$parsers.push(myValidation);
        }
    };
});

app.directive('dateFormat', function () {
    return {
        require: 'ngModel',
        link: function (scope, element, attr, mCtrl) {
            function myValidation(value) {
                var flag = true;

                var birthday = value.split("-")
                if (birthday.length == 3) {
                    if (Number.isInteger(birthday[0]) || Number.isInteger(birthday[1]) || Number.isInteger(birthday[2])) {
                        flag = false;
                    } else {
                        if (birthday[0] > 31 || birthday[1] > 12) {
                            flag = false;
                        } else {
                            if (birthday[1] == 4 || birthday[1] == 6 || birthday[1] == 9 || birthday[1] == 11) {
                                if (birthday[0] > 30) {
                                    flag = false;
                                }
                            }
                            if (birthday[0] > 29 && birthday[1] == 2) {
                                flag = false;
                            } else if (birthday[0] == 29 && birthday[1] == 2) {
                                if (birthday[2] % 4 == 0) {
                                    if (birthday[2] % 100 == 0) {
                                        if (birthday[2] % 400 == 0) {
                                            flag = true;
                                        } else {
                                            flag = false;
                                        }
                                    } else {
                                        flag = false;
                                    }
                                } else {
                                    flag = false;
                                }
                            }
                        }
                    }
                }

                mCtrl.$setValidity('charE', flag);

                return value;
            }
            mCtrl.$parsers.push(myValidation);
        }
    };
});