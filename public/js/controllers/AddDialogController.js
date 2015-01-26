angular.module( 'MaterialRss')
    .controller("AddDialogController", function($scope, $mdDialog, $timeout, $http, FeedService){
        $scope.feed = {
            url: ''
        };

        $scope.cancel = function() {
            $mdDialog.cancel();
        };


        $scope.add = function() {
            $scope.adding = true;

            FeedService
                .addFeed($scope.feed.url)
                .then(function(){
                    $mdDialog.hide();
                }, function(err){
                    $scope.addError = true;
                });


        };
    });
