angular.module( 'MaterialRss')
    .controller("MainController", function($scope, $mdDialog){

        $scope.addFeed = function(ev){
            $mdDialog.show({
                controller: 'AddDialogController',
                templateUrl: '/views/add_dialog_view.tmpl.html',
                targetEvent: ev
            })
            .then(function(url) {
                $scope.feeds = $scope.feeds || [];
                $scope.feeds.push(url);
            });
        }
    });
