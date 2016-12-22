
var WEST_CAMPUS = 'https://script.google.com/macros/s/AKfycbyJ_LVJvLMYQEYyycw0yJkZj6mbuEGQkjMuZEEq3ZiUl4IFB5lx/exec?lat=37.518142&lng=127.10065';

/* @ngInject */
function NaverWeatherAPI($q) {

    function getWeather() {
        return $q.reject();

        // return $http.jsonp(WEST_CAMPUS + '&callback=JSON_CALLBACK').then(function (res) {
        //     return res.data.result;
        // });
    }

    this.getWeather = getWeather;

}



angular.module('naver-weather', []).service('NaverWeatherAPI', NaverWeatherAPI);
