angular.module("ngTagsInputSite", ['ngTagsInput'])    
.controller('HomeCtrl', function($scope) {
    $scope.owner = 'Batman, Superman, Flash';
    $scope.tagList = ['Batman', 'Superman', 'Flash', 'The Punisher', 'Exam'];
})
.directive("ftTagInput", function(){

    function link(scope, elem, attr, ctrl){
        scope.tagit = scope.selectedTags.split(",");
        scope.sourceList = scope.autoCompleteSource;
        scope.onTagAdded = function(){
            scope.selectedTags = scope.tagit.join(",");
            console.log("----",scope.minValue);
            ctrl.$setValidity(scope.eleName, (scope.tagit.length>=scope.minValue));
        }
    }
    return{
        restrict: 'AE',
        require: 'ngModel',
        scope:{
            selectedTags:'=ngModel',
            autoCompleteSource:'=',
            eleName:'@name',
            minValue:'@minValue'
        },
        link:link,
        template:'<input type="hidden" name="eleName" /> <tags-input ng-model="tagit" on-tag-added="onTagAdded();" on-tag-removed="onTagAdded();"><auto-complete source="sourceList"></auto-complete></tags-input>'
    }
});