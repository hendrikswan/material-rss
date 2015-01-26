angular.module('MaterialRss').directive('feedList', function () {
    return {
        restrict: 'E',
        templateUrl: '/views/feed_list.tmpl.html',
        scope: {
            heading: '@',
            items: '='
        },

        link: function (scope, element, attr, ctrl) {

            // scope.$watch('items', function(newVal) {
            //     if (newVal) {

            //         scope.trendData = LookingGlassService['get' + newVal + 'Trend'].apply(LookingGlassService);
            //         scope.chartData =  {
            //             labels : scope.trendData.labels,
            //             datasets : [
            //                 {
            //                     fillColor : "rgba(151,187,205,0)",
            //                     strokeColor : "#4dbfb1",
            //                     pointColor : "#EF5374",
            //                     pointStrokeColor : "#fff",
            //                     data : scope.trendData.totals
            //                 }
            //             ]
            //         };
            //     }
            // });
        }
    };
});
