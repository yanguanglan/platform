(function() {
	'use strict';

	angular
		.module('recipesApp')
		.controller('StatsController', StatsController);

	StatsController.$inject = ['recipes'];

	function StatsController(recipes) {
		var statsCtl = this;
		statsCtl.v1 = recipes.v1;
		statsCtl.v2 = recipes.v2;
		statsCtl.donut = {
			labels: ["AngularJS Recipes", "Angular 2 Recipes"],
			data: [statsCtl.v1.length, statsCtl.v2.length]
		};

		statsCtl.bar = {
			labels: ['Dec', 'Jan'],
			series: ['AngularJS', 'Angular 2'],
			data : [
				[24, 0],
				[1, 3]
			]
		};
	}
})();
