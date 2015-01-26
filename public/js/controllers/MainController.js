angular.module( 'MaterialRss')
    .controller("MainController", function($scope, $mdDialog, FeedService){
        $scope.feeds = FeedService.feeds;

        $scope.addFeed = function(ev){
            $mdDialog.show({
                controller: 'AddDialogController',
                templateUrl: '/views/add_dialog_view.tmpl.html',
                targetEvent: ev
            })
            .then(function(url) {

            });
        }
    });
