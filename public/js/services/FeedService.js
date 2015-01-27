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
                        item.domain = f.meta.title; //item.link.replace(/(?:(http|htts):\/\/(www.)*)/, '').replace(/\/.*/, '').replace(/\..*/, '');
                    })
                });


                function group(dateFilter){
                    var groupedByLabel =  _(service.items)
                        .filter(dateFilter)
                        .groupBy('label')
                        .value();

                    var groupedArr =  _(groupedByLabel)
                        .keys()
                        .map(function(label){
                            var topic =  {
                                label: label,
                                items: groupedByLabel[label],
                            };

                            topic.domains = _(topic.items)
                                .pluck('domain')
                                .uniq()
                                .value();

                            topic.domainLabel = topic.domains.join(', ');

                            return topic;
                        })
                        .value();


                    return groupedArr;
                }


                var dayAgo = new Date().add(-1).days();
                var weekAgo = new Date().add(-7).days();
                var monthAgo = new Date().add(-30).days();

                this.grouped.today = group(function(i){
                    return new Date(i.date) >= dayAgo;
                });

                this.grouped.thisWeek = group(function(i){
                    return new Date(i.date) < dayAgo &&  new Date(i.date) >= weekAgo;
                });

                this.grouped.thisMonth = group(function(i){
                    return new Date(i.date) < weekAgo &&  new Date(i.date) >= monthAgo;
                });

                this.grouped.old = group(function(i){
                        return new Date(i.date) < monthAgo;
                });



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
