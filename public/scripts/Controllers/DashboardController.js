angular.module('IlLumenNote').controller('DashboardController', function ($timeout, $state, $scope, $rootScope, LoginService, NotificationService) {
  $timeout(function () { 
    var grid = new Muuri(
      '.grid', 
      { 
        dragEnabled: true, 
        dragSortPredicate: {
          action: 'swap', 
          tolerance: 30
        },
      }
    );
  });

  $scope.abc = [0,1,2,3,4];
});