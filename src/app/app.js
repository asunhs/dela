module.exports = angular.module('DelaApp', [
    'templates-html',
    'yahoo-weather',
    'firebaseApp',
    'ngTouch'
]).config(/* @ngInject */ function ($compileProvider, $httpProvider) {
    $compileProvider.debugInfoEnabled(false);
    $httpProvider.useApplyAsync(true);
});
