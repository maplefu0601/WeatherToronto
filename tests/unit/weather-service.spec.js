describe('weather service', function () {

    var service;
    var httpBackend, getRequestHandler;
    var $scope = {};
    $scope.unit = {
        type: 'metric'
    };

    $scope.location = {
        cityName: 'Toronto',
        country: 'ca'
    };
    var apiKey = '8caa3a62ba1f3b52d931888f38d1bc75';
    var apiUrl = 'http://api.openweathermap.org/data/2.5/forecast/daily?q=Toronto&appid='+apiKey;

    beforeEach(module('services'));

    beforeEach(inject(function (WeatherService, $httpBackend) {
        service = WeatherService;
        httpBackend = $httpBackend;
        getRequestHandler = httpBackend.when('GET', apiUrl).respond({"city":{"name":"Toronto"},"list":[{},{}]});
    }));

    afterEach(function() {
        httpBackend.verifyNoOutstandingRequest();
        httpBackend.verifyNoOutstandingExpectation();
    });

    describe('method getWeather', function() {

        it('should return json format data as expected', function (done) {

            //httpBackend.when('GET', apiUrl).respond({"city":{"name":"Toronto"},"list":[{},{}]});
            httpBackend.expectGET(apiUrl);

            service.getWeather($scope.location.cityName, $scope.location.country, $scope.unit.type).then(function (data) {
                expect(data.city.name).toEqual('Toronto');
                done();
            });
            httpBackend.flush();



        });

        it('returns 404 correctly', function (done) {

            httpBackend.when('GET', apiUrl).respond(404);

            service.getWeather($scope.location.cityName, $scope.location.country, $scope.unit.type).catch(function (err) {
                expect(err).toEqual('not found');
                done();
            });

            httpBackend.flush();

        });

    });

});