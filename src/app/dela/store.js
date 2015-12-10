
var ls = window.localStorage;

/* @ngInject */
function StoreSvc(Cards) {
    
    var supportLocalStorage = true;

    function loadMenuHash() {
        return ls.getItem('dela-mini-recent-menu-hash');
    }

    function storeMenuHash(menuHash) {
        var recentMenuHash = loadMenuHash();

        if (menuHash === recentMenuHash) {
            return;
        }

        try {
            ls.setItem('dela-mini-vote-hash', JSON.stringify([]));
            ls.setItem('dela-mini-recent-menu-hash', menuHash);
        } catch (e) {
            supportLocalStorage = false;
            alert('Currently browser can not use some features.\n- Vote');
        }
    }

    function loadVoteHashs() {
        return JSON.parse(ls.getItem('dela-mini-vote-hash'));
    }

    function isVotedHash(keyCode) {
        var voteHashs = loadVoteHashs(),
            voteCode = Cards.hash + keyCode;

        return _.contains(voteHashs, voteCode);
    }

    function storeVoteHash(keyCode) {
        var voteHashs = loadVoteHashs(),
            voteCode = Cards.hash + keyCode;

        voteHashs.push(voteCode);
        ls.setItem('dela-mini-vote-hash', JSON.stringify(voteHashs));
    }

    function getSupportLocalStorage() {
        return supportLocalStorage;
    }

    this.loadMenuHash = loadMenuHash;
    this.storeMenuHash = storeMenuHash;
    this.loadVoteHashs = loadVoteHashs;
    this.isVotedHash = isVotedHash;
    this.storeVoteHash = storeVoteHash;
    this.getSupportLocalStorage = getSupportLocalStorage;
}

require('DelaApp').service('StoreSvc', StoreSvc);