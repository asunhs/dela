

function zeroLPad(n) {
    var str = '' + n;
    return '000'.substr(str.length) + str;
}

function currency(num) {
    var tokens = [];

    while (num > 999) {
        tokens.push(zeroLPad(num % 1000));
        num = ~~(num / 1000);
    }
    tokens.push(num);

    return tokens.reverse().join(',');
}


/* @ngInject */
function NumberFilter() {
    return currency;
}

require('DelaApp').filter('number', NumberFilter);


var PRICE = /([+-]?)([0-9]+)(\.[0-9]*)/;

/* @ngInject */
function KoreanStock() {
    return function (price) {
        var tokens = price.match(PRICE);
        
        return tokens[1] + currency(tokens[2]);
    }
}

require('DelaApp').filter('kstock', KoreanStock);