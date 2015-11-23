
/* @ngInject */
function LoadingSvc($templateCache, $q) {
    
    var loadingTemplate = $templateCache.get('dela/loading.tpl.html'),
        element = angular.element(loadingTemplate);
    
    function loading() {
        
        var defer = $q.defer();
        
        element.appendTo('body');
        
        defer.promise.then(function () {
            element.remove();
        });
        
        return function () {
            defer.resolve();
        };
    }
    
    this.loading = loading;
}

require('DelaApp').service('LoadingSvc', LoadingSvc);