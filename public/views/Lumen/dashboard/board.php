<div class="col-12 no-pad">
  <div class="row grid">
    <div class="item col-12 col-sm-3" ng-repeat="note in notes track by $index" ng-class="getNoteId($index)">
      <span>{{ note.name }} - {{ note.updated_at }}</span>
      <div class="item-content">
        <span class="item-content-container">{{ note.note_body }}<span>
      </div>
    </div>
  </div>
</div>