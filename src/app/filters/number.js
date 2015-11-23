

/* @ngInject */
function NumberFilter() {
    return function (num) {
        var tokens = [];

        while (num > 999) {
            tokens.push(num % 1000);
            num = ~~(num / 1000);
        }
        tokens.push(num);

        return tokens.reverse().join(',');
    };
}

require('DelaApp').filter('number', NumberFilter);