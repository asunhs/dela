var snowy = [13, 14, 15, 16, 41, 42, 43, 46];

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
function DelaSvc(JSONPSvc, CountSvc, Cards, StoreSvc, FirebaseSvc) {

    this.getMenus = getMenus;
    this.getCards = getCards;
    this.getCounts = getCounts;

    function getMenus() {
        // return JSONPSvc.request(DELA_URL + 'menus').then(afterGetMenus);
        return FirebaseSvc.getJamsilMenu().then(function (data) {
            Cards.list = data.menus;
            Cards.time = data.time;

            return Cards;
        });
    }



    function getMenuHash(cards) {
        return CryptoJS.SHA1(cards.map(function (card) {
            return card.keyCode;
        }).join('')).toString();
    }

    function afterGetMenus(data) {
        Cards.list = getCards(data.menus);
        Cards.hash = data.menuHash; // getMenuHash(Cards.list);
        Cards.time = data.menuTime;
        StoreSvc.storeMenuHash(Cards.hash);
        getCounts();
        return Cards;
    }

    function getCards(menus) {
        return _.map(menus, function (menu) {
            return new Card(menu);
        });
    }



    function getCounts() {
        CountSvc.counts(Cards.list.map(function (card) {
            return card.keyCode;
        }), true);
    }
}


/* @ngInject */
function DelaCtrl($document, $scope, DelaSvc, YahooWeatherAPI, StockSvc, FirebaseSvc) {

    DelaSvc.getMenus().then(function (cards) {
        $scope.menus = cards.list;
        $scope.time = cards.time;
    });

    $scope.orderFactor = ['', 'cal', 'price'];
    $scope.orderName = ['Place', 'Calories', 'Price'];
    $scope.orderIndex = 0;

    YahooWeatherAPI.getWeather().then(function (info) {
        try {
            $scope.weatherImg = 'http://l.yimg.com/a/i/us/we/52/' + info.code + '.gif';
            $scope.weatherText = info.text;
            $scope.weatherTemperature = parseInt(info.temp);
            $scope.weatherPosition = "서울특별시 송파구 잠실동";
            $scope.weatherRcode = info.woeid;

            if (_.find(snowy, info.code)) {
                $document.find('body').letItSnow();
            }
        } catch (e) {
            // do not anything
        }
    });

    StockSvc.getSDS().then(function (stock) {
        $scope.sdsStockSymbol = stock.symbol;
        $scope.sdsStockName = stock.Name;
        $scope.sdsStockPrice = stock.Bid || stock.LastTradePriceOnly;
        $scope.sdsStockChange = stock.Change;
        $scope.sdsStockChangeinPercent = stock.ChangeinPercent;
        $scope.sdsStockState = stock.Change[0] == '+' ? 'red' : stock.Change[0] == '-' ? 'blue' : '';
        /* $scope.sdsStockCurrency = stock.Currency; */
    });

    function toggleOrder() {
        $scope.orderIndex = ($scope.orderIndex + 1) % 3;
    }

    $scope.toggleOrder = toggleOrder;
}


require('DelaApp').service('DelaSvc', DelaSvc).controller('DelaCtrl', DelaCtrl).value('Cards', {}).run(/* @ngInject */ function ($document, $interval) {

    $interval(function () {
        var footerSlide = $document.find('.footer a.slide');

        if (footerSlide.hasClass('out')) {
            footerSlide.removeClass('out');
        } else {
            footerSlide.addClass('out');
        }
    }, 5000);
});
