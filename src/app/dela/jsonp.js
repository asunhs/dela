
var JSONP_URL = 'https://script.google.com/macros/s/AKfycbxFhifcCIQst4i75OPBiPVwYwv154Si2woBJRTYBuxd817FrFeO/exec?callback=JSON_CALLBACK&action=';

/* @ngInject */
function JSONPSvc($http, LoadingSvc) {

    function request(url) {
        var resolver = LoadingSvc.loading();
        return $http.jsonp(JSONP_URL + url).then(function (res) {
            resolver();
            return res.data;
        }, resolver);
    }
    
    this.request = request;
}

require('DelaApp').service('JSONPSvc', JSONPSvc);