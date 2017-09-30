angular.module('lists', []).directive('weatherList', function () {

    return {
        restrict: 'E',
        link: function(scope, element, attrs) {
        	
        	scope.getIconUrl = function(iconName) {
	        	return (iconName ? 'http://openweathermap.org/img/w/' + iconName + '.png' : '');
	        };

        	scope.parseDate = function(time) {
          		return new Date(time * 1000);
        	};

        	scope.calByUnit = function(val) {
        		return scope.unit.type==='metric'?val+'°C' : Math.round((val*1.8+32)*100)/100+'°F';
        	};
        },
        scope: {
            data: '=',
            unit: '=',
            changeunit: '&changeUnit'
        },
        
        templateUrl: 'views/weather-list.html'
    };

});
