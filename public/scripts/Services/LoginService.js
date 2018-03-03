angular.module('IlLumenNote').service('LoginService', function ($q, $http) {
  var self = this;

  self.login = function ($email, $password) {
    var loginDeferred = $q.defer();

    $http
      .post('/login', { email: $email, password: $password })
      .then(loginDeferred.resolve, loginDeferred.reject);

    return loginDeferred.promise;
  };

  return {
    login: self.login
  }
});