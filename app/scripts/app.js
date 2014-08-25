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
      this.shortest = __bind(this.shortest, this);
      this.longest = __bind(this.longest, this);
      this.average = __bind(this.average, this);
      this.merge = __bind(this.merge, this);
      this.reset();
      this.bindScope();
      return;
    }

    TimerCtrl.prototype.bindScope = function() {
      this.$scope.start = this.start;
      this.$scope.stop = this.stop;
      this.$scope.lap = this.lap;
      this.$scope.reset = this.reset;
      this.$scope.merge = this.merge;
      this.$scope.longest = this.longest;
      this.$scope.shortest = this.shortest;
      this.$scope.average = this.average;
    };

    TimerCtrl.prototype.merge = function(index) {
      var current, previous;
      previous = this.$scope.laps[index - 1];
      current = this.$scope.laps[index];
      previous.time += current.time;
      this.$scope.laps = _.without(this.$scope.laps, current);
    };

    TimerCtrl.prototype.average = function() {
      return this.$scope.totalTime / (this.$scope.laps.length + 1);
    };

    TimerCtrl.prototype.longest = function() {
      return _.max(this.$scope.laps, function(lap) {
        return lap.time;
      });
    };

    TimerCtrl.prototype.shortest = function() {
      return _.min(this.$scope.laps, function(lap) {
        return lap.time;
      });
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
      return "" + (Math.floor(ms / 1000)) + " s";
    };
  });

}).call(this);
