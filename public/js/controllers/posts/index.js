(function() {
    'use strict';

    angular
        .module('recipesApp')
        .controller('PostsController', PostsController);

    PostsController.$inject = ['serie'];

    function PostsController(serie) {
        var postsCtl = this;
		postsCtl.posts = posts;
    }
})();
