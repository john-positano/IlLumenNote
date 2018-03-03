angular.module('IlLumenNote').controller('DashboardController', function ($filter, $timeout, $state, $scope, $rootScope, LoginService, NotificationService, NoteService) {
  $scope.notificationBody = ' ';
  NotificationService.$$element = angular.element('.notification').first();

  window.notes = $scope.notes = [
    {
      note_title: 'Loading notes',
      name: 'IlLumenNote',
      note_body: 'One moment please...',
      updated_at: '...'
    }
  ];

  $scope.openNotes = null;

  $scope.alertUserInput = function () {
    NotificationService.color("red");
    NotificationService.notify(
      function () { $scope.notificationBody = 'There was an error completing the note action!'; $scope.$apply(); },
      function () { $scope.notificationBody = ' '; }
    );
  };

  NoteService.getNotes().then(
    function (success) { 
      $scope.notes = success.data;
      if ($scope.$$phase != '$digest') { $scope.$apply(); }
    },
    $scope.alertUserInput
  );

  $scope.initElement = function (a, b) {
    // console.log('initElement a', a, b);
  };

  $scope.newNote = function () {
    var newDate = $filter('date')((new Date()), 'yyyy-MM-dd HH:mm:ss');
    var note = {
      owner_id: $rootScope.$user.id,
      name: $rootScope.$user.name, 
      note_body: '...',
      created_at: newDate, 
      note_title: 'New note' 
    };
    var length = $scope.notes.push(note);
    $scope.edit(length);
  };

  $scope.getNoteId = function ($index) {
    $note_id = $scope.notes[$index].note_id;

    if ($note_id) {
      return 'note-' + ($scope.notes[$index].note_id) + ' note-index-' + $index;
    } else {
      return 'note-index-' + $index;
    }
  };

  $scope.edit = function ($selectedIndex) {
    $scope.notes.forEach(function (each, noteIndex) {
      switch (true) {
        case (each.editting) && !((each.note_id == "") || (each.note_id == null)):
          each.saving = true;
          NoteService.putNote(each.note_body, each.note_title, each.note_id).then(
            function (success) {
              each.note_title = success.data.note_title;
              each.note_body = success.data.note_body;
              each.updated_at = success.data.updated_at;
              each.created_at = success.data.created_at;
              each.saving = false;
              each.editting = false;
              if ($scope.$$phase != '$digest') { $scope.$apply(); }
            },
            function (error) {
              each.saving = false;
              each.editting = false;
              console.error(error);
            }
          );
          break;
        case (each.editting) && ((each.note_id == "") || (each.note_id == null)):
          each.saving = true;
          NoteService.postNote(each.note_body, each.note_title).then(
            function (success) {
              each.note_id = success.data.note_id;
              each.note_title = success.data.note_title;
              each.note_body = success.data.note_body;
              each.updated_at = success.data.updated_at;
              each.created_at = success.data.created_at;
              each.saving = false;
              each.editting = false;
              if ($scope.$$phase != '$digest') { $scope.$apply(); }
            },
            function (error) {
              each.saving = false;
              each.editting = false;
              console.error(error);
            }
          );
          break;
        case ((noteIndex == $selectedIndex) && (!each.editting)):
          each.editting = true;
          break;
        default:
          each.editting = false;
          each.saving = false;
          break;
      }
    });
  };

  $scope.delete = function ($note_id, $selectedIndex, $event) {
    if (!$note_id) {
      console.log($selectedIndex);
      $scope.notes.splice($selectedIndex, 1);
      return; 
    }
    $scope.notes[$selectedIndex].deleting = true;
    $scope.notes[$selectedIndex].editting = false;
    $scope.notes[$selectedIndex].saving = false;
    NoteService.deleteNote($note_id).then(
      function (success) {
        $scope.notes.splice($selectedIndex, 1)
      },
      function (error) {
        $scope.notes[$selectedIndex].deleting = false;
        console.error(error);
      }
    );
  };

  $scope.logout = function () {
    localStorage.removeItem('$user');
    $state.go('login');
  };
});