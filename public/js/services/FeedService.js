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

                //flatten items from serveral feeds into new list
                this.feeds.forEach(function(f){
                    f.items.forEach(function(item){
                        item.label = f.label;
                        service.items.push(item);
                        item.domain = item.link.replace(/(?:(http|htts):\/\/(www.)*)/, '').replace(/\/.*/, '').replace(/\..*/, '');
                    })
                });


                function groupByTitle(memo, item){
                    var matchingGroups = memo.filter(function(lg){
                        return lg.label == item.label;
                    });

                    if(matchingGroups.length == 0){
                        var labelGroup = {
                            label: item.label,
                            items: [],
                            isRead: true
                        }
                        memo.push(labelGroup);
                    }else{
                        var labelGroup = matchingGroups[0];
                    }

                    labelGroup.items.push(item);
                    if(!item.isRead){
                        labelGroup.isRead = false;
                    }

                    return memo;
                }




                var dayAgo = new Date().add(-1).days();
                var weekAgo = new Date().add(-7).days();
                var monthAgo = new Date().add(-30).days();

                this.grouped.today = this.items
                    .filter(function(i){
                        return new Date(i.date) >= dayAgo;
                    })
                    .reduce(groupByTitle, []);

                this.grouped.thisWeek = this.items
                    .filter(function(i){
                        return new Date(i.date) < dayAgo &&  new Date(i.date) >= weekAgo;
                    })
                    .reduce(groupByTitle, []);

                this.grouped.thisMonth = this.items
                    .filter(function(i){
                        return new Date(i.date) < weekAgo &&  new Date(i.date) >= monthAgo;
                    })
                    .reduce(groupByTitle, []);

                this.grouped.old = this.items
                    .filter(function(i){
                        return new Date(i.date) < monthAgo;
                    })
                    .reduce(groupByTitle, []);

                    console.log(this.grouped.thisWeek);



            };

        }

        service.addFeed = function(url, label){
            //this.state.current = 'syncing';
            //this.feeds.push(url);
            var post = $http.post('/feeds', {
                url: url
            })
            .success(function(feed){
                feed.label = label;
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
