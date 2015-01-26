angular.module( 'MaterialRss')
    .controller("AddDialogController", function($scope, $mdDialog, $timeout, $http){
        $scope.feed = {
            url: ''
        };

        $scope.cancel = function() {
            $mdDialog.cancel();
        };
        $scope.add = function() {
            //$mdDialog.hide(url);

            $scope.adding = true;

            $http.get($scope.feed.url).success(function (data) {
                console.log(data);
            });
        };
    });
