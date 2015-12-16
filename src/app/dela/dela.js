

function Card(menu) {

    // Zone info
    this.zoneId = menu.zoneId;

    // Section info
    this.sectionId = menu.sectionId;
    this.sectionName = _.unescape(menu.sectionName);

    // Menu info
    this.keyCode = menu.keyCode;
    this.cal = menu.cal;
    this.en = _.unescape(menu.en);
    this.ko = _.unescape(menu.ko);
    this.price = menu.price;
    this.soldout = menu.soldout;
    this.imgSrc = menu.product ? 'http://sdsfoodmenu.co.kr:9106/foodcourt/menu?menuId=' + menu.product : 'images/no-image.png';
}

var DELA_URL = 'https://script.google.com/macros/s/AKfycbxFhifcCIQst4i75OPBiPVwYwv154Si2woBJRTYBuxd817FrFeO/exec?callback=JSON_CALLBACK&action=';

/* @ngInject */
function DelaSvc(JSONPSvc, CountSvc, Cards, StoreSvc) {

    function getMenus() {
        return JSONPSvc.request(DELA_URL + 'menus').then(afterGetMenus);
    }

    function getDummys() {
        return JSONPSvc.request(DELA_URL + 'dummy').then(afterGetMenus);
    }

    function getMenuHash(cards) {
        return CryptoJS.SHA1(cards.map(function (card) {
            return card.keyCode;
        }).join('')).toString();
    }

    function afterGetMenus(data) {
        Cards.list = getCards(data.menus);
        Cards.hash = data.menuHash; // getMenuHash(Cards.list);
        StoreSvc.storeMenuHash(Cards.hash);
        getCounts(true);
        return Cards.list;
    }

    function getCards(menus) {
        return _.map(menus, function (menu) {
            return new Card(menu);
        });
    }



    function getCounts(background) {
        CountSvc.counts(Cards.list.map(function (card) {
            return card.keyCode;
        }), background);
    }

    this.getMenus = getMenus;
    this.getDummys = getDummys;
    this.getCards = getCards;
    this.getCounts = getCounts;
    this.getMenuHash = getMenuHash;
}


/* @ngInject */
function DelaCtrl($scope, $location, DelaSvc, NaverWeatherAPI) {

    var searchObject = $location.search();

    (searchObject.dummy ? DelaSvc.getDummys() : DelaSvc.getMenus()).then(function (cards) {
        $scope.menus = cards;
    });

    $scope.orderFactor = ['', 'cal', 'price'];
    $scope.orderName = ['Place', 'Calories', 'Price'];
    $scope.orderIndex = 0;

    NaverWeatherAPI.getWeather().then(function (info) {
        try {
            
            
            $scope.weatherImg = info.weather.iconURL;
            $scope.weatherText = info.weather.weatherText;
            $scope.weatherTemperature = parseInt(info.weather.temperature);
            $scope.weatherPosition = [info.region.doName, info.region.siName, info.region.dongName].join(' ');
            $scope.weatherRcode = info.region.rcode;
        } catch (e) {
            // do not anything
        }
    });

    function toggleOrder() {
        $scope.orderIndex = ($scope.orderIndex + 1) % 3;
    }

    $scope.toggleOrder = toggleOrder;
}


require('DelaApp').service('DelaSvc', DelaSvc).controller('DelaCtrl', DelaCtrl).value('Cards', {}).run(/* @ngInject */ function ($document) {
    var $window = angular.element(window),
        $body = $document.find('body');

    function handler() {
        var pos = $body.prop('scrollTop') + $window.height() - $body.prop('scrollHeight') + 135;

        if (pos >= 0) {
            $body.addClass('expand');
        } else {
            $body.removeClass('expand');
        }
    }

    $window.scroll(handler);
});