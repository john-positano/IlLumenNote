angular.module('IlLumenNote').config(
  function ($locationProvider, $stateProvider, $urlRouterProvider, $httpProvider) {
    $locationProvider.html5Mode({ enabled: true, requireBase: false });

    $stateProvider
      .state(
        'private',
        {
          abstract: true,
          url: '/app'
        }
      )
      .state(
        'login',
        {
          url: '/login',
          views: {
            'mainView': {
              templateUrl: '/views/login.html',
              controller: 'LoginController'
            }
          }
        }
      )
      .state(
        'private.dashboard',
        {
          url: '/dashboard',
          views: {
            'mainView': {
              // templateUrl: '/private/dashboard',
              template: '<div> hi </div>',
              controller: 'DashboardController'
            }
          }
        }
      );

    $urlRouterProvider.otherwise('login');
    $httpProvider.interceptors.push('JWTTokenInterceptor');
  }
);