angular.module( 'MaterialRss', [ 'ngMaterial' ] )
    .controller("MainController", function($scope){
                $scope.budget =
                {
                    income:
                    [
                        {
                            description: "salary",
                            amount: 4500,
                            icon: "income",
                            category: "Income"
                        },
                        {
                            description: "tagtree",
                            amount: 500,
                            icon : "income",
                            category: "Income"
                        }
                    ],
                    expenses:
                    [
                        {
                            description: "internet",
                            amount: 50,
                            icon: "telephone_internet",
                            category: "Telephone and internet"
                        },
                        {
                            description: "a book",
                            amount: 100,
                            icon: "gifts",
                            category: "gifts"
                        }
                    ]
                }
    });
