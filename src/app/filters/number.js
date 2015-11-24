

function zeroLPad(n) {
    var str = '' + n;
    return '000'.substr(str.length) + str;
}


/* @ngInject */
function NumberFilter() {
    return function (num) {
        var tokens = [];

        while (num > 999) {
            tokens.push(zeroLPad(num % 1000));
            num = ~~(num / 1000);
        }
        tokens.push(num);

        return tokens.reverse().join(',');
    };
}

require('DelaApp').filter('number', NumberFilter);