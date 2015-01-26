angular.module( 'MaterialRss')
    .controller("MainController", function($scope, $mdDialog, $mdToast, FeedService){
        $scope.feeds = FeedService.feeds;
        $scope.items = FeedService.items;
        $scope.feedState = FeedService.state;

        $scope.addFeed = function(ev){
            $mdDialog.show({
                controller: 'AddDialogController',
                templateUrl: '/views/add_dialog_view.tmpl.html',
                targetEvent: ev
            })
            .then(function(url) {
                $mdToast.show(
                    $mdToast.simple()
                        .content('feed added successfully - syncing content')
                        .position('top right')
                        .hideDelay(1200)
                )
            });
        }
    });
