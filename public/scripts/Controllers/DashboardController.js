angular.module('IlLumenNote').controller('DashboardController', function ($filter, $timeout, $state, $scope, $rootScope, LoginService, NotificationService, NoteService) {
  $scope.notificationBody = ' ';

  $scope.notes = [];
  $scope.openNotes = null;
  $scope.gridElement = angular.element('.grid')[0];

  $scope.reGrid = function () {
    $timeout(
      function () {
        $scope.grid = new Muuri(
          $scope.gridElement, 
          {
            layout: {
              fillGaps: true
            },
            dragEnabled: true, 
            dragSortPredicate: {
              action: 'swap', 
              tolerance: 30
            }
          }
        );

        $scope.grid.on('dragEnd', function (a,b) {
          localStorage.setItem('$slotConfig', JSON.stringify($scope.grid._layout.slots));
        });

        var $config = localStorage.getItem('$slotConfig');
        if ($config) {
          $scope.grid._layout.slots = JSON.parse($config);
          $scope.grid.refreshSortData();
        }
        console.log('$config', $config)
      }
    );
  };

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
      $scope.reGrid();
    },
    $scope.alertUserInput
  );

  $scope.newNote = function () {
    var newDate = $filter('date')((new Date()), 'yyyy-MM-dd HH:mm:ss');
    var note = { 
      owner_id: $rootScope.$user.id,
      name: $rootScope.$user.name, 
      note_body: '...',
      created_at: newDate, 
      note_title: 'New note' 
    }
    var length = $scope.notes.push(note);
    $scope.edit(length);
    $timeout(function () { $scope.grid.add(angular.element('.note-' + length)[0]) });
  };

  $scope.getNoteId = function ($index) {
    return "note-" + ($index + 1);
  };

  $scope.edit = function ($selectedIndex) {
    $scope.notes.forEach(function (each, noteIndex) {
      switch (true) {
        case (each.editting) && !((each.note_id == "") || (each.note_id == null)):
          console.log('Save note Number ' + noteIndex);
          NoteService.putNote(each.note_body, each.note_title, each.note_id).then(
            function (success) {
              console.log('put success', success);
              $scope.notes[$selectedIndex].note_title = success.data.note_title;
              $scope.notes[$selectedIndex].note_body = success.data.note_body;
              if ($scope.$$phase != '$digest') { $scope.$apply(); }
            },
            console.error
          );
          each.editting = false;
          break;
        case (each.editting) && ((each.note_id == "") || (each.note_id == null)):
          console.log('Save note Number ' + noteIndex);
          NoteService.postNote(each.note_body, each.note_title).then(
            function (success) {
              console.log('post success', success);
              $scope.notes[$selectedIndex].note_title = success.data.note_title;
              $scope.notes[$selectedIndex].note_body = success.data.note_body;
              if ($scope.$$phase != '$digest') { $scope.$apply(); }
            },
            console.error
          );
          each.editting = false;
          break;
        case ((noteIndex == $selectedIndex) && (!each.editting)):
          console.log('Begin editting. Break.');
          each.editting = true;
          break;
        default:
          break;
      }
    });
  };

  $scope.delete = function ($note_id, $selectedIndex) {
    NoteService.deleteNote($note_id).then(
      function (success) {
        $scope.notes.splice($selectedIndex, 1)
      },
      console.error
    );
  };

  $scope.logout = function () {
    localStorage.removeItem('$user');
    $state.go('login');
  };
});