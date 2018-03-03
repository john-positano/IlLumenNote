angular.module('IlLumenNote').controller('LoginController', function ($state, $scope, $rootScope, LoginService, NotificationService, $compile) {
  $scope.notificationBody = ' ';
  NotificationService.$$element = angular.element('.notification').first();

  $scope.redden = function (ngModel) {
    $('[ng-model="' + ngModel + '"]').css({ 'border-color': 'red' });
  };

  $scope.grey = function (ngModel) {
    $('[ng-model="' + ngModel + '"]').css({ 'border-color': 'lightgrey' });
  };

  $scope.alertUserInput = function () {
    NotificationService.color("red");
    NotificationService.notify(
      function () { $scope.notificationBody = 'Email and password are required to login!'; $scope.$apply(); },
      function () { $scope.notificationBody = ' '; }
    );
  };

  $scope.login = function (email, password) {
    $scope.grey('email');
    $scope.grey('password');

    if (!email) { $scope.redden('email'); $scope.alertUserInput(); }
    if (!password) { $scope.redden('password'); $scope.alertUserInput(); }

    if (!(email && password)) { return; }

    NotificationService.color("blue");
    NotificationService.notify(
      function () { $scope.notificationBody = 'Logging in...'; $scope.$apply(); },
      function () { $scope.notificationBody = ' '; }
    );

    LoginService.login(email, password).then(
      function (resolved) {
        $rootScope.$emit('LOGIN', resolved.data);
      },
      function (rejected) {
        $rootScope.$emit('LOGERR', rejected);
        NotificationService.abort();
        NotificationService.color("red");
        NotificationService.notify(
          function () { $scope.notificationBody = rejected.data.errorMessage ? rejected.data.errorMessage : 'Network error!'; },
          function () { $scope.notificationBody = ' '; }
        );
      }
    );
  };
});