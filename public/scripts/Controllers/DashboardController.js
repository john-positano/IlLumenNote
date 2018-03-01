angular.module('IlLumenNote').controller('DashboardController', function ($timeout, $state, $scope, $rootScope, LoginService, NotificationService, NoteService) {
  $scope.notes = Array(1).fill({ note_body: ' ' });

  $timeout(
    function () {
      $scope.grid = new Muuri(
        '.grid', 
        { 
          dragEnabled: true, 
          dragSortPredicate: {
            action: 'swap', 
            tolerance: 30
          }
        }
      );
    }
  );

  $scope.alertUserInput = function () {
    NotificationService.color("red");
    NotificationService.notify(
      function () { $scope.notificationBody = 'Email and password are required to login!'; $scope.$apply(); },
      function () { $scope.notificationBody = ' '; }
    );
  };

  NoteService.getNotes().then(
    function (success) { 
      $scope.notes = success.data;
      if ($scope.$$phase != '$digest') { $scope.$apply(); }

      $timeout(
        function () {
          $scope.grid = new Muuri(
            '.grid', 
            { 
              dragEnabled: true, 
              dragSortPredicate: {
                action: 'swap', 
                tolerance: 30
              }
            }
          );
        }
      );
    },
    $scope.alertUserInput
  );

  $scope.newNote = function () {
    var note = { note_body: "New note." }
    var length = $scope.notes.push(note);

    $timeout(
      function () {
        $scope.grid = new Muuri(
          '.grid', 
          { 
            dragEnabled: true, 
            dragSortPredicate: {
              action: 'swap', 
              tolerance: 30
            }
          }
        );
      }
    );
  };

  $scope.getNoteId = function ($index) {
    return "note-" + $index + 1;
  };
});