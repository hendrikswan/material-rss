angular.module( 'MaterialRss')
    .service("FeedService", function($http, $timeout, $q){

        var feeds = [];
        if(localStorage.getItem('feeds')){
            feeds = JSON.parse(localStorage.getItem('feeds'));
        }

        var service = {
            feeds: feeds,
            state: {
                current:'idle'
            }
        };




        service.addFeed = function(url){
            //this.state.current = 'syncing';
            //this.feeds.push(url);
            var post = $http.post('/feeds', {
                url: url
            })
            .success(function(feed){
                service.feeds.push(feed);
                feed.items = feed.items.map(function(i){
                    i.isRead = false;
                    i.isPinned = false;
                });
                window.localStorage.setItem('feeds', JSON.stringify(service.feeds));
            });
            // .error(function(err){
            //     deferred.reject();
            // });

            return post;
        }

        service.syncFeed = function(){
            alert('yo');
        }

        return service;
    });
