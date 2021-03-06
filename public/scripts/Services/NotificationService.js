angular.module('IlLumenNote').service('NotificationService', function ($timeout) {
  var self = this;

  self.busy = false;
  self.promise;

  self.$$element = angular.element('.notification').first();

  self.color = function ($color) {
    self.$$element.attr('color', $color);
  };

  self.notify = function ($lambda1, $lambda2) {
    if (!self.busy) {
      self.busy = true;
      self.$$element.slideDown(
        {
          duration: 200,
          easing: 'easeOutQuart',
          complete: function () {
            $lambda1();
            self.promise = $timeout(
              function () {
                $lambda2();
                self.$$element.slideUp(
                  {
                    duration: 200,
                    easing: 'easeInQuart',
                    complete: function () {
                      self.busy = false;
                    }
                  }
                );
              }, 
              1500
            );
          }
        }
      );
    }
  };

  self.abort = function () {
    self.$$element.stop();
    $timeout.cancel(self.promise);
    self.busy = false;
  };

  return self;
});