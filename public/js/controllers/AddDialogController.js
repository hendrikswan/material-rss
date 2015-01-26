angular.module( 'MaterialRss')
    .controller("AddDialogController", function($scope, $mdDialog, $timeout, $http, FeedService){
        $scope.feed = {
            url: 'http://tagtree.io'
        };

        $scope.cancel = function() {
            $mdDialog.cancel();
        };


        $scope.add = function() {
            if(!$scope.feed.url){
                return;
            }

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
