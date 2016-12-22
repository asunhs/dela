/* @ngInject */
function FirebaseSvc($q) {

    this.getJamsilMenu = getJamsilMenu;

    function getJamsilMenu() {
        return $q(function (resolve, reject) {
            return firebase.database().ref('delacourt/jamsil').on('value', function (data) {
                resolve(data.val());
            }, reject);
        });
    }
}



angular.module('firebaseApp', []).service('FirebaseSvc', FirebaseSvc);
