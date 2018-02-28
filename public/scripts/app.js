angular
  .module('IlLumenNote', ['ui.router', 'ngAnimate'])
  .run(function ($rootScope, $state) {
    $rootScope.$on('LOGIN', function ($e, $user) {
      localStorage.setItem('USER', JSON.stringify($user));
      $state.go('private.dashboard');
    });
  })
;