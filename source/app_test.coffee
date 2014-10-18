describe "App Test", ->
    beforeEach module 'scrumtimer'
    beforeEach inject (@$controller, @$rootScope) ->
        @$scope = @$rootScope.$new()
        @timerCtrl = @$controller 'timerCtrl', {@$scope}

    describe 'TimerCtrl', ->
        it "Should make me a controller", ->
            expect(@$scope.start).toEqual jasmine.any(Function)

        it "Should add a lap when lap is called", ->
            @$scope.start()
            @$scope.lap()
            expect(@$scope.laps.length).toEqual 1

        it "Should merge two laps together", ->
            @$scope.start()
            @$scope.lap()
            @$scope.lap()
            expect(@$scope.laps.length).toEqual 2
            # Bump it by 2 seconds
            @$scope.laps[1].time += 2000
            expectedTime = @$scope.laps[0].time + @$scope.laps[1].time

            @$scope.merge 1
            expect(@$scope.laps.length).toEqual 1

            expect(@$scope.laps[0].time).toEqual expectedTime
