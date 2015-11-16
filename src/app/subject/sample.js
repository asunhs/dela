
/* @ngInject */
function SampleCtrl ($scope) {
    $scope.name = "Foods";
}

module.exports = require('app').directive('packSample', /* @ngInject */ function () {
    return {
        templateUrl: "subject/sample.tpl.html",
        controller: SampleCtrl
    };
});