(function () {
    angular.module('newApp')
        .run(configure);

    //configure the states during the run phase as per https://github.com/johnpapa/angular-styleguide#routing

    /* @ngInject */
    function configure(routerHelper) {
        routerHelper.configureStates(getStates(), "/");
    }

    //These can (should?) be moved under each sections folder. i.e. each route within each directory.
    function getStates() {
        return [
            {
                state: 'home',
                config: {
                    templateUrl: '../views/home/partial-home.html',
                    url: '/'
                }
            },
            {
                state: 'contact',
                config: {
                    templateUrl: '../views/contact/contact-partial.html',
                    url: '/contact'
                }
            }

        ]
    }
})();