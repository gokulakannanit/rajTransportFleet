angular.module('mainModule').controller('vendor.addController', ['$rootScope', '$scope', '$stateParams', 'vendor.updateService' , function($rootScope, $scope, $stateParams, updateService){
	// get the id

    $rootScope.activeMenu="vendor";

    $scope.isEdit = $stateParams.isEdit;
   	
   	function init(){
   		 $scope.model = {
				companyName:'',
        typeOfGoods:'',
				contactPerson:'',
				phone:'',			
        address:'',	
        email:''
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
    	$scope.vendorForm.$setPristine()
    } 


    init();

}]);
