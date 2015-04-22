angular.module('mainModule')
.controller('vendor.mainController', ['$rootScope', '$scope', 'modalService', 'vendor.updateService', function($rootScope, $scope, modalService, updateService){
	function updateList(data){
		$scope.vendorList = data;
	}	
	function init(){
		$scope.vendorList = [];
		updateService.get('all').then(updateList);
	}

	function deleteRecord(id){
		updateService.delete({id:id}).then(init);
	}

	$scope.confirmDelete = function(id){
		var promise = modalService.show({type:'confirm', action:'delete', heading:'Are you sure want to delete ?', message:'Record will be deleted from Database'});
		promise.then(function(data){
			if(data.confirmed){
				deleteRecord(id);
			}
		});
	};
	init();
	$rootScope.activeMenu="vendor";
}])
.factory('vendor.updateService', ['$http', '$q', '$state', 'alertService', function($http, $q, $state, alertService){
	var deferred;
	return {
		get: function(editId){
			deferred = $q.defer();
			$http.get('api/vendor/getDetails.php?id='+editId).success(function(data){
				deferred.resolve(data);
			})
			return deferred.promise;
		},
		add: function(data){
			deferred = $q.defer();
			$http.post('api/vendor/addDetails.php', data).success(function(data){
				alertService.add("success", "Record added Successfully..");				
				$state.go('vendor');
				deferred.resolve('');
			}).error(function(){
				alertService.add("danger", "Record not added, please try again later");
				deferred.reject('');
			});
			return deferred.promise;
		},
		delete: function(data){
			deferred = $q.defer();
			$http.post('api/vendor/deleteRecord.php', data).success(function(data){
				alertService.add("success", "Record deleted Successfully..");
				deferred.resolve('');
			}).error(function(){
				alertService.add("danger", "Record not deleted, please try again later");
				deferred.reject('');
			});
			return deferred.promise;
		}
	}
}]);