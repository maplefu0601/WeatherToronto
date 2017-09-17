
var apiKey = '8caa3a62ba1f3b52d931888f38d1bc75';
var apiUrl = 'http://api.openweathermap.org/data/2.5/forecast';
angular.module('services').factory('WeatherService', ['$http', '$q', function ($http, $q) {

    return {

        getWeather: function(cityName, country, unit) {

            var deferred = $q.defer();

            $http.get(apiUrl+'/daily?q='+cityName+','+country+'&cnt=5&units='+unit+'&appid='+apiKey).success(function (data) {

                deferred.resolve(data);

            }).error(function () {

                deferred.reject("not found");

            });

            return deferred.promise;
        }

    };

}]);