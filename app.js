require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"DelaApp":[function(require,module,exports){
module.exports = angular.module('DelaApp', [
    'templates-html',
    'ngTouch'
]).config(/* @ngInject */ ["$compileProvider", "$httpProvider", function ($compileProvider, $httpProvider) {
    $compileProvider.debugInfoEnabled(false);
    $httpProvider.useApplyAsync(true);
}]);
},{}],1:[function(require,module,exports){
angular.module('templates-html', ['dela/delaCard.tpl.html', 'dela/loading.tpl.html']);

angular.module("dela/delaCard.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("dela/delaCard.tpl.html",
    "<div class=\"dela-card\" ng-class=\"{fold:!unfold}\">\n" +
    "    <div class=\"dela-card-header\">\n" +
    "        <span class=\"cal-level {{::calLevel}}\">{{::calLabel}}</span>\n" +
    "    </div>\n" +
    "    <div class=\"dela-card-content\">\n" +
    "        <img ng-src=\"{{::menu.imgSrc}}\" alt=\"{{::menu.en}}\" />\n" +
    "        <div class=\"dela-card-section {{::menu.sectionId}}\">\n" +
    "            {{::menu.sectionName}}\n" +
    "        </div>\n" +
    "        <div class=\"dela-card-menu\" ng-click=\"toggle()\">\n" +
    "            <p><span class=\"title-ko\">{{::menu.ko}}</span></p>\n" +
    "            <p><span class=\"title-en\">{{::menu.en}}</span></p>\n" +
    "            <p>{{::calories | number}} kcal</p>\n" +
    "            <p ng-if=\"!menu.soldout\"><span class=\"price\">{{::price | number}} 원</span> <span class=\"discounted\">({{::discounted | number}} 원)</span></p>\n" +
    "            <p ng-if=\"menu.soldout\"><span class=\"soldout\">SOLD OUT</span></p>\n" +
    "        </div>\n" +
    "\n" +
    "        <!--<div class=\"dela-card-footer\"> \n" +
    "            <div class=\"gauge\">\n" +
    "                <div class=\"good\">50.0%</div>\n" +
    "                <div class=\"bad\">50.0%</div>\n" +
    "            </div>\n" +
    "            <span class=\"btn good\" ng-click=\"good()\">Good</span>\n" +
    "            <span class=\"btn bad\" ng-click=\"bad()\">Bad</span>\n" +
    "        </div>-->\n" +
    "    </div>\n" +
    "</div>");
}]);

angular.module("dela/loading.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("dela/loading.tpl.html",
    "<div class=\"loading-wrap\">\n" +
    "    <img src=\"images/loading_apple.gif\" alt=\"loading\" />\n" +
    "</div>");
}]);

},{}],2:[function(require,module,exports){


function Card(menu, section, zone) {

    // Zone info
    this.zoneId = zone.zoneId;

    // Section info
    this.sectionId = section.sectionId;
    this.sectionName = _.unescape(section.name);

    // Menu info
    this.cal = menu.cal;
    this.en = _.unescape(menu.en);
    this.ko = _.unescape(menu.ko);
    this.price = menu.price;
    this.soldout = menu.soldout;
    this.imgSrc = menu.product ? 'http://sdsfoodmenu.co.kr:9106/foodcourt/menu?menuId=' + menu.product : null;
}

var JSONP_URL = 'https://script.google.com/macros/s/AKfycbxFhifcCIQst4i75OPBiPVwYwv154Si2woBJRTYBuxd817FrFeO/exec?callback=JSON_CALLBACK&action=';


/* @ngInject */
function DelaSvc(JSONPSvc) {

    function getMenus() {
        return JSONPSvc.request(JSONP_URL + 'menus');
    }

    function getDummys() {
        return JSONPSvc.request(JSONP_URL + 'dummy');
    }

    function newCard(section, zone) {
        return _.map(section.menus, function (menu) {
            return new Card(menu, section, zone);
        });
    }

    function flatten(zones) {
        var cardSet = [];

        _.each(zones, function (zone) {
            cardSet.push(_.map(zone.sections, function (section) {
                return newCard(section, zone);
            }));
        });

        return _.flatten(cardSet);
    }

    function getCards(menus) {
        return flatten(menus);
    }

    function like(card) {
        return JSONPSvc.request(JSONP_URL + 'good&name=' + card.ko);
    }

    function dislike(card) {
        return JSONPSvc.request(JSONP_URL + 'bad&name=' + card.ko);
    }

    this.getMenus = getMenus;
    this.getDummys = getDummys;
    this.getCards = getCards;
    this.like = like;
    this.dislike = dislike;
}
DelaSvc.$inject = ["JSONPSvc"];


/* @ngInject */
function DelaCtrl($scope, $location, DelaSvc) {
    
    var searchObject = $location.search();
    
    (searchObject.dummy ? DelaSvc.getDummys() : DelaSvc.getMenus()).then(DelaSvc.getCards).then(function (cards) {
        $scope.menus = cards;
    });
}
DelaCtrl.$inject = ["$scope", "$location", "DelaSvc"];


require('DelaApp').service('DelaSvc', DelaSvc).controller('DelaCtrl', DelaCtrl);
},{"DelaApp":"DelaApp"}],3:[function(require,module,exports){

var CAL_LEVEL = {
        'SUPER_HIGH': 'super-high',
        'HIGH': 'high',
        'NORMAL': 'normal',
        'LOW': 'low',
        'SUPER_LOW': 'super-low'
    },
    CAL_LABEL = {
        'super-high': '초고칼로리',
        'high': '고칼로리',
        'normal': '표준칼로리',
        'low': '저칼로리',
        'super-low': '초저칼로리'
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
function CardDirective(DelaSvc) {
    return {
        restrict: 'E',
        templateUrl: 'dela/delaCard.tpl.html',
        scope: true,
        replace: true,
        link: function (scope) {
            
            var menu = scope.menu,
                calories = numberify(menu.cal),
                price = numberify(menu.price);
            
            scope.calories = calories;
            scope.calLevel = caloriesLevel(calories);
            scope.calLabel = CAL_LABEL[scope.calLevel];
            scope.price = price;
            scope.discounted = discount(price);
            
            scope.toggle = function () {
                scope.unfold = !scope.unfold;
            };
            
            scope.good = function () {
                DelaSvc.like(menu).then(function (message) {
                    alert(message.join(' '));
                });
            };

            scope.bad = function () {
                DelaSvc.dislike(menu).then(function (message) {
                    alert(message.join(' '));
                });
            };
        }
    };
}
CardDirective.$inject = ["DelaSvc"];


require('DelaApp').directive('delaCard', CardDirective);
},{"DelaApp":"DelaApp"}],4:[function(require,module,exports){

/* @ngInject */
function JSONPSvc($http, LoadingSvc) {

    function request(url) {
        var resolver = LoadingSvc.loading();
        return $http.jsonp(url).then(function (res) {
            resolver();
            return res.data;
        }, resolver);
    }
    
    this.request = request;
}
JSONPSvc.$inject = ["$http", "LoadingSvc"];

require('DelaApp').service('JSONPSvc', JSONPSvc);
},{"DelaApp":"DelaApp"}],5:[function(require,module,exports){

/* @ngInject */
function LoadingSvc($templateCache, $q) {
    
    var loadingTemplate = $templateCache.get('dela/loading.tpl.html'),
        element = angular.element(loadingTemplate);
    
    function loading() {
        
        var defer = $q.defer();
        
        element.appendTo('body');
        
        defer.promise.then(function () {
            element.remove();
        });
        
        return function () {
            defer.resolve();
        };
    }
    
    this.loading = loading;
}
LoadingSvc.$inject = ["$templateCache", "$q"];

require('DelaApp').service('LoadingSvc', LoadingSvc);
},{"DelaApp":"DelaApp"}],6:[function(require,module,exports){


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
},{"DelaApp":"DelaApp"}]},{},["DelaApp",2,3,4,5,6,1]);
