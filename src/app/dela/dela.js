

/* @ngInject */
function DelaSvc($http) {
    this.getMenus = function () {
        return $http.get('https://script.google.com/macros/s/AKfycbxFhifcCIQst4i75OPBiPVwYwv154Si2woBJRTYBuxd817FrFeO/exec').then(function (res) {
            return res.data;
        });
    }
}


require('DelaApp').service('DelaSvc', DelaSvc).run(/* @ngInject */ function (DelaSvc) {
    DelaSvc.getMenus().then(function (menus) {
        console.log(menus);
    });
});