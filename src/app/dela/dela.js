

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


require('DelaApp').service('DelaSvc', DelaSvc).controller('DelaCtrl', DelaCtrl).value('Cards', {});