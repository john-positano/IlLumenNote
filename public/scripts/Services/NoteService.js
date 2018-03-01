angular.module('IlLumenNote').service('NoteService', function ($q, $http) {
  var self = this;

  self.getNotes = function () {
    var notesDeferred = $q.defer();

    $http
      .get('/private/notes')
      .then(notesDeferred.resolve, notesDeferred.reject);

    return notesDeferred.promise;
  };

  self.postNote = function ($note_body) {
    var notesDeferred = $q.defer();

    $http
      .post('/private/notes', {'note_body': $note_body})
      .then(notesDeferred.resolve, notesDeferred.reject);

    return notesDeferred.promise;
  };

  self.putNote = function ($note_body, $note_id) {
    var notesDeferred = $q.defer();

    $http
      .put(('/private/notes' + $note_id), {'note_body': $note_body})
      .then(notesDeferred.resolve, notesDeferred.reject);

    return notesDeferred.promise;
  };

  self.deleteNote = function ($note_id) {
    var notesDeferred = $q.defer();

    $http
      .delete('/private/notes' + $note_id)
      .then(notesDeferred.resolve, notesDeferred.reject);

    return notesDeferred.promise;
  };

  return self;
});