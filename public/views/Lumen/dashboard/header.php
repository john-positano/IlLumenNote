<div class="notification col-4 offset-8" color="red" style="display: none;">
  <b>{{ notificationBody }}</b>
</div>
<div class="col-3 col-sm-2 col-md-2 col-lg-1">
  <button type="button" class="btn btn-secondary header-btn" ng-click="newNote()"><i class="header-icon fa fa-sticky-note"></i><br>NEW</button>
</div>
<div class="col-6 col-sm-4 offset-sm-2 offset-md-2 offset-lg-3 text-center pl-0 pr-0">
  <h2 class="text-center header-logo mt-2">IlLumenNote</h2>
</div>
<div class="col-3 col-sm-2 col-md-2 offset-sm-2 offset-md-2">
  <button ng-click="logout()" type="button" class="btn btn-secondary header-btn" style="padding-top: 3px;"><i class="header-icon fa fa-sign-out"></i><br>LOGOUT</button>
</div>