var JAMSIL = "https://dela-mini.firebaseio.com/delacourt/jamsil.json";

/* @ngInject */
function FirebaseSvc($http) {

    this.getJamsilMenu = getJamsilMenu;

    function getJamsilMenu() {
        return $http.jsonp(JAMSIL + '?callback=JSON_CALLBACK').then(function (data) {
            return data.data;
        });
    }
}



angular.module('firebaseApp', []).service('FirebaseSvc', FirebaseSvc);
