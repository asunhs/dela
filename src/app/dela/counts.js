

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


var COUNT_URL = 'https://script.google.com/macros/s/AKfycbx-WG_T_qYlQIeSH2xbeyz1Ejw8HVqNtS7BFILZFVxXYzk1Idk/exec?callback=JSON_CALLBACK&action=';

/* @ngInject */
function CountSvc ($rootScope, JSONPSvc, Counts) {

    function counts(keyCodes, background) {
        return JSONPSvc.request(COUNT_URL + 'counts&keyCodes=' + _.map(keyCodes, function (keyCode) {
            return encodeURIComponent(keyCode);
        }).join(','), background).then(function (counts) {

            var countList = rating(_.map(counts, function (count) {
                return new Count(count);
            }));

            $rootScope.$broadcast('updateCounts', Counts.list = countList);
            return Counts.list;
        });
    }


    function rating(counts) {
        var filtered = _.filter(counts, function (count) {
            return count.like + count.dislike >= 5;
        });

        filtered.sort(function (l, h) {
            if (l.getLikeRatio() === h.getLikeRatio()) {
                return h.like - l.like;
            }
            return h.getLikeRatio() - l.getLikeRatio();
        });

        filtered[0] && (filtered[0].order = 1);
        filtered[1] && (filtered[1].order = 2);
        filtered[2] && (filtered[2].order = 3);

        return counts;
    }

    function like(card) {
        return JSONPSvc.request(COUNT_URL + 'good&keyCode=' + encodeURIComponent(card.keyCode));
    }

    function dislike(card) {
        return JSONPSvc.request(COUNT_URL + 'bad&keyCode=' + encodeURIComponent(card.keyCode));
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