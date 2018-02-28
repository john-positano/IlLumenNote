angular.module('IlLumenNote').run(function ($state, $rootScope, $timeout) {
  $timeout(function () {
    $rootScope.$on('LOGIN', function ($e, $user) {
      localStorage.setItem('$user', JSON.stringify($user));
      $rootScope.$user = $user;
      $state.go('private.dashboard');
    });

    if (localStorage.getItem('$user')) {
      $state.go('private.dashboard');
    } else {
      $state.go('login');
    }
  });
});