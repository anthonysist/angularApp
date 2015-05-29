(function () {
    angular
        .module('newApp', ['ui.router']);
})();
// routerHelperProvider.js this file provides a helper object allowing that allows route configuration across multiple files, during the .run() phase
(function () {
    angular
        .module('newApp')
        .provider('routerHelper', routerHelperProvider);

        routerHelperProvider.$inject = ['$locationProvider', '$stateProvider', '$urlRouterProvider'];
        /* @ngInject */
        function routerHelperProvider($locationProvider, $stateProvider, $urlRouterProvider) {
            /* jshint validthis:true */
            this.$get = RouterHelper;
            
            $locationProvider.html5Mode(true);

            RouterHelper.$inject = ['$state'];
            /* @ngInject */
            function RouterHelper($state) {
                var hasOtherwise = false;

                var service = {
                    configureStates: configureStates,
                    getStates: getStates
                };
                return service;

                ///////////////

                function configureStates(states, otherwisePath) {
                    states.forEach(function (state) {
                        console.log(state)
                        $stateProvider.state(state.state, state.config);
                    });
                    if (otherwisePath && !hasOtherwise) {
                        hasOtherwise = true;
                        $urlRouterProvider.otherwise(otherwisePath);
                    }
                }

                function getStates() { console.log('hit'); return $state.get(); }
            }
    }
})(); 
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