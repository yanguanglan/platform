(function() {
	'use strict';

	angular
		.module('recipesApp')
		.controller('PostController', PostController);

	PostController.$inject = ['post', 'posts'];

	function PostController(post, posts) {
		var postCtl = this;
		postCtl.post = post;
		postCtl.posts = posts;
	}
})();
