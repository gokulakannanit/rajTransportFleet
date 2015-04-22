angular.module("ngTagsInputSite", ['ngTagsInput'])    
.controller('HomeCtrl', function($scope) {

    $scope.owner = 'Batman, Superman, Flash';
    $scope.tagList = ['Batman', 'Superman', 'Flash', 'The Punisher', 'Exam'];
})
.directive("ftTagInput", function(){

    function link(scope, elem, attr, ctrl){
        scope.tags = scope.selectedTags.split(",");
        scope.sourceList = scope.autoCompleteSource;

        scope.$watch('tags', function(){
            scope.selectedTags = scope.tags.join(",");
            console.log(scope.myFormName);
            ctrl.$setValidity(scope.myFormName, scope.tags.length>3);
        });

        function isValid(value) {
            console.log(scope.myFormName);
            ctrl.$setValidity(scope.myFormName, (scope.tags.length>3));
            return value;
        }

        ctrl.$parsers.unshift(isValid);
        ctrl.$formatters.unshift(isValid);
    }
    return{
        restrict: 'AE',
        require: 'ngModel',
        scope:{
            selectedTags:'=ngModel',
            autoCompleteSource:'=',
            myFormName:'=name'
        },
        link:link,
        template:'<input type="hidden" name="myFormName" /> <tags-input ng-model="tags"><auto-complete source="sourceList"></auto-complete></tags-input>'
    }
});