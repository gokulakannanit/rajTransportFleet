angular.module('mainModule').controller('vehicleInfo.addController', ['$rootScope', '$scope', '$state', '$stateParams' , function($rootScope, $scope, $state, $stateParams){
	// get the id
    $rootScope.activeMenu="vehicle";
    $scope.isEdit = $stateParams.isEdit;
    $state.go('vehicleDetail.basic');
    
    $scope.links = [{view:'vehicleDetail.basic', label:'Basic'},{view:'vehicleDetail.maintain', label:'Maintain'}];
    $scope.selectTab = function(index){
        $scope.selectedTab = index;
    }
    $scope.selectedTab = 0;
}]);
