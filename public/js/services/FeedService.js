angular.module( 'MaterialRss')
    .service("FeedService", function($http, $timeout, $q){


        var service = {
            feeds: [],
            items: [],
            state: {
                current:'idle'
            }
        };

        service.initFromStorage = function(){

            if(localStorage.getItem('feeds')){
                service.feeds = JSON.parse(localStorage.getItem('feeds'));

                this.feeds.forEach(function(f){
                    f.items.forEach(function(i){
                        service.items.push(i);
                    })
                });
            };

        }

        service.addFeed = function(url){
            //this.state.current = 'syncing';
            //this.feeds.push(url);
            var post = $http.post('/feeds', {
                url: url
            })
            .success(function(feed){
                service.feeds.push(feed);
                feed.items.forEach(function(i){
                    i.isRead = false;
                    i.isPinned = false;
                });
                window.localStorage.setItem('feeds', JSON.stringify(service.feeds));
                service.initFromStorage();
            });

            return post;
        }

        service.syncFeed = function(){
            alert('yo');
        }

        service.initFromStorage();

        return service;
    });
