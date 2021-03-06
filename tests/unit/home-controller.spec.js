describe('HomeController', function() {
	var httpBackend, $rootScope, createController, getRequestHandler, serviceMock, homeController;
	var scope;

	beforeEach(module('controllers'));

	beforeEach(function() {
		serviceMock = {
			getWeather: function(cityName, country, unit) {return 1;}
		};
		spyOn(serviceMock, 'getWeather').and.returnValue(1);
	});

	beforeEach(inject(function($injector, $rootScope) {

		httpBackend = $injector.get('$httpBackend');
		getRequestHandler = httpBackend.when('GET', apiUrl).respond({"city":{"name":"Toronto"},"list":[{},{}]});
		$rootScope = $injector.get('$rootScope');

		var $controller = $injector.get('$controller');
		scope = $rootScope.$new();
		homeController = $controller('HomeController', {
			$scope: scope,
			WeatherService: serviceMock
		});

		scope.unit = {
        	type: 'metric'
	    };

	    scope.location = {
	        cityName: 'Toronto',
	        country: 'ca'
	    };

		createController = function() {
			return $controller('HomeController', {'$scope': $rootScope });
		};
	}));

	afterEach(function() {
		httpBackend.verifyNoOutstandingExpectation();
		httpBackend.verifyNoOutstandingRequest();
	});

	it('should call getWeatherForecast', function() {
		//spyOn(serviceMock, 'getWeather').andCallThrough();
		var getWeatherForecast = function(cityName, country, unit) {};
		//scope.doGetWeather();
		expect(scope.notFound).toBe(false);
		//expect(serviceMock.getWeather).hasBeenCalled();
	});

	it('should change temperature unit', function() {
		scope.unit.type = 'metric';
		scope.changeUnit('metric');
		expect(scope.unit.type).toBe('imperial');
	});


});