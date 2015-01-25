angular.module( 'MaterialRss')
    .controller("AddDialogController", function($scope, $mdDialog){

        $scope.hide = function() {
            $mdDialog.hide();
        };
        $scope.cancel = function() {
            $mdDialog.cancel();
        };
        $scope.answer = function(answer) {
            $mdDialog.hide(answer);
        };
    });
