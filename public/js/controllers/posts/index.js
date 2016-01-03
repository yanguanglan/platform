(function() {
	'use strict';

	angular
		.module('recipesApp')
		.controller('PostsController', PostsController);

	PostsController.$inject = ['posts'];

	function PostsController(posts) {
		var postsCtl = this;
		postsCtl.posts = posts;
		console.log(posts);
	}
})();
