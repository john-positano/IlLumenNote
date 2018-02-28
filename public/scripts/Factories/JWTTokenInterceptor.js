angular.module('IlLumenNote').factory('JWTTokenInterceptor', function ($rootScope) {
  return {
    'request': function (config) {
      try {
        var $user = JSON.parse(localStorage.getItem('$user'));
        config.headers.Authorization = 'Bearer ' + $user.token;
      }
      catch (e) {
        console.log('AuthorizationErr', e);
      }
      return config;
    }
  };
});