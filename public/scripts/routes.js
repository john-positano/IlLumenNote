angular
  .module('IlLumenNote')
  .config(
    function ($locationProvider, $stateProvider, $httpProvider, $urlRouterProvider) {
      $locationProvider.html5Mode({ enabled: true, requireBase: false });

      $stateProvider
        .state(
          'private',
          {
            abstract: true,
            url: '/app',
            views: {
              'mainView': {
                template: '<div ui-view="privateView"></div>'
              }
            }
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
            },
            resolve: {
              a: function () {
                console.log('a');
              }
            }
          }
        )
        .state(
          'private.dashboard',
          {
            url: '/dashboard',
            views: {
              'privateView': {
                templateUrl: '/private/dashboard',
                controller: 'DashboardController'
              }
            }
          }
        );

      $httpProvider.interceptors.push('JWTTokenInterceptor');
      $urlRouterProvider.otherwise('/login');
    }
  );