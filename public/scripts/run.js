angular.module('IlLumenNote').run(function ($state, $rootScope, $timeout, $transitions) {
  $timeout(function () {
    $rootScope.$on('LOGIN', function ($e, $user) {
      localStorage.setItem('$user', JSON.stringify($user));
      $rootScope.$user = $user;
      $state.go('private.dashboard');
    });

    var $preexistingUser = localStorage.getItem('$user');

    if ($preexistingUser) {
      try {
        $rootScope.$user = JSON.parse($preexistingUser);
      } catch (e) {
        return;
      }
      $state.go('private.dashboard');
    }
  });
});