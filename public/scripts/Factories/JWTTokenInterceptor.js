angular.module('IlLumenNote').factory('JWTTokenInterceptor', function () {
  return {
    'request': function (config) {
      try {
        var $user = JSON.parse(localStorage.getItem('USER'));
        config.headers.Authorization = 'Bearer ' + $user.token;
      }
      catch (e) {
        console.log('AuthorizationErr', e);
      }
      return config;
    }
  };
});