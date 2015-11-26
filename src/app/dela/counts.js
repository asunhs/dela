

function Count(count) {
    this.keyCode = count.keyCode;
    this.like = parseInt(count.likeCount);
    this.dislike = parseInt(count.dislikeCount);
    this.total = this.like + this.dislike;
}

Count.prototype = {
    getLikeRatio: function () {
        return parseInt((this.like * 10000) / this.total) / 100;
    },
    getDislikeRatio: function () {
        return parseInt((this.dislike * 10000) / this.total) / 100;
    }
};



/* @ngInject */
function CountSvc ($rootScope, JSONPSvc, Counts) {

    function counts(keyCodes) {
        return JSONPSvc.request('counts&keyCodes=' + _.map(keyCodes, function (keyCode) {
            return encodeURIComponent(keyCode);
        }).join(',')).then(function (counts) {
            Counts.list = _.map(counts, function (count) {
                return new Count(count);
            });
            $rootScope.$broadcast('updateCounts', Counts.list);
            return Counts.list;
        });
    }

    function like(card) {
        return JSONPSvc.request('good&keyCode=' + encodeURIComponent(card.keyCode));
    }

    function dislike(card) {
        return JSONPSvc.request('bad&keyCode=' + encodeURIComponent(card.keyCode));
    }
    
    function getCountByKeyCode(keyCode) {
        return _.findWhere(Counts.list, {
            keyCode: keyCode
        });
    }

    this.counts = counts;
    this.like = like;
    this.dislike = dislike;
    this.getCountByKeyCode = getCountByKeyCode;
}



require('DelaApp').service('CountSvc', CountSvc).value('Counts', {});