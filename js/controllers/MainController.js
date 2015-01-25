angular.module( 'MaterialRss')
    .controller("MainController", function($scope, $mdDialog){

        $scope.addFeed = function(ev){
            $mdDialog.show({
                controller: 'AddDialogController',
                templateUrl: '/views/add_dialog_view.tmpl.html',
                targetEvent: ev
            })
            .then(function(answer) {
                $scope.alert = 'You said the information was "' + answer + '".';
            }, function() {
                $scope.alert = 'You cancelled the dialog.';
            });
        }

        // $scope.budget =
        // {
        //     income:
        //     [
        //         {
        //             description: "salary",
        //             amount: 4500,
        //             icon: "income",
        //             category: "Income"
        //         },
        //         {
        //             description: "tagtree",
        //             amount: 500,
        //             icon : "income",
        //             category: "Income"
        //         }
        //     ],
        //     expenses:
        //     [
        //         {
        //             description: "internet",
        //             amount: 50,
        //             icon: "telephone_internet",
        //             category: "Telephone and internet"
        //         },
        //         {
        //             description: "a book",
        //             amount: 100,
        //             icon: "gifts",
        //             category: "gifts"
        //         }
        //     ]
        // }
    });
