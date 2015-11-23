

/* @ngInject */
function CardDirective() {
    return {
        restrict: 'E',
        templateUrl: 'dela/delaCard.tpl.html',
        link: function (scope, element, attrs) {
            
        }
    };
}


require('DelaApp').directive('delaCard', CardDirective);