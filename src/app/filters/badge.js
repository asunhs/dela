

/* @ngInject */
function BadgeFilter() {
    return function (num) {
        if (num < 1000) {
            return "" + num;
        } else {
            return '999+';
        }
    };
}

require('DelaApp').filter('badge', BadgeFilter);