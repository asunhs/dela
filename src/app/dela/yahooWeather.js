var WOEID = "22336060";
var WEST_CAMPUS = "https://query.yahooapis.com/v1/public/yql?q=select%20item.condition%20from%20weather.forecast%20where%20woeid%20%3D%20" + WOEID + "%20and%20u%20%3D%27c%27&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys";

/* @ngInject */
function YahooWeatherAPI($http) {

    function getWeather() {
        return $http.jsonp(WEST_CAMPUS + '&callback=JSON_CALLBACK').then(function (res) {
            try {
                return _.extend({
                    woeid: WOEID
                }, res.data.query.results.channel.item.condition);
            } catch (e) {
                return null;
            }
        });
    }

    this.getWeather = getWeather;

}



angular.module('yahoo-weather', []).service('YahooWeatherAPI', YahooWeatherAPI);
