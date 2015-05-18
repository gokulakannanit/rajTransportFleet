angular.module('mainModule')
.controller('company.addController', ['$rootScope', '$scope', '$stateParams', 'company.updateService', 'owner.updateService' , 
    function($rootScope, $scope, $stateParams, updateService, ownerService){
	// get the id

    $rootScope.activeMenu="company";

    $scope.isEdit = $stateParams.isEdit;

    $scope.ownerList =   [{label:'Battery', value:'Battery'}, 
                            {label:'Electricals', value:'Electricals'}, 
                            {label:'Spare Parts', value:'Spare Parts'}, 
                            {label:'Tyre', value:'Tyre'}];

    $scope.selectedTags = [];

    $scope.companyType = [{label:"Sole Propriteship", value:"S"}, {label:"Partnership", value:"P"}];

    ownerService.getOwnerList().then(function(data){
        $scope.ownerListData = data;
        updateOwnerData();
    });

    function updateOwnerData(){
        angular.forEach($scope.ownerListData, function(item) {
            var owner = ($scope.model.owner).split(",");
            angular.forEach(owner, function(item1) {
                if(item.id === item1){
                    $scope.selectedTags.push({id:item.id,name:item.name})
                }
            });
        });
    }

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
            updateOwnerData();
    	});    	
    }
    $scope.updateDetails = function(){
        var owner = [];
        angular.forEach($scope.selectedTags, function(item) {
          owner.push(item.id);
        });

        $scope.model.owner = owner.join(",");
    	updateService.add($scope.model);
    }

    $scope.reset = function(){
    	init();
    	$scope.companyForm.$setPristine()
    }

    init();

}]);
