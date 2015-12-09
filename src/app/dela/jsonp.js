
/* @ngInject */
function JSONPSvc($http, LoadingSvc) {

    function request(url, background) {

        if (!!background) {
            return $http.jsonp(url).then(function (res) {
                return res.data;
            });
        }

        var resolver = LoadingSvc.loading();

        return $http.jsonp(url).then(function (res) {
            resolver();
            return res.data;
        }, resolver);
    }

    this.request = request;
}

require('DelaApp').service('JSONPSvc', JSONPSvc);