
var ls = window.localStorage;

/* @ngInject */
function StoreSvc() {
    
    function storeMenuHash(menuHash) {
        ls.setItem('recentMenuHash', menuHash);
    }
    
    this.storeMenuHash = storeMenuHash;
    
}

require('DelaApp').service('StoreSvc', StoreSvc);