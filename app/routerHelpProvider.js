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