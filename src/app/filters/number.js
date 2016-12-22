var PRICE = /([+-]?)([0-9]+)(\.[0-9]*)/;

/* @ngInject */
function KoreanStock($filter) {
    var numberFilter = $filter('number');
    return function (price) {
        var tokens = price.match(PRICE);
        return tokens[1] + numberFilter(tokens[2]);
    }
}

require('DelaApp').filter('kstock', KoreanStock);