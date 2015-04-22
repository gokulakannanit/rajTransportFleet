angular.module('mainModule').controller('owner.addController', ['$rootScope', '$scope', '$stateParams', 'owner.updateService' , function($rootScope, $scope, $stateParams, updateService){
	// get the id

    $rootScope.activeMenu="owner";

    $scope.isEdit = $stateParams.isEdit;
   	
   	function init(){
   		 $scope.model = {
				name:'',
                phone:'',
				address:'',
				email:'',
				pan:''
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
    	$scope.ownerForm.$setPristine()
    }


    init();

}]);
