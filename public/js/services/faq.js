(function() {
	'use strict';

	angular
		.module('recipesApp')
		.factory('faqService', faqService);

	faqService.$inject = [];

	function faqService() {
		var faq = [
			{
				title: 'What is a "Recipe"?',
				content: 'Recipe is a quite specific AngularJS functionality. This functionality is explained in detail so our users can grasp the logic behind and re-use it in the future at will. Every recipe includes a fully functioning Codepen example so you can use this as a playground. Apart from those we include some exercises per recipe based on its functionality. That way you can take your learning experience to a further step.',
				image: 'img/faq_recipe.png'
			},
			{
				title: 'What are Recipes "Topics"?',
				content: 'Topics is the way we try to group recipes into some basic categories. So for example "Controller" topic includes recipes with content dedicated to AngularJS controllers. Of course there are many cases where a recipe can belong to more than one Topic because of its content.',
				image: 'img/faq_topics.png'
			},
			{
				title: 'What are Recipes "Resources"?',
				content: 'Resources are sections from the official AngularJS documentation on which every Recipe you study is based on. That way you can study a Recipe, check its Codepen example and then explore some more the framework\'s official documentation.',
				image: 'img/faq_resources.png'
			},
			{
				title: 'Can i test a "Recipe" live?',
				content: 'Every recipe includes a fully functioning Plunker example so you can use this as a playground. Apart from those we include some exercises per recipe based on its functionality. That way you can take your learning experience to a further step.',
				image: 'img/faq_plunker.png'
			},
			{
				title: 'Can i request a "Recipe"?',
				content: 'Sure you can. This can be easily achieved by sending us an email describing there your request and thoughts.',
				image: 'img/faq_recipe_request.png'
			},
			{
				title: 'What is a "Serie"?',
				content: 'Serie is a long tutorial divided into shorter lessons which are steps for the tutorial\'s end goal. Every Serie has a specific goal which is to build form A to Z a real life application with AngularJS.',
				image: 'img/faq_series.png'
			},
			{
				title: 'Can i request a "Serie"?',
				content: 'Sure you can. Since the creation of a Serie is not that easy or fast process we came up with following solution. Every 1st of each month we are going to announce 3 candidates series titles. Our members are going to get notified so they can vote for the one they prefer. Voting results will be constantly visible so at the end of the month the winner serie will be announced. This serie is going to be delivered during the coming month while a new voting process will have already started as described above. That way we hope you understand how valuable is your will for us.',
				image: 'img/faq_series_request.png'
			},
			{
				title: 'Can i use a "Serie"?',
				content: 'Sure you can. Every serie is updated regularly on Github. So you can easily clone its repository and use it at will. That is one of our main goals. Every serie\'s lesson has a dedicated branch in this repository in case you want to follow along the serie\'s lessons step by step for learning purposes.',
				image: 'img/faq_use.png'
			}
		], service = {
			all: all
		};

		return service;

		function all() {
			return faq;
		}
	}
})();
