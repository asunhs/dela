

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




/* @ngInject */
function DelaSvc($http) {

    function getMenus() {
        return $http.get('https://script.google.com/macros/s/AKfycbxFhifcCIQst4i75OPBiPVwYwv154Si2woBJRTYBuxd817FrFeO/exec').then(function (res) {
            return res.data;
        });
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
    
    this.getMenus = getMenus;
    this.getCards = getCards;
}


/* @ngInject */
function DelaCtrl($scope, DelaSvc) {
    
    DelaSvc.getMenus().then(DelaSvc.getCards).then(function (cards) {
        $scope.menus = cards;
    });
    
}


require('DelaApp').service('DelaSvc', DelaSvc).controller('DelaCtrl', DelaCtrl);