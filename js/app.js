var myAppDev = angular.module('mainModule', ['ui.router']);
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
        controller:  'company.mainController'
    })
    .state('companyDetail', {
        url: '/companyDetail/:isEdit/:editId',
        templateUrl: 'modules/company/subModule/add',
        controller:  'company.addController'
    })
    .state('owner', {
        url: '/owner',
        templateUrl: 'modules/owner',
        controller:  'owner.mainController'
    })
    .state('ownerDetail', {
        url: '/ownerDetail/:isEdit/:editId',
        templateUrl: 'modules/owner/subModule/add',
        controller:  'owner.addController'
    })
  $urlRouterProvider.otherwise('/home');

});

myAppDev.controller('dashboardCtrl', ['$rootScope', '$scope', function($rootScope, $scope){
    $rootScope.activeMenu = 'dashboard';
}]);

myAppDev.factory('alertService', function($rootScope) {
    var alertService = {};

    alertService.add = function(type, msg) {
        var icons = {'success':'check', 'danger':'times-circle-o'};
        $rootScope.alerts.push({'type': type, 'msg': msg, 'icon':icons[type]});
    };

    alertService.clear = function(){
        $rootScope.alerts = [];
    }            

    return alertService;
});

myAppDev.factory('modalService', function($rootScope, $q) {
    var modalService = {}, defer,
    buttons = {'delete':'danger'};

    modalService.show = function(obj) {
        defer = $q.defer();
        $rootScope.modalInitiated = true;
        $rootScope.ftModal = obj;
        $rootScope.ftModal.button = buttons[obj.action];
        $rootScope.ftModal.show = true;
        return defer.promise;
    };

    $rootScope.$watch('ftModal.show', function(newVal){
        if(defer && newVal === false){
            defer.resolve($rootScope.ftModal);
        }        
    });

    return modalService;
});


myAppDev.directive("ftModal", function () {
    function link(scope, element, attrs) {
        scope.close = function(val){
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

myAppDev.directive("ftAlert", function () {
    function link(scope, element, attrs) {

    }
    return {
        restrict: "E",
        replace: true,
        link: link,
        templateUrl: 'partials/alert.html'
    };

});

myAppDev.controller("appController", function($rootScope){
     // create an array of alerts available globally
    $rootScope.alerts = [];
    $rootScope.ftModal = {};

    $rootScope.closeAlert = function(index) {
        $rootScope.alerts.splice(index, 1);
    };
});

myAppDev.filter('titleCase', function() {
    return function(input) {
      input = input || '';
      return input.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
    };
})