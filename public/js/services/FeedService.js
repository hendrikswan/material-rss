angular.module( 'MaterialRss')
    .service("FeedService", function($http, $timeout, $q){


        var service = {
            feeds: [],
            items: [],
            grouped: {
                today: [],
                thisWeek: [],
                thisMonth: [],
                old: []
            },
            state: {
                current:'idle'
            }
        };

        service.initFromStorage = function(){
            service.items.length = 0;

            if(localStorage.getItem('feeds')){
                service.feeds = JSON.parse(localStorage.getItem('feeds'));

                this.feeds.forEach(function(f){
                    f.items.forEach(function(i){
                        service.items.push(i);
                    })
                });

                var dayAgo = new Date().add(-1).days();
                var weekAgo = new Date().add(-7).days();
                var monthAgo = new Date().add(-30).days();

                this.grouped.today = this.items.filter(function(i){
                    return new Date(i.date) >= dayAgo;
                });

                this.grouped.thisWeek = this.items.filter(function(i){
                    return new Date(i.date) < dayAgo &&  new Date(i.date) >= weekAgo;
                });

                this.grouped.thisMonth = this.items.filter(function(i){
                    return new Date(i.date) < weekAgo &&  new Date(i.date) >= monthAgo;
                });

                this.grouped.old = this.items.filter(function(i){
                    return new Date(i.date) < monthAgo;
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
