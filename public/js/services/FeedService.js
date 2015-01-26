angular.module( 'MaterialRss')
    .service("FeedService", function($http, $timeout, $q){
        var service = {
            feeds: []
        };

        service.addFeed = function(url){
           // $http.get($scope.feed.url).success(function (data) {
           //      console.log(data);
           //  });
            service.feeds.push(url);
            var deferred = $q.defer();
            $timeout(function(){
                deferred.resolve();
            }, 2000);
            return deferred.promise;
        }

        return service;
    });
