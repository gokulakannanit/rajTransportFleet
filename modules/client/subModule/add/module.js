angular.module('mainModule').controller('client.addController', ['$rootScope', '$scope', '$stateParams', 'client.updateService' , function($rootScope, $scope, $stateParams, updateService){
	// get the id

    $rootScope.activeMenu="client";

    $scope.isEdit = $stateParams.isEdit;
   	
   	function init(){
   		 $scope.model = {
				companyName:'',
				address:'',
				contactPerson:'',
				email:'',
				phone:''				
		   };
   	}

    if($scope.isEdit === 'update'){
    	updateService.get($stateParams.editId).then(function(data){
    		$scope.model = data[0];
    	});    	
    }
    $scope.updateDetails = function(){
    	updateService.add($scope.model);
    }

    $scope.reset = function(){
    	init();
    	$scope.clientForm.$setPristine();
    }

    init();

}]);
