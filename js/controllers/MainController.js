angular.module( 'MaterialRss', [ 'ngMaterial' ] )
    .controller("MainController", function($scope){
                $scope.budget =
                {
                    income:
                    [
                        {
                            description: "salary",
                            amount: 4500
                        },
                        {
                            description: "tagtree",
                            amount: 500
                        }
                    ],
                    expenses:
                    [
                        {
                            description: "online services",
                            amount: 300
                        },
                        {
                            description: "microphone",
                            amount: 100
                        }
                    ]
                }
    });
