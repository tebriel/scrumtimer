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

    numberWrap: (lapItem) ->
        if _.isNumber lapItem
            return time: lapItem
        return lapItem

    isLongest: (lapItem) =>
        lapItem = @numberWrap lapItem
        Math.floor(lapItem.time/1000) is Math.floor(@longest().time/1000)

    isShortest: (lapItem) =>
        lapItem = @numberWrap lapItem
        Math.floor(lapItem.time/1000) is Math.floor(@shortest().time/1000)

    average: =>
        return @$scope.totalTime / (@$scope.laps.length+1)

    prepLapArray: =>
        laps = angular.copy(@$scope.laps)
        if @$scope.running
            laps.push time: @$scope.currentTime
        return laps

    longest: =>
        return _.max @prepLapArray(), (lap) -> lap.time

    shortest: =>
        return _.min @prepLapArray(), (lap) -> lap.time

    start: =>
        @startTime = new Date
        @currentStart = new Date
        @timerInterval = @$interval @addTime, TIME_INTERVAL
        @$scope.running = true

        return

    lap: =>
        @$scope.laps.unshift { time: @$scope.currentTime }
        @$scope.currentTime = 0
        @currentStart = new Date

        return

    reset: =>
        @$scope.currentTime = 0
        @$scope.totalTime = 0
        @$scope.running = false
        @$scope.laps = []

        return

    stop: =>
        @lap()
        @$interval.cancel @timerInterval
        @$scope.running = false
        @timerInterval = null

        return

    addTime: =>
        @$scope.currentTime = (new Date) - @currentStart
        @$scope.totalTime = (new Date) - @startTime

        return


app.controller 'timerCtrl', [
    '$scope'
    '$interval'
    TimerCtrl
]

app.filter 'time', ->
        return (ms) ->
            seconds = Math.floor(ms/1000)
            minutes = Math.floor(seconds / 60)
            seconds = seconds % 60
            seconds = "0#{seconds}" if seconds < 10
            return "#{minutes}:#{seconds}"

