(function() {
    'use strict';

    angular
        .module('recipesApp')
        .controller('TopicsController', TopicsController);

    TopicsController.$inject = ['topics'];

    function TopicsController(topics) {
        var topicsCtl = this;
		recipesCtl.topics = topics;
    }
})();
