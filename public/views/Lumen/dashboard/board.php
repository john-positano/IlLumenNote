<div class="col-12 no-pad">
  <div class="row grid">
    <div class="muuri muuri-item item col-12 col-sm-6 col-md-4 col-lg-3" ng-repeat="note in notes track by $index" ng-class="getNoteId($index)" ng-init="initElement(this, $index)">
      <div class="row ml-0 mr-0">
        <textarea 
          class="col-10 padless hide-overflow note-title"
          ng-model="note.note_title"
          ng-disabled="!note.editting">
          {{ note.note_title }}
        </textarea>
        <div class="col-1 padless">
          <i
            ng-click="edit($index)" 
            class="fa float-right" 
            ng-class="{ 
              'fa-edit tabby-edit': !note.editting, 
              'fa-save tabby-edit': note.editting, 
              'fa-hourglass-half tabby-edit': note.saving }
            ">
          </i>
        </div>
        <div class="col-1 padless">
          <i
            ng-click="delete(note.note_id, $index, $event)"
            class="fa tabby-trash float-right"
            ng-class="{ 
              'fa-trash': !note.deleting,
              'fa-hourglass-half': note.deleting
            }">   
          </i>
        </div>
      </div>
      <div class="row ml-0 mr-0">
        <div class="col-6 padless smaller"><i>by {{ note.name[0].toUpperCase() + note.name.slice(1) }}</i></div>
        <!-- <div class="col-6 padless smaller"><i>{{ getNoteId($index) }} | {{ $index }}</i></div> -->
        <div ng-if="note.updated_at" class="col-6 padless smaller">
          <span class="float-right hide-overflow">{{ note.updated_at.split(' ').join('T') | date: 'EEE MM/dd h:mm a' }}</span>
        </div>
        <div ng-if="!note.updated_at" class="col-6 padless smaller">
          <span class="float-right hide-overflow">[Not Saved]</span>
        </div>
      </div>
      <hr class="note">
      <textarea class="item-content" spellcheck="false" style="resize: none;" ng-disabled="!note.editting" ng-model="note.note_body">{{ note.note_body }}</textarea>
    </div>
  </div>
</div>