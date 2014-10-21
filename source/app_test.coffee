describe "App Test", ->
    beforeEach module 'scrumtimer'
    beforeEach inject (@$controller, @$rootScope) ->
        @$scope = @$rootScope.$new()
        @timerCtrl = @$controller 'timerCtrl', {@$scope}

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

    it "Should determine if the input is longest", ->
        @$scope.currentTime = 0
        @$scope.laps.push time:10000
        expect(@$scope.isLongest time:10000).toBe true
        expect(@$scope.isLongest time:5000).toBe false
        expect(@$scope.isLongest 10000).toBe true

    it "Should determine if the input is shortest", ->
        @$scope.currentTime = 20000
        @$scope.laps.push time:10000
        expect(@$scope.isShortest time:15000).toBe false
        expect(@$scope.isShortest time:10000).toBe true
        expect(@$scope.isShortest 10000).toBe true


