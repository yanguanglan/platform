(function() {
	'use strict';

	angular
		.module('recipesApp')
		.controller('SerieController', SerieController);

	SerieController.$inject = ['serie', 'authService', 'serieService', '$scope', '$timeout'];

	function SerieController(serie, authService, serieService, $scope, $timeout) {
		var serieCtl = this;
		serieCtl.serie = serie;
		serieCtl.auth = authService.isLoggedIn();
		serieCtl.booked = serieCtl.auth ? (serieCtl.serie.bookedArray.indexOf(serieCtl.auth.id) > -1) : false;
		serieCtl.bookedMsg = serieCtl.booked ? 'Bookmarked one!' : 'Not Bookmarked yet!';
		serieCtl.liked = serieCtl.auth ? (serieCtl.serie.likesArray.indexOf(serieCtl.auth.id) > -1) : false;
		serieCtl.likedMsg = serieCtl.liked ? 'Favourited one!' : 'Not favourited yet!';
		serieCtl.watched = serieCtl.auth ? (serieCtl.serie.watchedArray.indexOf(serieCtl.auth.id) > -1) : false;
		serieCtl.watchedMsg = serieCtl.watched ? 'Already visited!' : 'Not visited yet!';
		serieCtl.toggleBook = function() {
			serieCtl.booked = !serieCtl.booked;

			if (serieCtl.booked) {
				Materialize.toast('This serie is now booked!', 5000);

				serieService.book(serieCtl.serie.id);
			} else {
				Materialize.toast('This serie is not booked anymore!', 5000);

				serieService.unbook(serieCtl.serie.id);
			}
		};
		serieCtl.toggleLike = function() {
			if (serieCtl.auth) {
				serieCtl.liked = !serieCtl.liked;

				if (serieCtl.liked) {
					Materialize.toast('This serie is now one of your favourites!', 5000);

					serieService.like(serieCtl.serie.id);
				} else {
					Materialize.toast('This serie is not one of your favourites anymore!', 5000);

					serieService.dislike(serieCtl.serie.id);
				}
			} else {
				$('#unsignedModal').openModal();
			}
		};
		serieCtl.clearTooltip = function() {
			angular.element('.tooltipped').tooltip('remove');
			$timeout(function(){
				angular.element('.tooltipped').tooltip();
			}, 100);
		};
		$scope.$watch(angular.bind(serieCtl, function() {
			return serieCtl.liked;
		}), function(newVal, oldVal) {
			if (newVal != oldVal) {
				var index = serieCtl.serie.likesArray.indexOf(serieCtl.auth.id);
				if (index > -1) {
					serieCtl.serie.likesArray.splice(index, 1);
					serieCtl.likedMsg = 'Not favourited yet!';
				} else {
					serieCtl.serie.likesArray.push(serieCtl.auth.id);
					serieCtl.likedMsg = 'Favourited one!';
				}

				serieCtl.clearTooltip();
			}
		});
		$scope.$watch(angular.bind(serieCtl, function() {
			return serieCtl.booked;
		}), function(newVal, oldVal) {
			if (newVal != oldVal) {
				var index = serieCtl.serie.bookedArray.indexOf(serieCtl.auth.id);
				if (index > -1) {
					serieCtl.serie.bookedArray.splice(index, 1);
					serieCtl.bookedMsg = 'Not bookmarked yet!';
				} else {
					serieCtl.serie.bookedArray.push(serieCtl.auth.id);
					serieCtl.bookedMsg = 'Bookmarked one!';
				}

				serieCtl.clearTooltip
			}
		});
	}
})();
