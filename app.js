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
    "        <span class=\"zone {{::menu.zoneId}}\">{{::zoneName}}</span>\n" +
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
    "        <div class=\"dela-card-footer\">\n" +
    "            <div class=\"vote\">\n" +
    "                <div class=\"btn btn-good\" ng-click=\"good()\"></div>\n" +
    "                <div class=\"gauge-box\">                    \n" +
    "                    <span class=\"gauge gauge-good\" ng-style=\"{width:likes + '%'}\"><b>{{likes}}%</b></span>\n" +
    "                    <span class=\"gauge gauge-bad\" ng-style=\"{width:dislikes + '%'}\"><b>{{dislikes}}%</b></span>\n" +
    "                </div>\n" +
    "                <div class=\"btn btn-bad\" ng-click=\"bad()\"></div>\n" +
    "            </div>\n" +
    "        </div>\n" +
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


function Count(count) {
    this.keyCode = count.keyCode;
    this.like = parseInt(count.likeCount);
    this.dislike = parseInt(count.dislikeCount);
    this.total = this.like + this.dislike;
}

Count.prototype = {
    getLikeRatio: function () {
        return parseInt((this.like * 10000) / this.total) / 100;
    },
    getDislikeRatio: function () {
        return parseInt((this.dislike * 10000) / this.total) / 100;
    }
};



/* @ngInject */
function CountSvc ($rootScope, JSONPSvc, Counts) {

    function counts(keyCodes) {
        return JSONPSvc.request('counts&keyCodes=' + _.map(keyCodes, function (keyCode) {
            return encodeURIComponent(keyCode);
        }).join(',')).then(function (counts) {
            Counts.list = _.map(counts, function (count) {
                return new Count(count);
            });
            $rootScope.$broadcast('updateCounts', Counts.list);
            return Counts.list;
        });
    }

    function like(card) {
        return JSONPSvc.request('good&keyCode=' + encodeURIComponent(card.keyCode));
    }

    function dislike(card) {
        return JSONPSvc.request('bad&keyCode=' + encodeURIComponent(card.keyCode));
    }
    
    function getCountByKeyCode(keyCode) {
        return _.findWhere(Counts.list, {
            keyCode: keyCode
        });
    }

    this.counts = counts;
    this.like = like;
    this.dislike = dislike;
    this.getCountByKeyCode = getCountByKeyCode;
}
CountSvc.$inject = ["$rootScope", "JSONPSvc", "Counts"];



require('DelaApp').service('CountSvc', CountSvc).value('Counts', {});
},{"DelaApp":"DelaApp"}],3:[function(require,module,exports){


function Card(menu, section, zone) {

    // Zone info
    this.zoneId = zone.zoneId;

    // Section info
    this.sectionId = section.sectionId;
    this.sectionName = _.unescape(section.name);

    // Menu info
    this.keyCode = menu.keyCode;
    this.cal = menu.cal;
    this.en = _.unescape(menu.en);
    this.ko = _.unescape(menu.ko);
    this.price = menu.price;
    this.soldout = menu.soldout;
    this.imgSrc = menu.product ? 'http://sdsfoodmenu.co.kr:9106/foodcourt/menu?menuId=' + menu.product : 'images/no-image.png';
}


/* @ngInject */
function DelaSvc(JSONPSvc, CountSvc, Cards) {

    function getMenus() {
        return JSONPSvc.request('menus');
    }

    function getDummys() {
        return JSONPSvc.request('dummy');
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
    
    function getCounts() {
        CountSvc.counts(Cards.list.map(function (card) {
            return card.keyCode;
        }));
    }

    this.getMenus = getMenus;
    this.getDummys = getDummys;
    this.getCards = getCards;
    this.getCounts = getCounts;
}
DelaSvc.$inject = ["JSONPSvc", "CountSvc", "Cards"];


/* @ngInject */
function DelaCtrl($scope, $location, DelaSvc, Cards) {
    
    var searchObject = $location.search();
    
    (searchObject.dummy ? DelaSvc.getDummys() : DelaSvc.getMenus()).then(DelaSvc.getCards).then(function (cards) {
        $scope.menus = Cards.list = cards;
        DelaSvc.getCounts();
    });

    $scope.orderFactor = ['', 'cal', 'price'];
    $scope.orderName = ['Place', 'Calories', 'Price'];
    $scope.orderIndex = 0;
    
    function toggleOrder() {
        $scope.orderIndex = ($scope.orderIndex + 1) % 3;
    }

    $scope.toggleOrder = toggleOrder;
}
DelaCtrl.$inject = ["$scope", "$location", "DelaSvc", "Cards"];


require('DelaApp').service('DelaSvc', DelaSvc).controller('DelaCtrl', DelaCtrl).value('Cards', {});
},{"DelaApp":"DelaApp"}],4:[function(require,module,exports){

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


function getZoneName(zoneId) {
    switch (zoneId) {
        case 'ZONE01':
            return 'B1F';
        case 'ZONE02':
            return 'B2F';
        default:
            return '';
    }
}

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
    if (price == 5500) {
        return 2500;
    }
    return price - 2500;
}



/* @ngInject */
function CardDirective(CountSvc, DelaSvc) {
    
    return {
        restrict: 'E',
        templateUrl: 'dela/delaCard.tpl.html',
        scope: true,
        replace: true,
        link: function (scope) {
            
            var menu = scope.menu,
                calories = numberify(menu.cal),
                price = numberify(menu.price);
            
            scope.zoneName = getZoneName(menu.zoneId);
            scope.calories = calories;
            scope.calLevel = caloriesLevel(calories);
            scope.calLabel = CAL_LABEL[scope.calLevel];
            scope.price = price;
            scope.discounted = discount(price);
            
            scope.$on('updateCounts', function () {
                var count = CountSvc.getCountByKeyCode(menu.keyCode);
                
                if (count) {
                    scope.likes = count.getLikeRatio();
                    scope.dislikes = count.getDislikeRatio();
                } else {
                    scope.likes = 0;
                    scope.dislikes = 0;
                }
            });
            
            scope.toggle = function () {
                scope.unfold = !scope.unfold;
            };
            
            scope.good = function () {
                CountSvc.like(menu).then(function () {
                    DelaSvc.getCounts();
                });
            };

            scope.bad = function () {
                CountSvc.dislike(menu).then(function () {
                    DelaSvc.getCounts();
                });
            };
        }
    };
}
CardDirective.$inject = ["CountSvc", "DelaSvc"];


require('DelaApp').directive('delaCard', CardDirective);
},{"DelaApp":"DelaApp"}],5:[function(require,module,exports){

var JSONP_URL = 'https://script.google.com/macros/s/AKfycbxFhifcCIQst4i75OPBiPVwYwv154Si2woBJRTYBuxd817FrFeO/exec?callback=JSON_CALLBACK&action=';

/* @ngInject */
function JSONPSvc($http, LoadingSvc) {

    function request(url) {
        var resolver = LoadingSvc.loading();
        return $http.jsonp(JSONP_URL + url).then(function (res) {
            resolver();
            return res.data;
        }, resolver);
    }
    
    this.request = request;
}
JSONPSvc.$inject = ["$http", "LoadingSvc"];

require('DelaApp').service('JSONPSvc', JSONPSvc);
},{"DelaApp":"DelaApp"}],6:[function(require,module,exports){

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
},{"DelaApp":"DelaApp"}],7:[function(require,module,exports){


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
},{"DelaApp":"DelaApp"}]},{},["DelaApp",2,3,4,5,6,7,1]);
