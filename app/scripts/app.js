(function() {
  var TimerCtrl, app,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  app = angular.module('scrumtimer', ['ui.bootstrap']);

  TimerCtrl = (function() {
    var TIME_INTERVAL;

    TIME_INTERVAL = 250;

    function TimerCtrl($scope, $interval) {
      this.$scope = $scope;
      this.$interval = $interval;
      this.addTime = __bind(this.addTime, this);
      this.stop = __bind(this.stop, this);
      this.reset = __bind(this.reset, this);
      this.lap = __bind(this.lap, this);
      this.start = __bind(this.start, this);
      this.reset();
      this.bindScope();
      return;
    }

    TimerCtrl.prototype.bindScope = function() {
      this.$scope.start = this.start;
      this.$scope.stop = this.stop;
      this.$scope.lap = this.lap;
      return this.$scope.reset = this.reset;
    };

    TimerCtrl.prototype.start = function() {
      this.timerInterval = this.$interval(this.addTime, TIME_INTERVAL);
      this.$scope.running = true;
    };

    TimerCtrl.prototype.lap = function() {
      this.$scope.laps.unshift({
        time: this.$scope.currentTime
      });
      this.$scope.currentTime = 0;
    };

    TimerCtrl.prototype.reset = function() {
      this.$scope.currentTime = 0;
      this.$scope.totalTime = 0;
      this.$scope.running = false;
      this.$scope.laps = [];
    };

    TimerCtrl.prototype.stop = function() {
      this.$interval.cancel(this.timerInterval);
      this.$scope.running = false;
      this.timerInterval = null;
    };

    TimerCtrl.prototype.addTime = function() {
      this.$scope.currentTime += TIME_INTERVAL;
      this.$scope.totalTime += TIME_INTERVAL;
    };

    return TimerCtrl;

  })();

  app.controller('timerCtrl', ['$scope', '$interval', TimerCtrl]);

  app.filter('time', function() {
    return function(ms) {
      return Math.floor(ms / 1000);
    };
  });

}).call(this);
