angular.module('mainModule').controller('company.addController', ['$rootScope', '$scope', '$stateParams', 'company.updateService' , function($rootScope, $scope, $stateParams, updateService){
	// get the id

    $rootScope.activeMenu="company";

    $scope.isEdit = $stateParams.isEdit;
   	
   	function init(){
   		 $scope.model = {
				companyName:'',
				ssi:'',
                tan:'',
                serviceTax:'',
				pan:'',
				address:'',
				owner:'',
				email:'',
				phone:'',
				typeOfCompany:'S'
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
    	$scope.companyForm.$setPristine()
    }


    init();

}]);
