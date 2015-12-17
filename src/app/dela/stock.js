

var url = 'https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20yahoo.finance.quotes%20where%20symbol%20in%20(%22018260.ks%22)%0A%09%09&format=json&diagnostics=true&env=http%3A%2F%2Fdatatables.org%2Falltables.env&callback=JSON_CALLBACK';

/* @ngInject */
function StockSvc ($http) {
    
    function getSDS() {
        return $http.jsonp(url).then(function (res) {
            return res.data.query && res.data.query.results && res.data.query.results.quote;
        });
    }
    
    this.getSDS = getSDS;
}

require('DelaApp').service('StockSvc', StockSvc);