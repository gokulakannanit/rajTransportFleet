var myAppDev = angular.module('mainModule', ['ui.router', 'ngTagsInput', 'ngAnimate']);
myAppDev.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('home', {
            url: '/home',
            templateUrl: 'modules/dashboard',
            controrller: 'dashboardCtrl'
        })
        .state('company', {
            url: '/company',
            templateUrl: 'modules/company',
            controller: 'company.mainController'
        })
        .state('companyDetail', {
            url: '/companyDetail/:isEdit/:editId',
            templateUrl: 'modules/company/subModule/add',
            controller: 'company.addController'
        })
        .state('owner', {
            url: '/owner',
            templateUrl: 'modules/owner',
            controller: 'owner.mainController'
        })
        .state('ownerDetail', {
            url: '/ownerDetail/:isEdit/:editId',
            templateUrl: 'modules/owner/subModule/add',
            controller: 'owner.addController'
        })
        .state('client', {
            url: '/client',
            templateUrl: 'modules/client',
            controller: 'client.mainController'
        })
        .state('clientDetail', {
            url: '/clientDetail/:isEdit/:editId',
            templateUrl: 'modules/client/subModule/add',
            controller: 'client.addController'
        })
        .state('vendor', {
            url: '/vendor',
            templateUrl: 'modules/vendor',
            controller: 'vendor.mainController'
        })
        .state('vendorDetail', {
            url: '/vendorDetail/:isEdit/:editId',
            templateUrl: 'modules/vendor/subModule/add',
            controller: 'vendor.addController'
        })
        .state('vehicle', {
            url: '/vehicleInfo',
            templateUrl: 'modules/vehicleInfo',
            controller: 'vehicleInfo.mainController'
        })
        .state('vehicleDetail', {
            url: '/vehicleDetail/:isEdit/:editId',
            templateUrl: 'modules/vehicleInfo/subModule/add',
            controller: 'vehicleInfo.addController'
        })
        .state('vehicleDetail.basic', {
            views: {
                url: '/basic',
                "container": {
                    templateUrl: "modules/vehicleInfo/subModule/add/basic"
                }
            }
        })
        .state('vehicleDetail.maintain', {
            views: {
                url: '/maintain',
                "container": {
                    templateUrl: "modules/vehicleInfo/subModule/add/basic"
                }
            }
        })
    $urlRouterProvider.otherwise('/home');

});

myAppDev.controller('dashboardCtrl', ['$rootScope', '$scope',
    function($rootScope, $scope) {
        $rootScope.activeMenu = 'dashboard';
    }
]);

myAppDev.factory('alertService', function($rootScope, $timeout) {
    var alertService = {};

    function addAnimation() {
        $timeout(function() {
            angular.forEach($rootScope.alerts, function(item) {
                item.percent = 0;
            });
        }, 500);
        $timeout(function() {
            angular.forEach($rootScope.alerts, function(item, index) {
                item.animation = 'flipOutY';
            });
        }, 3500);
        $timeout(function() {
            angular.forEach($rootScope.alerts, function(item, index) {
                alertService.close(index);
            });
        }, 4000);
    }

    alertService.add = function(type, msg) {
        var icons = {
            'success': 'check',
            'danger': 'times-circle-o'
        };
        $rootScope.alerts.push({
            'type': type,
            'msg': msg,
            'icon': icons[type],
            percent: 100
        });
        addAnimation();
    };

    alertService.clear = function() {
        $rootScope.alerts = [];
    }

    alertService.close = function(index) {
        $rootScope.alerts.splice(Number(index), 1);
    }

    return alertService;
});

myAppDev.factory('modalService', function($rootScope, $q, $timeout) {
    var modalService = {},
        defer,
        buttons = {
            'delete': 'danger'
        };

    modalService.show = function(obj) {
        defer = $q.defer();
        $rootScope.modalInitiated = true;
        $rootScope.ftModal = obj;
        $rootScope.ftModal.button = buttons[obj.action];
        $rootScope.ftModal.show = true;
        return defer.promise;
    };

    $rootScope.$watch('ftModal.show', function(newVal) {
        if (defer && newVal === false) {
            defer.resolve($rootScope.ftModal);
        }
    });

    return modalService;
});

myAppDev.directive("ftPanel", function() {
    return {
        restrict: "E",
        transclude: true,
        templateUrl: 'partials/panel.html'
    };
});

myAppDev.directive("ftModal", function() {
    function link(scope, element, attrs) {
        scope.close = function(val) {
            scope.ftModal.confirmed = val;
            scope.ftModal.show = false;
        }
    }
    return {
        restrict: "AE",
        replace: true,
        link: link,
        templateUrl: 'partials/modal.html'
    };

});

myAppDev.directive("ftAlert", function($timeout, alertService) {
    function link(scope, element, attrs) {
        var selectedAlert;
        scope.close = function(val) {
            selectedAlert = val;
            $timeout(function() {
                alertService.close(selectedAlert);
            }, 500);
        }
    }
    return {
        restrict: "AE",
        replace: true,
        link: link,
        templateUrl: 'partials/alert.html'
    };

});

myAppDev.directive("ftTagInput", function() {

    function link(scope, elem, attr, ctrl) {
        scope.opts = attr;

        scope.form = ctrl;

        scope.onTagAdded = function() {
            ctrl.$setValidity('minlen', (scope.selectedTags.length >= scope.opts.minlen));
            ctrl.$setValidity('required', (scope.selectedTags.length >= 1));            
        }

        angular.element(elem).find("input").on("blur keydown", function () {            
            ctrl.$setTouched(true);
            ctrl.$setValidity('required', (scope.selectedTags.length >= 1));
        })

    }
    return {
        restrict: 'AE',
        require: 'ngModel',
        scope: {
            selectedTags: '=ngModel',
            source: '='
        },
        link: link,
        templateUrl: 'partials/tags.html'
    }
});

myAppDev.controller("appController", function($rootScope) {
    // create an array of alerts available globally
    $rootScope.alerts = [];
    $rootScope.ftModal = {};
});

myAppDev.filter('titleCase', function() {
    return function(input) {
        input = input || '';
        return input.replace(/\w\S*/g, function(txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        });
    };
})

myAppDev.directive("ftFormText", function($compile) {
    function link(scope, elem, attr, ctrl) {
        scope.opts = attr;
        if (!scope.opts.type) {
            scope.opts.type = "text";
        }
        scope.form = ctrl;

        $compile(elem.contents())(scope);

        if(scope.opts.type !== "select"){

            var input = $(elem).find("input");

            if (scope.opts.required) {
                input.attr('required', 'true');
            }

            ctrl.$validators.minlen = function(modelValue, viewValue) {
                if (scope.opts.minlen && viewValue !== '') {
                    return (viewValue.length >= scope.opts.minlen);
                }
                return true;
            }

            ctrl.$validators.maxlen = function(modelValue, viewValue) {
                if (scope.opts.maxlen && viewValue !== '') {
                    return (viewValue.length <= scope.opts.maxlen);
                }
                return true;
            }

            ctrl.$validators.pattern = function(modelValue, viewValue) {
                if (scope.opts.pattern && viewValue !== '') {
                    var pattern = new RegExp(scope.opts.pattern);
                    return (pattern).test(viewValue);
                }
                return true;
            }

            ctrl.$validators.email = function(modelValue, viewValue) {
                if (scope.opts.type === 'email' && viewValue !== '') {
                    var expr = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
                    return expr.test(viewValue);
                }
                return true;
            }

            input.on("blur keydown", function(e) {
                ctrl.$setTouched(true);
            });

        }else if(scope.opts.type === 'select'){
            var select = $(elem).find("select");

            if (scope.opts.required) {
                select.attr('required', 'true');
            }

            select.on("click change", function(){
                ctrl.$setTouched(true);
            })
        }
    }
    return {
        restrict: 'AE',
        require: 'ngModel',
        scope: {
            model: '=ngModel',
            source: '='
        },
        link: link,
        templateUrl: 'partials/formControl.html'
    }
});