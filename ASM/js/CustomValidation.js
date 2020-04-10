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

// app.directive('dateFormat', function () {
//     return {
//         require: 'ngModel',
//         link: function (scope, element, attr, mCtrl) {
//             function myValidation(value) {
//                 var patt = value.split("-")
//                 if (patt.length == 3) {
//                     mCtrl.$setValidity('charE', false);
//                 } else {
//                     mCtrl.$setValidity('charE', true);
//                 }
//                 return value;
//             }
//             mCtrl.$parsers.push(myValidation);
//         }
//     };
// });