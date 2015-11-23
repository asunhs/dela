module.exports = angular.module('DelaApp', [
    'templates-html',
    'ngTouch'
]).config(/* @ngInject */ function ($compileProvider, $httpProvider) {
    $compileProvider.debugInfoEnabled(false);
    $httpProvider.useApplyAsync(true);
});