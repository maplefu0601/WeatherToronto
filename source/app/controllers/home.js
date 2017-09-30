

angular.module('controllers').controller('HomeController', ['$scope', 'WeatherService', '$window', function ($scope, WeatherService, $window) {


    $scope.unit = {
    	type: 'metric'
    };

    $scope.location = {
    	cityName: 'Toronto',
    	country: 'ca'
    };

    $scope.notFound = false;

    $scope.iconBaseUrl = 'http://openweathermap.org/img/w/';

    $scope.doGetWeather = function() {
    	var cityName = $scope.location.cityName || 'Toronto';
    	var country = $scope.location.country || 'ca';
    	var unit = $scope.unit.type || 'metric';
    	$scope.notFound = false;

    	getWeatherForecast(cityName, country, unit);
    };

    $scope.changeUnit = function(type) {
    	$scope.unit.type = type==='metric'?'imperial':'metric';
    };

    function getWeatherForecast(cityName, country, unit) {
    	WeatherService.getWeather(cityName, country, unit).then(function(data) {
    		//console.log(data);

    		if(data.cod === '200') {
    			
    			$scope.location.cityName = data.city.name;
    			renderWeather(data.list);
    		} else {
    			$scope.notFound = true;
    		}
    	}).catch(function(reason) {
    		//console.log(reason);
    		$scope.notFound = true;
    		$scope.error = reason;
    	});
    }

    function renderWeather(data) {
    	$scope.weatherData = data;
    	console.log($scope.weatherData);
    }


}]);