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
        @$scope.merge = @merge
        @$scope.longest = @longest
        @$scope.shortest = @shortest
        @$scope.average = @average
        @$scope.isLongest = @isLongest
        @$scope.isShortest = @isShortest

        return

    merge: (index) =>
        previous = @$scope.laps[index - 1]
        current = @$scope.laps[index]
        previous.time += current.time
        @$scope.laps = _.without @$scope.laps, current

        return

    isLongest: (lapItem) =>
        Math.floor(lapItem.time/1000) is Math.floor(@longest().time/1000)

    isShortest: (lapItem) =>
        Math.floor(lapItem.time/1000) is Math.floor(@shortest().time/1000)

    average: =>
        return @$scope.totalTime / (@$scope.laps.length+1)

    longest: =>
        return _.max @$scope.laps, (lap) -> lap.time

    shortest: =>
        return _.min @$scope.laps, (lap) -> lap.time

    start: =>
        @timerInterval = @$interval @addTime, TIME_INTERVAL
        @$scope.running = true

        return

    lap: =>
        @$scope.laps.unshift { time: @$scope.currentTime }
        @$scope.currentTime = 0

        return

    reset: =>
        @$scope.currentTime = 0
        @$scope.totalTime = 0
        @$scope.running = false
        @$scope.laps = []

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

app.filter 'time', ->
        return (ms) ->
            return "#{Math.floor(ms/1000)} s"

