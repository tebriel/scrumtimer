app = angular.module 'scrumtimer', ['ui.bootstrap']

class TimerCtrl
    TIME_INTERVAL = 250
    constructor: (@$scope, @$interval) ->

        @reset()
        @bindScope()

        return

    bindScope: ->
        @$scope.start = @start
        @$scope.stop = @stop
        @$scope.lap = @lap
        @$scope.reset = @reset

    start: =>
        @timerInterval = @$interval @addTime, TIME_INTERVAL
        @$scope.running = true

        return

    lap: =>
        @$scope.currentTime = 0

        return

    reset: =>
        @$scope.currentTime = 0
        @$scope.totalTime = 0
        @$scope.running = false

        return

    stop: =>
        @$interval.cancel @timerInterval
        @$scope.running = false
        @timerInterval = null

        return

    addTime: =>
        @$scope.currentTime += TIME_INTERVAL
        @$scope.totalTime += TIME_INTERVAL

        return


app.controller 'timerCtrl', [
    '$scope'
    '$interval'
    TimerCtrl
]
