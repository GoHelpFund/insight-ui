'use strict';

angular.module('insight.richlist')
    .controller('RichListController', function ($scope, RichList) {
        $scope.items = [];

        RichList.query({}, function (addrs) {
            for (var i = 0; i < addrs.length; i++) {
                $scope.items.push({
                    rank: i + 1,
                    addr: addrs[i].address,
                    balance: addrs[i].balance
                });
            }
        });
    })
    .controller('RealSupplyController', function($scope, $http) {
        $scope.realSupply = 'Not available';
        $http.get("http://insight.gohelpfund.com/insight-api/supply")
            .then(function(response) {
                $scope.realSupply = response.data.circulating.toFixed(2).replace(/(\B)(?=(\d{3})+(?!\d))/g, '$1 ') + ' HELP';
                $scope.realSupplyRaw = response.data.circulating;
            });
    });
;
