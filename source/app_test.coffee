describe "App Test", ->
    beforeEach module 'scrumtimer'
    beforeEach inject (@$controller, @$rootScope) ->
        @$scope = @$rootScope.$new()

    describe 'TimerCtrl', ->
        it "Should make me a controller", ->
            timerCtrl = @$controller 'timerCtrl', {@$scope}
            expect(@$scope.start).toEqual jasmine.any(Function)
