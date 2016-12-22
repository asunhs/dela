module.exports = angular.module('DelaApp', [
    'templates-html',
    'naver-weather',
    'firebaseApp',
    'ngTouch'
]).config(/* @ngInject */ function ($compileProvider, $httpProvider) {
    $compileProvider.debugInfoEnabled(false);
    $httpProvider.useApplyAsync(true);
});
