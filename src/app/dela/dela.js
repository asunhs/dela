

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
    this.imgSrc = menu.product ? 'http://sdsfoodmenu.co.kr:9106/foodcourt/menu?menuId=' + menu.product : 'http://sdsfoodmenu.co.kr:9106/foodcourt/img/food_sold_out_01_01.png';
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
        return JSONPSvc.request(JSONP_URL + 'good&keyCode=' + encodeURIComponent(card.keyCode));
    }

    function dislike(card) {
        return JSONPSvc.request(JSONP_URL + 'bad&keyCode=' + encodeURIComponent(card.keyCode));
    }

    this.getMenus = getMenus;
    this.getDummys = getDummys;
    this.getCards = getCards;
    this.like = like;
    this.dislike = dislike;
}


/* @ngInject */
function DelaCtrl($scope, $location, DelaSvc) {
    
    var searchObject = $location.search();
    
    (searchObject.dummy ? DelaSvc.getDummys() : DelaSvc.getMenus()).then(DelaSvc.getCards).then(function (cards) {
        $scope.menus = cards;
    });

    $scope.orderFactor = ['', 'cal', 'price'];
    $scope.orderName = ['Place', 'Calories', 'Price'];
    $scope.orderIndex = 0;
    
    function toggleOrder() {
        $scope.orderIndex = ($scope.orderIndex + 1) % 3;
    }

    $scope.toggleOrder = toggleOrder;
}


require('DelaApp').service('DelaSvc', DelaSvc).controller('DelaCtrl', DelaCtrl);