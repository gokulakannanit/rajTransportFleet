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

        $scope.dataList =   [{label:'Battery', value:'Battery'}, 
                            {label:'Electricals', value:'Electricals'}, 
                            {label:'Spare Parts', value:'Spare Parts'}, 
                            {label:'Tyre', value:'Tyre'}];
                            
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
