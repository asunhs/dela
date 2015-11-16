module.exports = angular.module('packApp', [
    'templates-html'
]).config(/* ngInject */ function ($compileProvider, $httpProvider) {
    $compileProvider.debugInfoEnabled(false);
    $httpProvider.useApplyAsync(true);
});