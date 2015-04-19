angular.module('mainModule').controller('company.addController', ['$scope', '$stateParams', 'company.updateService' , function($scope, $stateParams, updateService){
	// get the id
    $scope.isEdit = $stateParams.isEdit;
    // get the location
    $scope.location = $stateParams.editId;
    $scope.model = {
    					companyName:'',
    					ssiNo:'',
    					panNumber:'',
    					address:'',
    					ownerList:'',
    					typeOfCompany:''
    			   };

    if($scope.isEdit === 'update'){
    	updateService.getCompany().then(function(data){
    		$scope.model = data;
    	})
    	
    }

}]);

angular.module('mainModule').factory('company.updateService', ['$http', '$q' , function($http, $q){
	var deferred = $q.defer();
	return {
		getCompany: function(){
			$http.get('/company/get').success(function(data){
				deferred.resolve(data);
			})
			return deferred.promise
		}
	}
}]);