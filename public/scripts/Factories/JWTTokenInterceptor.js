angular.module('IlLumenNote').factory('JWTTokenInterceptor', function ($rootScope, $state, $q) {
  return {
    'request': function (config) {
      try {
        var $user = JSON.parse(localStorage.getItem('$user'));
        if ($user) {
          config.headers.Authorization = 'Bearer ' + $user.token;
        }
      }
      catch (e) {
        console.log('AuthorizationErr', e);
      }
      return config;
    },
    'responseError': function(rejection) {
      localStorage.removeItem('$user');
      $state.go('login');
      return $q.reject(rejection);
    }
  };
});