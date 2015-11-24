(function() {
    'use strict';

    angular
        .module('recipesApp')
        .controller('PostController', PostController);

    PostController.$inject = ['posts'];

    function PostController(posts) {
        var postCtl = this;
		postCtl.post = post;
		postCtl.posts = posts;
    }
})();
