
var CAL_LEVEL = {
    'SUPER_HIGH' : 'high',
    'HIGH' : 'high',
    'NORMAL' : 'normal',
    'LOW' : 'low',
    'SUPER_LOW' : 'low'
};

function numberify(str) {
    return str.replace(/\D/g, '');
}

function caloriesLevel(calories) {
    if (calories > 900) {
        return CAL_LEVEL.SUPER_HIGH;
    } else if (calories > 850) {
        return CAL_LEVEL.HIGH;
    } else if (calories < 600) {
        return CAL_LEVEL.SUPER_LOW;
    } else if (calories < 650) {
        return CAL_LEVEL.LOW;
    } else {
        return CAL_LEVEL.NORMAL;
    }
}

function discount(price) {
    if (price = 5500) {
        return 2500;
    }
    return price - 2500;
}



/* @ngInject */
function CardDirective() {
    return {
        restrict: 'E',
        templateUrl: 'dela/delaCard.tpl.html',
        scope: true,
        link: function (scope) {
            
            var menu = scope.menu,
                calories = numberify(menu.cal),
                price = numberify(menu.price);
            
            scope.calories = calories;
            scope.calLevel = caloriesLevel(calories);
            scope.price = price;
            scope.discounted = discount(price);
        }
    };
}


require('DelaApp').directive('delaCard', CardDirective);