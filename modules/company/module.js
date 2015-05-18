angular.module('mainModule')
.controller('company.mainController', ['$rootScope', '$scope', 'modalService', 'company.updateService', 'owner.updateService', 
	function($rootScope, $scope, modalService, updateService, ownerService){
	function updateList(data){
		$scope.companyList = data;
	}	

	function init(){
		$scope.companyList = [];
		$scope.ownerListData = [];
		ownerService.getOwnerList().then(function(data){
			var ownerlist = {};
			angular.forEach(data, function(item) {
		        ownerlist[item.id] = item.name;
		    });
	        $scope.ownerListData = ownerlist;
	        console.log($scope.ownerListData);
	    });
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
	$rootScope.activeMenu="company";
}])
.factory('company.updateService', ['$http', '$q', '$state', 'alertService', function($http, $q, $state, alertService){
	var deferred;
	return {
		get: function(editId){
			deferred = $q.defer();
			$http.get('api/company/getDetails.php?id='+editId).success(function(data){
				deferred.resolve(data);
			})
			return deferred.promise;
		},
		add: function(data){
			deferred = $q.defer();
			$http.post('api/company/addDetails.php', data).success(function(data){
				alertService.add("success", "Record added Successfully..");				
				$state.go('company');
				deferred.resolve('');
			}).error(function(){
				alertService.add("danger", "Record not added, please try again later");
				deferred.reject('');
			});
			return deferred.promise;
		},
		delete: function(data){
			deferred = $q.defer();
			$http.post('api/company/deleteRecord.php', data).success(function(data){
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