var app = angular.module('faqBotApp',
    [
        'angularMoment',
        'luegg.directives',
        'ui.bootstrap'
    ], function ($locationProvider) {
        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        });
    });