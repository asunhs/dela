var PRICE = /([+-]?)([0-9]+)(\.[0-9]*)/;

/* @ngInject */
function Unescape($filter) {
    return _.unescape;
}

require('DelaApp').filter('unescape', Unescape);
