angular.module( 'MaterialRss')
    .service("FeedService", function($http, $timeout, $q){

        var service = {
            feeds: [],
            state: {
                current:'idle'
            }
        };

        service.addFeed = function(url){
           // $http.get($scope.feed.url).success(function (data) {
           //      console.log(data);
           //  });
            service.state.current = 'syncing';

            service.feeds.push(url);
            var deferred = $q.defer();
            deferred.resolve();
            return deferred.promise;
        }

        return service;
    });
