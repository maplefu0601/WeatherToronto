describe('directive weather lists', function() {

    var $compile;
    var $scope, element, isolatedScope, directiveElement;

    beforeEach(module('lists'));
    // beforeEach(inject(function($compile, $rootScope) {
    //     scope = $rootScope;
    //     element = angular.element("<weather-list ng-hide='notFound' ng-repeat='data in weatherData' data='data' unit='unit' changeUnit='changeUnit(type)'')>test</weather-list>");
    //     var eme = $compile(element)($rootScope);

    //     scope.$digest();
    //     isolatedScope = eme.isolatedScope;
    // }));
    beforeEach(inject(function(_$compile_, $rootScope) {
        $compile = _$compile_;
        $scope = $rootScope.$new();
        $scope.data = [{},{}];
        $scope.unit = {type: 'metric'};
        $scope.changeUnit = function() {};

        directiveElement = getCompiledElement();
    }));

    function getCompiledElement() {
        // var compiledDirective = $compile(angular.element("<weather-list ng-hide='notFound' ng-repeat='data in weatherData' data='data' unit='unit' changeUnit='changeUnit(type)'')></weather-list>"))($scope);
        // $scope.$digest();
        // return compiledDirective;
    };

    xit('should add weather-list elements', function() {
        var element = $compile(angular.element('<weather-list>test</weather-list>'))($scope);
        $scope.$digest();
        expect(element.html()).toContain('test');
    });

    xit('should effect to scope.unit.type when changing unit', function() {
        var isolatedScope = directiveElement.isolatedScope();
        isolatedScope.unit = 'imperial';
        expect($scope.unit.type).toEqual('imperial');
    });

    xit('should changeUnit be a function', function() {
        var isolatedScope = directiveElement.isolatedScope();
        isolatedScope.changeUnit();
        expect($scope.changeUnit).toHaveBeenCalled();
    });

});