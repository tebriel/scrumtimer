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
      this.isShortest = __bind(this.isShortest, this);
      this.isLongest = __bind(this.isLongest, this);
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
      this.$scope.isLongest = this.isLongest;
      this.$scope.isShortest = this.isShortest;
    };

    TimerCtrl.prototype.merge = function(index) {
      var current, previous;
      previous = this.$scope.laps[index - 1];
      current = this.$scope.laps[index];
      previous.time += current.time;
      this.$scope.laps = _.without(this.$scope.laps, current);
    };

    TimerCtrl.prototype.isLongest = function(lapItem) {
      return Math.floor(lapItem.time / 1000) === Math.floor(this.longest().time / 1000);
    };

    TimerCtrl.prototype.isShortest = function(lapItem) {
      return Math.floor(lapItem.time / 1000) === Math.floor(this.shortest().time / 1000);
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
      this.startTime = new Date;
      this.currentStart = new Date;
      this.timerInterval = this.$interval(this.addTime, TIME_INTERVAL);
      this.$scope.running = true;
    };

    TimerCtrl.prototype.lap = function() {
      this.$scope.laps.unshift({
        time: this.$scope.currentTime
      });
      this.$scope.currentTime = 0;
      this.currentStart = new Date;
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
      this.$scope.currentTime = (new Date) - this.currentStart;
      this.$scope.totalTime = (new Date) - this.startTime;
    };

    return TimerCtrl;

  })();

  app.controller('timerCtrl', ['$scope', '$interval', TimerCtrl]);

  app.filter('time', function() {
    return function(ms) {
      var minutes, seconds;
      seconds = Math.floor(ms / 1000);
      minutes = Math.floor(seconds / 60);
      seconds = seconds % 60;
      if (seconds < 10) {
        seconds = "0" + seconds;
      }
      return "" + minutes + ":" + seconds;
    };
  });

}).call(this);
