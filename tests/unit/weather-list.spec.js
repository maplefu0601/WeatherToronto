describe('directive weather lists', function() {

    var $compile;
    var $scope, directiveElement;

    beforeEach(module('lists'));

    beforeEach(inject(function(_$compile_, _$rootScope_) {
        $compile = _$compile_;
        $scope = _$rootScope_.$new();
        $scope.data = [{},{}];
        $scope.unit = {type: 'metric'};
        $scope.changeUnit = function() {};

        directiveElement = getCompiledElement();
    }));

    function getCompiledElement() {
        var compiledDirective = compile(angular.element("<weather-list ng-hide='notFound' ng-repeat='data in weatherData' data='data' unit='unit' changeUnit='changeUnit(type)'')></weather-list>"))($scope);
        $scope.$digest();
        return compiledDirective;
    };

    it('should add weather-list elements', function() {
        var element = $compile(angular.element('<weather-list></weather-list>'))($scope);
        $scope.$digest();
        expect(element.html()).not.toEqual('');
    });

    it('should effect to scope.unit,type when changing unit', function() {
        var isolatedScope = directiveElement.isolatedScope();
        isolatedScope.unit = 'imperial';
        expect($scope.unit.type).toEqual('imperial');
    });

    it('should changeUnit be a function', function() {
        var isolatedScope = directiveElement.isolatedScope();
        isolatedScope.changeUnit();
        expect($scope.changeUnit).toHaveBeenCalled();
    });

});